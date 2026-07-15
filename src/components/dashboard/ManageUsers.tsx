"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "user" | "organizer" | "admin";
}

export default function ManageUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://event-sphere-server-nu.vercel.app/api/admin/users",
        {
          withCredentials: true,
        }
      );

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };

    loadUsers();
  }, []);

  const changeRole = async (
    id: string,
    role: "user" | "organizer" | "admin"
  ) => {
    try {
      const res = await axios.patch(
        `https://event-sphere-server-nu.vercel.app/api/admin/users/${id}/role`,
        {
          role,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!ok) return;

    try {
      const res = await axios.delete(
        `https://event-sphere-server-nu.vercel.app/api/admin/users/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Manage Users
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all registered users and organizers.
        </p>

      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="overflow-hidden rounded-2xl bg-white shadow-lg"
      >

        <table className="w-full">

          <thead className="bg-violet-600 text-white">

            <tr>

              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Email
              </th>

              <th className="px-6 py-4 text-left">
                Role
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b hover:bg-violet-50"
              >

                <td className="px-6 py-5 font-semibold">
                  {user.name}
                </td>

                <td className="px-6 py-5">
                  {user.email}
                </td>

                <td className="px-6 py-5">

                  <select
                    value={user.role}
                    onChange={(e) =>
                      changeRole(
                        user._id,
                        e.target.value as
                          | "user"
                          | "organizer"
                          | "admin"
                      )
                    }
                    className="rounded-lg border-2 border-violet-300 px-3 py-2 outline-none focus:border-violet-600"
                  >

                    <option value="user">
                      User
                    </option>

                    <option value="organizer">
                      Organizer
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </td>

                <td className="px-6 py-5 text-center">

                  <button
                    onClick={() =>
                      deleteUser(user._id)
                    }
                    className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                  >

                    <Trash2 size={20} />

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </motion.div>

    </div>
  );
}
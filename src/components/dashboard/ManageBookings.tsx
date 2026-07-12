"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  CalendarDays,
  User,
  Trash2,
  Wallet,
} from "lucide-react";

interface BookingType {

  _id: string;

  userName: string;

  userEmail: string;

  eventTitle: string;

  eventDate: string;

  ticketPrice: number;

}

export default function ManageBookings() {

  const [bookings, setBookings] =
    useState<BookingType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchBookings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/bookings",
        {
          withCredentials: true,
        }
      );

      setBookings(res.data.bookings);

    } catch {

      toast.error("Failed to load bookings");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const load = async () => {

      await fetchBookings();

    };

    load();

  }, []);

  const deleteBooking = async (id: string) => {

    if (!confirm("Delete this booking?")) return;

    try {

      const res = await axios.delete(
        `http://localhost:5000/api/admin/bookings/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      fetchBookings();

    } catch {

      toast.error("Delete failed");

    }

  };

  if (loading) {

    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );

  }

  return (

    <div>

      <h1 className="mb-8 text-4xl font-bold">

        Manage Bookings

      </h1>

      <div className="space-y-5">

        {

          bookings.map((booking, index) => (

            <motion.div

              key={booking._id}

              initial={{
                opacity:0,
                x:-40,
              }}

              animate={{
                opacity:1,
                x:0,
              }}

              transition={{
                delay:index*.06,
              }}

              whileHover={{
                scale:1.01,
              }}

              className="rounded-2xl bg-white p-6 shadow-lg"

            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-2xl font-bold">

                    {booking.eventTitle}

                  </h2>

                  <div className="mt-4 space-y-2 text-gray-600">

                    <div className="flex items-center gap-2">

                      <User size={18}/>

                      {booking.userName}

                    </div>

                    <div>

                      {booking.userEmail}

                    </div>

                    <div className="flex items-center gap-2">

                      <CalendarDays size={18}/>

                      {booking.eventDate}

                    </div>

                    <div className="flex items-center gap-2">

                      <Wallet size={18}/>

                      ৳ {booking.ticketPrice}

                    </div>

                  </div>

                </div>

                <button

                  onClick={() =>
                    deleteBooking(
                      booking._id
                    )
                  }

                  className="rounded-xl bg-red-100 p-4 text-red-600 transition hover:bg-red-200"

                >

                  <Trash2/>

                </button>

              </div>

            </motion.div>

          ))

        }

      </div>

    </div>

  );

}
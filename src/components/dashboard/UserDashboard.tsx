"use client";

import Link from "next/link";
import { CalendarDays, Ticket, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {

  const { user } = useAuth();

  const [stats, setStats] = useState({
  totalBookings: 0,
  upcomingBookings: 0,
  totalSpent: 0,
  recentBookings: [] as {
    _id: string;
    eventTitle: string;
  }[],
});

const [loading, setLoading] = useState(true);

const fetchStats = async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/dashboard/user-stats",
      {
        withCredentials: true,
      }
    );

    setStats(res.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

useEffect(() => {

  const loadStats = async () => {

    await fetchStats();

  };

  loadStats();

}, []);

  return (

    <div className="space-y-8">

      {/* Welcome */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-500 p-8 text-white"
      >

        <h1 className="text-3xl font-bold">

          Welcome,

          <span className="ml-2">

            {user?.name}

          </span>

        </h1>

        <p className="mt-3 text-violet-100">

          Discover exciting events and manage your bookings.

        </p>

      </motion.div>



      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-2xl bg-white p-6 shadow"
        >

          <Ticket
            className="mb-4 text-violet-600"
            size={40}
          />

          <h2 className="text-4xl font-bold">

            {loading ? "..." : stats.totalBookings}

          </h2>

          <p className="mt-2 text-gray-500">

            My Bookings

          </p>

        </motion.div>



        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-2xl bg-white p-6 shadow"
        >

          <CalendarDays
            className="mb-4 text-violet-600"
            size={40}
          />

          <h2 className="text-4xl font-bold">

            {loading ? "..." : stats.upcomingBookings}

          </h2>

          <p className="mt-2 text-gray-500">

            Upcoming Events

          </p>

        </motion.div>



        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-2xl bg-white p-6 shadow"
        >

          <Wallet
            className="mb-4 text-violet-600"
            size={40}
          />

          <h2 className="text-4xl font-bold">

            {loading ? "..." : `৳${stats.totalSpent}`}

          </h2>

          <p className="mt-2 text-gray-500">

            Total Spent

          </p>

        </motion.div>

      </div>



      {/* Recent Bookings */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl bg-white p-8 shadow"
      >

        <h2 className="mb-5 text-2xl font-bold text-purple-600">

          Recent Bookings

        </h2>

{
  stats.recentBookings.length === 0 ? (

    <div className="rounded-xl border border-dashed border-violet-300 py-14 text-center">

      <p className="text-lg text-gray-500">

        You have not booked any events yet.

      </p>

    </div>

  ) : (

    <div className="space-y-4">

      {

        stats.recentBookings.map((booking) => (

          <div
            key={booking._id}
            className="flex items-center justify-between rounded-xl border border-purple-600 p-4"
          >

            <h3 className="font-semibold">

              {booking.eventTitle}

            </h3>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">

              Booked

            </span>

          </div>

        ))

      }

    </div>

  )
}

      </motion.div>



      {/* CTA */}

      <div className="text-center">

        <Link
          href="/events"
          className="rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition hover:bg-violet-700"
        >

          Browse Events

        </Link>

      </div>

    </div>

  );

}
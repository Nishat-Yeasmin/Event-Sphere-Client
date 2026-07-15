"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  CalendarDays,
  Ticket,
  Wallet,
} from "lucide-react";

interface AdminStats {

  totalUsers: number;
  totalOrganizers: number;
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;

}

export default function AdminDashboard() {

  const [stats, setStats] =
    useState<AdminStats>({
      totalUsers: 0,
      totalOrganizers: 0,
      totalEvents: 0,
      totalBookings: 0,
      totalRevenue: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadStats = async () => {

      try {

        const res = await axios.get(
          "https://event-sphere-server-nu.vercel.app/api/admin/stats",
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

    loadStats();

  }, []);

  const cards = [

    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
    },

    {
      title: "Organizers",
      value: stats.totalOrganizers,
      icon: UserCheck,
    },

    {
      title: "Events",
      value: stats.totalEvents,
      icon: CalendarDays,
    },

    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: Ticket,
    },

    {
      title: "Revenue",
      value: `৳${stats.totalRevenue}`,
      icon: Wallet,
    },

  ];

  return (

    <div>

      <h1 className="mb-10 text-4xl font-bold">

        Admin Dashboard

      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        {

          cards.map((card, index) => {

            const Icon = card.icon;

            return (

              <motion.div

                key={card.title}

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: index * .1,
                }}

                whileHover={{
                  y: -8,
                }}

                className="rounded-2xl bg-white p-6 shadow-lg"

              >

                <Icon
                  size={40}
                  className="mb-4 text-violet-600"
                />

                <h2 className="text-3xl font-bold">

                  {loading ? "..." : card.value}

                </h2>

                <p className="mt-2 text-gray-500">

                  {card.title}

                </p>

              </motion.div>

            );

          })

        }

      </div>

    </div>

  );

}
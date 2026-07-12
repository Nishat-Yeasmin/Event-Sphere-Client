"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
}

export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.4,
      }}
      className="rounded-2xl bg-white p-6 shadow-md transition"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500">

            {title}

          </p>

          <h2 className="mt-3 text-4xl font-bold">

            {value}

          </h2>

        </div>

        <div className="rounded-full bg-violet-100 p-4">

          <Icon
            size={30}
            className="text-violet-600"
          />

        </div>

      </div>
    </motion.div>
  );
}
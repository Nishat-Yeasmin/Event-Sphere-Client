"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* Logo / Circle Loader */}
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-gray-300 border-t-blue-600"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.p
          className="text-lg font-semibold text-gray-700 dark:text-gray-200"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
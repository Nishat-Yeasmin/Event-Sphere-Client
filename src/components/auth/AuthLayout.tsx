"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";

import Logo from "@/components/shared/Logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description: "Explore conferences, workshops and festivals across Bangladesh.",
  },
  {
    icon: Ticket,
    title: "Easy Registration",
    description: "Register for your favorite events in just a few clicks.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description: "Your account and registrations are protected with secure authentication.",
  },
  {
    icon: Users,
    title: "Growing Community",
    description: "Join thousands of event enthusiasts and organizers.",
  },
];

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative hidden overflow-hidden bg-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between"
        >
          {/* Background Glow */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative z-10">
            <Logo light={true} />

            <h1 className="mt-16 max-w-md text-5xl font-bold leading-tight">
              Welcome to EventSphere
            </h1>

            <p className="mt-6 max-w-lg text-violet-100 leading-8">
              Discover amazing events, connect with communities, and manage your
              registrations in one modern platform.
            </p>
          </div>

          <div className="relative z-10 mt-12 grid gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-violet-100">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center p-6 lg:p-12"
        >
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="mb-8 text-center">
              <div className="flex justify-center">
                <Logo />
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {title}
              </h2>

              <p className="mt-3 text-gray-600">
                {subtitle}
              </p>
            </div>

            {children}

            <div className="mt-8 text-center text-sm text-gray-500">
              <Link
                href="/"
                className="font-medium text-violet-600 hover:text-violet-700"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
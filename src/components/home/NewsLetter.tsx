"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

export default function Newsletter() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-600 px-8 py-16 text-white shadow-2xl lg:px-16"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
              🎉 Never Miss an Event
            </span>

            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
              Stay Updated With Upcoming Events
            </h2>

            <p className="mt-5 text-lg text-violet-100">
              Subscribe to receive updates about conferences, workshops,
              festivals, networking sessions, and exclusive event offers.
            </p>

            <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 rounded-2xl bg-white p-3 shadow-lg md:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 rounded-xl border border-transparent px-5 py-4 text-gray-900 outline-none focus:border-violet-500"
              />

              <Button className="rounded-xl bg-violet-900 px-8 hover:bg-black">
                Subscribe
              </Button>
            </div>

            <p className="mt-5 text-sm text-violet-100">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const testimonials = [
  {
    id: 1,
    name: "Nafis Ahmed",
    role: "Software Engineer",
    image: "/images/user-1.jpg",
    review:
      "EventSphere made finding and joining tech conferences incredibly easy. The booking process was smooth, and the event experience exceeded my expectations.",
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "UI/UX Designer",
    image: "/images/user-2.jpg",
    review:
      "I discovered several creative workshops through EventSphere. The platform is clean, fast, and very easy to use on both mobile and desktop.",
  },
  {
    id: 3,
    name: "Tasnia Islam",
    role: "University Student",
    image: "/images/user-3.jpg",
    review:
      "From cultural festivals to networking events, everything is organized in one place. I highly recommend EventSphere to anyone who loves attending events.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-purple-100">
      <Container>
        <SectionTitle
          title="What Our Users Say"
          subtitle="Thousands of people trust EventSphere to discover and join amazing events."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-violet-700 bg-white p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="rounded-full object-cover"
                />

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mt-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="#FACC15"
                    className="text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-5 leading-7 text-gray-600">
                {item.review}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
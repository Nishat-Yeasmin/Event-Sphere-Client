"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  ShieldCheck,
  Zap,
  MapPinned,
} from "lucide-react";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const features = [
  {
    id: 1,
    title: "Verified Events",
    description:
      "Every event is carefully reviewed to ensure authenticity and quality before being published.",
    icon: BadgeCheck,
  },
  {
    id: 2,
    title: "Secure Registration",
    description:
      "Register confidently with a secure booking process and protected user information.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Instant Confirmation",
    description:
      "Receive immediate confirmation after registration with quick access to your event details.",
    icon: Zap,
  },
  {
    id: 4,
    title: "Events Across Bangladesh",
    description:
      "Explore conferences, workshops, festivals, and networking events from cities nationwide.",
    icon: MapPinned,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-purple-100">
      <Container>
        <SectionTitle
          title="Why Choose EventSphere?"
          subtitle="We make discovering and joining events simple, secure, and enjoyable for everyone."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-2xl border border-violet-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
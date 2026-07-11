"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";

import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

const Hero = () => {
    const stats = [
  {
    number: "500+",
    title: "Events",
  },
  {
    number: "15K+",
    title: "Visitors",
  },
  {
    number: "40+",
    title: "Cities",
  },
];
  return (
    <section className="bg-gradient-to-br from-violet-50 via-white to-white overflow-hidden">
      <Container className="min-h-[85vh] flex items-center">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 px-4 py-2 text-sm font-medium">

              <CalendarDays size={18} />

              Discover 500+ Events

            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-black leading-tight text-gray-900">

              Discover Amazing
              <span className="block text-violet-600">
                Events Around You
              </span>

            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">

              Join conferences, cultural festivals, workshops,
              networking sessions and unforgettable experiences
              happening near you.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link href="/events">

                <Button>
                  Explore Events
                </Button>

              </Link>

              <Link href="/about">

     <Button
  className="bg-violet-100 text-violet-700 border border-violet-600 hover:bg-violet-600 hover:text-white transition-all duration-300"
>
  Learn More
  </Button>

              </Link>

            </div>

            <div className="flex flex-wrap gap-6 mt-12">
  {stats.map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
     className="bg-white/90 backdrop-blur-sm border border-violet-200 rounded-2xl shadow-lg px-8 py-6 min-w-[150px] text-center hover:border-violet-500 hover:shadow-violet-200 hover:shadow-xl transition-all duration-300"
    >
      <h2 className="text-4xl font-bold text-violet-600">
        {item.number}
      </h2>

      <p className="mt-2 text-gray-600 font-medium">
        {item.title}
      </p>
    </motion.div>
  ))}
</div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            className="relative"
          >

            <Image
              src="/images/hero-banner.jpg"
              alt="Hero Banner"
              width={700}
              height={700}
              className="rounded-3xl shadow-2xl object-cover"
              priority
            />

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl px-5 py-4"
            >

              <div className="flex gap-3 items-center">

                <MapPin
                  className="text-violet-600"
                  size={22}
                />

                <div>

                  <h4 className="font-semibold">
                    40+ Cities
                  </h4>

                  <p className="text-sm text-gray-500">
                    Events Nationwide
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </Container>
    </section>
  );
};

export default Hero;
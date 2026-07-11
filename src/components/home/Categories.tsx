"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Laptop,
  Music,
  BriefcaseBusiness,
  Trophy,
  BookOpen,
  Landmark,
  ArrowRight,
} from "lucide-react";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const categories = [
  {
    id: 1,
    name: "Technology",
    image: "/images/technology.jpg",
    total: 28,
    icon: Laptop,
  },
  {
    id: 2,
    name: "Music",
    image: "/images/music.jpg",
    total: 18,
    icon: Music,
  },
  {
    id: 3,
    name: "Business",
    image: "/images/business.jpg",
    total: 22,
    icon: BriefcaseBusiness,
  },
  {
    id: 4,
    name: "Sports",
    image: "/images/sports.jpg",
    total: 14,
    icon: Trophy,
  },
  {
    id: 5,
    name: "Workshop",
    image: "/images/workshop_cat.jpg",
    total: 16,
    icon: BookOpen,
  },
  {
    id: 6,
    name: "Culture",
    image: "/images/cultural.jpg",
    total: 20,
    icon: Landmark,
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-violet-50">
      <Container>
        <SectionTitle
          title="Browse Event Categories"
          subtitle="Find events that match your interests and discover exciting experiences across different categories."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
              >
                <Link href={`/events?category=${category.name}`}>
                  <div className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md">

                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition" />

                    <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">

                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon size={28} />
                      </div>

                      <div>

                        <h3 className="text-2xl font-bold">
                          {category.name}
                        </h3>

                        <p className="mt-2 text-gray-200">
                          {category.total}+ Events
                        </p>

                        <div className="mt-5 flex items-center gap-2 font-medium text-violet-200 group-hover:gap-3 transition-all">
                          Explore
                          <ArrowRight size={18} />
                        </div>

                      </div>

                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
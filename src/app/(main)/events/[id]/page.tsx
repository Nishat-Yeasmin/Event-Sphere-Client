"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
  Users,
  Tag,
  ArrowLeft,
} from "lucide-react";

import api from "@/lib/axios";

interface EventType {
  _id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  description: string;
  organizer: string;
  availableSeats: number;
}

export default function EventDetailsPage() {
  const { id } = useParams();

  const [event, setEvent] = useState<EventType | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await api.get(`/api/events/${id}`);

        setEvent(res.data.event);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="h-[500px] animate-pulse rounded-3xl bg-gray-200"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-bold">Event Not Found</h2>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 py-16">

      <div className="mx-auto max-w-5xl px-5">

        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-violet-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <motion.div
  initial={{
    opacity: 0,
    y: 60,
    scale: .95,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: .7,
    ease: "easeOut",
  }}
  className="overflow-hidden rounded-3xl bg-white shadow-xl"
>

          {/* Image */}

          <div className="group relative h-[350px] overflow-hidden">

            <Image
  src={event.image}
  alt={event.title}
  fill
  priority
  className="object-cover transition-transform duration-700 group-hover:scale-110"
/>

            <div className="absolute left-5 top-5 rounded-full bg-violet-700 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md">

              {event.category}

            </div>

          </div>

          {/* Content */}

          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    delay: .3,
    duration: .6,
  }}
  className="p-8 lg:p-10"
>

            <motion.h1
  initial={{
    opacity: 0,
    x: -30,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    delay: .35,
  }}
  className="text-3xl md:text-4xl font-bold"
>

              {event.title}

            </motion.h1>

           <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: .45 }}
  className="mt-8 grid gap-8 md:grid-cols-2"
>

              <div className="space-y-5">

                <div className="flex items-center gap-3">

                  <CalendarDays
                    className="text-violet-600"
                  />

                  <span>

                    {event.date}

                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock3
                    className="text-violet-600"
                  />

                  <span>

                    {event.time}

                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <MapPin
                    className="text-violet-600"
                  />

                  <span>

                    {event.location}

                  </span>

                </div>

              </div>

              <div className="space-y-5">

                <div className="flex items-center gap-3">

                  <User
                    className="text-violet-600"
                  />

                  <span>

                    {event.organizer}

                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Users
                    className="text-violet-600"
                  />

                  <span>

                    {event.availableSeats} Seats Available

                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Tag
                    className="text-violet-600"
                  />

                  <span className="text-2xl font-bold text-violet-600">

                    ${event.price}

                  </span>

                </div>

              </div>

            </motion.div>

            {/* Description */}

          <motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: .6,
  }}
  className="mt-10"
>

              <h2 className="mb-4 text-2xl font-bold">

                About This Event

              </h2>

              <p className="leading-8 text-gray-600">

                {event.description}

              </p>

            </motion.div>

            {/* Button */}

            <div className="mt-12">

             <motion.button
  whileHover={{
    scale: 1.05,
  }}
  whileTap={{
    scale: .95,
  }}
  className="rounded-xl bg-violet-600 px-10 py-4 font-semibold text-white shadow-lg transition hover:bg-violet-700"
>
  Book This Event
</motion.button>

            

            </div>

          </motion.div>

        </motion.div>

      </div>

    </main>
  );
}
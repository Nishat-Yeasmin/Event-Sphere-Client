"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Trash2,
  User,
} from "lucide-react";

interface EventType {

  _id: string;

  title: string;

  image: string;

  category: string;

  date: string;

  location: string;

  organizer: string;

  price: number;

}

export default function ManageEvents() {

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchEvents = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/events",
        {
          withCredentials: true,
        }
      );

      setEvents(res.data.events);

    } catch {

      toast.error("Failed to load events");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const load = async () => {

      await fetchEvents();

    };

    load();

  }, []);

  const deleteEvent = async (id: string) => {

    if (!confirm("Delete this event?")) return;

    try {

      const res = await axios.delete(
        `http://localhost:5000/api/admin/events/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      fetchEvents();

    } catch {

      toast.error("Delete failed");

    }

  };

  if (loading) {

    return (

      <div className="py-20 text-center">

        Loading...

      </div>

    );

  }

  return (

    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Manage Events

        </h1>

        <p className="mt-2 text-gray-500">

          View and manage every event.

        </p>

      </div>

      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">

        {

          events.map((event, index) => (

            <motion.div

              key={event._id}

              initial={{
                opacity:0,
                y:40,
              }}

              animate={{
                opacity:1,
                y:0,
              }}

              transition={{
                delay:index*.08,
              }}

              whileHover={{
                y:-10,
                scale:1.02,
              }}

              className="overflow-hidden rounded-3xl bg-white shadow-lg"

            >

              <div className="relative h-56">

                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                />

                <div className="absolute left-4 top-4 rounded-full bg-violet-600 px-4 py-1 text-white">

                  {event.category}

                </div>

              </div>

              <div className="p-6">

                <h2 className="text-xl font-bold">

                  {event.title}

                </h2>

                <div className="mt-5 space-y-3 text-gray-600">

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={18}
                    />

                    {event.date}

                  </div>

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={18}
                    />

                    {event.location}

                  </div>

                  <div className="flex items-center gap-2">

                    <User
                      size={18}
                    />

                    {event.organizer}

                  </div>

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <h3 className="text-2xl font-bold text-violet-600">

                    ৳ {event.price}

                  </h3>

                  <button

                    onClick={() =>
                      deleteEvent(event._id)
                    }

                    className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"

                  >

                    <Trash2/>

                  </button>

                </div>

              </div>

            </motion.div>

          ))

        }

      </div>

    </div>

  );

}
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

interface BookingType {
  _id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  eventLocation: string;
  ticketPrice: number;
  bookingStatus: string;
}

export default function MyBookings() {

  const [bookings, setBookings] =
    useState<BookingType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchBookings = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/my-bookings",

        {
          withCredentials: true,
        }

      );

      setBookings(res.data.bookings);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

  const loadBookings = async () => {

    await fetchBookings();

  };

  loadBookings();

}, []);

  const handleCancel = async (
    id: string
  ) => {

    try {

      const res = await axios.delete(

        `http://localhost:5000/api/bookings/${id}`,

        {
          withCredentials: true,
        }

      );

      toast.success(res.data.message);

      setBookings(

        bookings.filter(

          (booking) => booking._id !== id

        )

      );

    } catch (error) {

      console.log(error);

      toast.error("Failed");

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

      <h1 className="mb-8 text-4xl font-bold">

        My Bookings

      </h1>

      {

        bookings.length === 0 ?

        (

          <div className="rounded-2xl bg-white p-16 text-center shadow">

            <h2 className="text-2xl font-semibold">

              No Bookings Yet

            </h2>

            <p className="mt-3 text-gray-500">

              Book your first event.

            </p>

          </div>

        )

        :

        (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {

              bookings.map((booking,index)=>(

                <motion.div

                  key={booking._id}

                  initial={{
                    opacity:0,
                    y:40,
                  }}

                  animate={{
                    opacity:1,
                    y:0,
                  }}

                  transition={{
                    delay:index*.1,
                  }}

                  whileHover={{
                    y:-8,
                  }}

                  className="overflow-hidden rounded-2xl bg-white shadow-lg"

                >

                  <div className="relative h-52">

                    <Image

                      src={booking.eventImage}

                      alt={booking.eventTitle}

                      fill

                      className="object-cover"

                    />

                  </div>

                  <div className="p-5">

                    <h2 className="text-xl font-bold">

                      {booking.eventTitle}

                    </h2>

                    <div className="mt-4 space-y-3 text-gray-600">

                      <div className="flex items-center gap-2">

                        <CalendarDays size={18}/>

                        {booking.eventDate}

                      </div>

                      <div className="flex items-center gap-2">

                        <MapPin size={18}/>

                        {booking.eventLocation}

                      </div>

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      <div>

                        <h3 className="text-xl font-bold text-violet-600">

                          ৳ {booking.ticketPrice}

                        </h3>

                        <p className="text-sm text-green-600">

                          {booking.bookingStatus}

                        </p>

                      </div>

                      <button

                        onClick={()=>handleCancel(booking._id)}

                        className="rounded-lg bg-red-100 p-3 text-red-600 hover:bg-red-200"

                      >

                        <Trash2 size={20}/>

                      </button>

                    </div>

                  </div>

                </motion.div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}
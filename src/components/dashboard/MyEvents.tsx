"use client";

import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pencil, Trash2, MapPin, CalendarDays } from "lucide-react";

interface EventType {
  _id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  location: string;
  price: number;
}

export default function MyEvents() {

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const res = await axios.get(
          "https://event-sphere-server-nu.vercel.app/api/my-events",
          {
            withCredentials: true,
          }
        );


        setEvents(res.data.events || []);


      } catch (error) {

        console.log(
          "FETCH EVENTS ERROR:",
          error
        );


      } finally {

        setLoading(false);

      }

    };


    fetchEvents();


  }, []);


  const handleDelete = async (id:string)=>{

  const result = await Swal.fire({

    title: "Are you sure?",

    text: "This event will be permanently deleted!",

    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Yes, delete it",

  });


  if(result.isConfirmed){

    try{

      await axios.delete(
        `/api/events/${id}`,
        {
          withCredentials:true,
        }
      );


      setEvents((prev)=>
        prev.filter(
          (event)=>event._id !== id
        )
      );


      Swal.fire(
        "Deleted!",
        "Your event has been deleted.",
        "success"
      );


    }catch(error){

      console.log(error);


      Swal.fire(
        "Error!",
        "Failed to delete event.",
        "error"
      );

    }

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

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold">

          My Events

        </h1>

        <Link
          href="/dashboard/add-event"
          className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >

          Add Event

        </Link>

      </div>

      {
        events.length === 0 ? (

          <div className="rounded-xl bg-white p-12 text-center shadow">

            <h2 className="text-2xl font-semibold">

              No Events Found

            </h2>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {
              events.map((event, index) => (

                <motion.div
                  key={event._id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="overflow-hidden rounded-2xl bg-white shadow-lg"
                >

                  <div className="relative h-52">

                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="p-5">

                    <span className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">

                      {event.category}

                    </span>

                    <h2 className="mt-4 text-xl font-bold">

                      {event.title}

                    </h2>

                    <div className="mt-4 space-y-2 text-gray-600">

                      <div className="flex items-center gap-2">

                        <CalendarDays size={18} />

                        {event.date}

                      </div>

                      <div className="flex items-center gap-2">

                        <MapPin size={18} />

                        {event.location}

                      </div>

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      <h3 className="text-xl font-bold text-violet-600">

                        ৳ {event.price}

                      </h3>

                      <div className="flex gap-3">

                       <Link
 href={`/dashboard/edit-event/${event._id}`}
 className="rounded-lg bg-blue-100 p-2 text-blue-600"
>

  <Pencil size={20}/>

</Link>

                <button
  onClick={()=>handleDelete(event._id)}
  className="rounded-lg bg-red-100 p-2 text-red-600"
>

  <Trash2 size={20}/>

</button>

                      </div>

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
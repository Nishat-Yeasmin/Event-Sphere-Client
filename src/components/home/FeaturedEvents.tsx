"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
} from "lucide-react";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import Button from "@/components/shared/Button";


const events = [
  {
    id: 1,
    title: "Tech Innovation Summit 2026",
    image: "/images/tech-event.jpg",
    category: "Technology",
    date: "25 July 2026",
    location: "Dhaka",
    price: 500,
  },

  {
    id: 2,
    title: "Music Festival Night",
    image: "/images/music-event.jpg",
    category: "Music",
    date: "10 August 2026",
    location: "Sylhet",
    price: 800,
  },

  {
    id: 3,
    title: "Business Networking Event",
    image: "/images/business-event.jpg",
    category: "Business",
    date: "18 August 2026",
    location: "Chittagong",
    price: 1000,
  },

  {
    id: 4,
    title: "Modern Web Development Workshop",
    image: "/images/workshop.jpg",
    category: "Workshop",
    date: "05 September 2026",
    location: "Dhaka",
    price: 300,
  },

  {
    id: 5,
    title: "National Sports Championship",
    image: "/images/sports-event.jpg",
    category: "Sports",
    date: "20 September 2026",
    location: "Rajshahi",
    price: 400,
  },

  {
    id: 6,
    title: "Cultural Festival 2026",
    image: "/images/cultural-event.jpg",
    category: "Culture",
    date: "12 October 2026",
    location: "Sylhet",
    price: 200,
  },
];


const FeaturedEvents = () => {

  return (

    <section className="bg-purple-100">

      <Container>


        <SectionTitle

          title="Upcoming Events"

          subtitle="Discover exciting events, workshops and experiences happening around you."

        />


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


          {
            events.map((event,index)=>(


              <motion.div

                key={event.id}

                initial={{
                  opacity:0,
                  y:40
                }}

                whileInView={{
                  opacity:1,
                  y:0
                }}

                transition={{
                  duration:0.5,
                  delay:index*0.1
                }}

                viewport={{
                  once:true
                }}

className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"

              >


                {/* Image */}

                <div className="relative h-60 overflow-hidden">


                  <Image

                    src={event.image}

                    alt={event.title}

                    fill

                    className="object-cover group-hover:scale-110 transition-transform duration-500"

                  />


                  <div
                    className="absolute top-4 left-4 bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium"
                  >

                    {event.category}

                  </div>


                </div>



                {/* Content */}


                <div className="p-6">


                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1"
                  >

                    {event.title}

                  </h3>



                  <div className="mt-4 space-y-3 text-gray-600 text-sm">


                    <div className="flex items-center gap-2">

                      <CalendarDays
                        size={18}
                        className="text-violet-600"
                      />

                      <span>
                        {event.date}
                      </span>

                    </div>



                    <div className="flex items-center gap-2">


                      <MapPin
                        size={18}
                        className="text-violet-600"
                      />


                      <span>
                        {event.location}
                      </span>


                    </div>


                  </div>



                  <div className="flex items-center justify-between mt-6">


                    <p className="text-lg font-bold text-violet-600"
                    >

                      ${event.price}

                    </p>



                    <Link
                      href={`/events/${event.id}`}
                      className="text-violet-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >

                      Details

                      <ArrowRight size={18}/>

                    </Link>


                  </div>


                </div>


              </motion.div>


            ))
          }


        </div>



        {/* Button */}


        <div className="flex justify-center mt-12">


          <Link href="/events">

            <Button>

              View All Events

            </Button>

          </Link>


        </div>


      </Container>


    </section>

  );

};


export default FeaturedEvents;
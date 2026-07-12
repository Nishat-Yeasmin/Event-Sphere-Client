"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin
} from "lucide-react";

import api from "@/lib/axios";


interface EventType {
  _id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  location: string;
  price: number;
  description: string;
}



export default function EventsPage() {


const [events,setEvents] = useState<EventType[]>([]);

const [search,setSearch] = useState("");

const [category,setCategory] = useState("");

const [sort,setSort] = useState("");

const [page,setPage] = useState(1);

const [totalPages,setTotalPages] = useState(1);



useEffect(()=>{


const loadEvents = async()=>{

try{


const res = await api.get(
"/api/events",
{
params:{
search,
category,
sort,
page,
limit:8
}
}
);


setEvents(res.data.events);

setTotalPages(
res.data.pagination.totalPages
);


}
catch(error){

console.log(error);

}


};


loadEvents();


},[
search,
category,
sort,
page
]);





return (

<main className="min-h-screen bg-gray-50 py-16">


<div className="mx-auto max-w-7xl px-5">



{/* Title */}

<motion.h1

initial={{
opacity:0,
y:-30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.6
}}

className="mb-10 text-center text-4xl font-bold text-violet-600"

>
Explore Events
</motion.h1>





{/* Filters */}


<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.6,
delay:0.2
}}

className="mb-10 grid gap-4 rounded-2xl bg-white p-6 shadow md:grid-cols-3"

>



<input

placeholder="Search event..."

value={search}

onChange={(e)=>{

setSearch(e.target.value);
setPage(1);

}}

className="rounded-xl cursor-pointer border border-purple-600 px-4 py-3"

/>



<select

value={category}

onChange={(e)=>{

setCategory(e.target.value);
setPage(1);

}}

className="rounded-xl cursor-pointer border border-purple-600 px-4 py-3"

>

<option value="">
All Category
</option>

<option value="Technology">
Technology
</option>

<option value="Music">
Music
</option>

<option value="Business">
Business
</option>

<option value="Workshop">
Workshop
</option>


</select>





<select

value={sort}

onChange={(e)=>setSort(e.target.value)}

className="rounded-xl cursor-pointer border border-purple-600 px-4 py-3"

>

<option value="">
Sort By
</option>

<option value="low">
Price Low to High
</option>

<option value="high">
Price High to Low
</option>

</select>



</motion.div>






{/* Cards */}


<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">


{

events.map((event,index)=>(


<motion.div

key={event._id}

initial={{
opacity:0,
y:50,
scale:0.95
}}

animate={{
opacity:1,
y:0,
scale:1
}}

transition={{
duration:0.5,
delay:index*0.08
}}

whileHover={{
y:-8,
scale:1.03
}}

className="overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl"

>



{/* Image */}

<div className="relative h-52 overflow-hidden">


<motion.div

whileHover={{
scale:1.1
}}

transition={{
duration:0.4
}}

className="relative h-full w-full"

>


<Image

src={event.image}

alt={event.title}

fill

className="object-cover"

/>


</motion.div>


</div>






<div className="p-5">


<h2 className="text-lg font-bold">

{event.title}

</h2>




<div className="mt-3 space-y-2 text-sm text-gray-600">


<p className="flex items-center gap-2">

<CalendarDays size={16}/>

{event.date}

</p>



<p className="flex items-center gap-2">

<MapPin size={16}/>

{event.location}

</p>



</div>





<p className="mt-4 font-bold text-violet-600">

${event.price}

</p>





<Link

href={`/events/${event._id}`}

className="mt-5 block rounded-xl bg-violet-600 py-2 text-center text-white hover:bg-violet-700"

>

View Details

</Link>



</div>



</motion.div>


))


}


</div>







{/* Pagination */}


<div className="mt-12 flex justify-center gap-3">


{

Array.from({
length:totalPages
}).map((_,i)=>(


<motion.button

key={i}

whileHover={{
scale:1.1
}}

whileTap={{
scale:0.9
}}

onClick={()=>setPage(i+1)}

className={`rounded-lg px-4 py-2 ${
page===i+1
?
"bg-violet-600 text-white"
:
"bg-white"
}`}

>

{i+1}

</motion.button>


))


}


</div>





</div>

</main>


);


}
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import { motion } from "framer-motion";

interface Analytics {

  totalUsers:number;

  totalOrganizers:number;

   totalAdmins:number;

  totalEvents:number;

  totalBookings:number;

  totalRevenue:number;

}

export default function AnalyticsDashboard(){

const [data,setData]=
useState<Analytics | null>(null);

useEffect(()=>{

const load=async()=>{

const res=await axios.get(
"http://localhost:5000/api/admin/analytics",
{
withCredentials:true,
}
);

setData(res.data);

};

load();

},[]);

if(!data){

return(

<div className="py-20 text-center">

Loading...

</div>

);

}

const chartData=[

{
name:"Users",
value:data.totalUsers,
},

{
name:"Events",
value:data.totalEvents,
},

{
name:"Bookings",
value:data.totalBookings,
},

{
name:"Revenue",
value:data.totalRevenue,
},

];

const pieData=[

{
name:"Users",
value:data.totalUsers,
},

{
name:"Organizers",
value:data.totalOrganizers,
},

{
name:"Admins",
value:data.totalAdmins,
},

];

return(

<div className="space-y-10">

<h1 className="text-4xl font-bold">

Analytics Dashboard

</h1>

<div className="grid gap-6 md:grid-cols-5">

<Card
title="Users"
value={data.totalUsers}
/>

<Card
title="Organizers"
value={data.totalOrganizers}
/>

<Card
title="Events"
value={data.totalEvents}
/>

<Card
 title="Admins"
 value={data.totalAdmins}
/>

<Card
title="Bookings"
value={data.totalBookings}
/>

<Card
title="Revenue"
value={`৳ ${data.totalRevenue}`}
/>

</div>

<div className="grid gap-8 lg:grid-cols-2">

<motion.div

initial={{
opacity:0,
y:40,
}}

animate={{
opacity:1,
y:0,
}}

className="rounded-3xl bg-white p-6 shadow"

>

<h2 className="mb-6 text-xl font-bold">

Overview

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<BarChart
data={chartData}
>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="value"
fill="#7c3aed"
/>

</BarChart>

</ResponsiveContainer>

</motion.div>

<motion.div

initial={{
opacity:0,
y:40,
}}

animate={{
opacity:1,
y:0,
}}

className="rounded-3xl bg-white p-6 shadow"

>

<h2 className="mb-6 text-xl font-bold">

Users Distribution

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<PieChart>

<Pie

data={pieData}

dataKey="value"

outerRadius={120}

label

>

<Cell fill="#7c3aed"/>

<Cell fill="#a855f7"/>

<Cell fill="#c084fc"/>

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</motion.div>

</div>

<motion.div

initial={{
opacity:0,
y:40,
}}

animate={{
opacity:1,
y:0,
}}

className="rounded-3xl bg-white p-6 shadow"

>

<h2 className="mb-6 text-xl font-bold">

Growth

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<LineChart
data={chartData}
>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="value"

stroke="#7c3aed"

strokeWidth={4}

/>

</LineChart>

</ResponsiveContainer>

</motion.div>

</div>

);

}

function Card({

title,

value,

}:{

title:string;

value:number|string;

}){

return(

<motion.div

whileHover={{
y:-8,
}}

className="rounded-3xl bg-white p-6 shadow"

>

<h4 className="text-gray-500">

{title}

</h4>

<h2 className="mt-3 text-4xl font-bold text-violet-700">

{value}

</h2>

</motion.div>

);

}
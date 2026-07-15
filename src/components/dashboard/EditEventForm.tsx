"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface Props {
  id:string;
}


interface EventFormData {

  title:string;
  category:string;
  date:string;
  time:string;
  location:string;
  price:number;
  image:string;
  description:string;
  organizer:string;
  availableSeats:number;

}


export default function EditEventForm({
  id
}:Props){


const router = useRouter();


const [loading,setLoading] = useState(true);


const [formData,setFormData] = useState<EventFormData>({

title:"",
category:"",
date:"",
time:"",
location:"",
price:0,
image:"",
description:"",
organizer:"",
availableSeats:0,

});


const [originalData,setOriginalData] =
useState<EventFormData | null>(null);



useEffect(()=>{


const fetchEvent = async()=>{


try{


const res = await axios.get(

`https://event-sphere-server-nu.vercel.app/api/events/${id}`

);


const event = res.data.event;



const data:EventFormData = {


title:event.title || "",

category:event.category || "",

date:event.date || "",

time:event.time || "",

location:event.location || "",

price:Number(event.price ?? 0),

image:event.image || "",

description:event.description || "",

organizer:event.organizer || "",

availableSeats:Number(event.availableSeats ?? 0),


};



setFormData(data);

setOriginalData(data);



}
catch(error){

console.log(error);

toast.error("Failed to load event");

}

finally{

setLoading(false);

}


};


fetchEvent();



},[id]);




const handleChange = (
e:React.ChangeEvent<
HTMLInputElement | HTMLTextAreaElement
>
)=>{

const {name,value}=e.target;


setFormData({

...formData,

[name]:
name === "price" || name === "availableSeats"
? Number(value)
: value,
});


};

const handleSubmit = async(
  e:React.FormEvent
)=>{

  e.preventDefault();


  try{


    const updatedFields: Record<string, string | number> = {};


    Object.keys(formData).forEach((field)=>{


      if(
        formData[field as keyof EventFormData] !== 
        originalData?.[field as keyof EventFormData]
      ){

        updatedFields[field] =
        formData[field as keyof EventFormData];

      }


    });



    await axios.put(

      `https://event-sphere-server-nu.vercel.app/api/events/${id}`,

      updatedFields,

      {
        withCredentials:true,
      }

    );


    toast.success(
      "Event updated successfully"
    );


    router.push(
      "/dashboard/my-events"
    );


  }
  catch(error){

    console.log(error);

    toast.error(
      "Update failed"
    );

  }


};


if(loading){

return(

<div className="py-20 text-center">

Loading...

</div>

);

}



return(


<form

onSubmit={handleSubmit}

className="rounded-2xl bg-white p-8 shadow-lg grid gap-5 md:grid-cols-2"

>


<h1 className="text-3xl text-center text-purple-700 font-bold md:col-span-2">

Edit Event

</h1>



<input

name="title"

placeholder="Event Title"

value={formData.title}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3"

/>




<input

name="category"

placeholder="Category"

value={formData.category}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3"

/>




<input

name="date"

type="date"

value={formData.date}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3"

/>




<input

name="time"

type="time"

value={formData.time}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3"

/>




<input

name="location"

placeholder="Event Location"

value={formData.location}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3"

/>




<input

name="organizer"

placeholder="Organizer Name"

value={formData.organizer}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3"

/>




<input

name="price"

type="number"

placeholder="Ticket Price"

value={formData.price}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3"

/>




<input

name="availableSeats"

type="number"

placeholder="Available Seats"

value={formData.availableSeats}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3"

/>




<input

name="image"

placeholder="Image URL"

value={formData.image}

onChange={handleChange}

className="rounded-xl border border-violet-600 px-4 py-3 md:col-span-2"

/>





<textarea

name="description"

placeholder="Event Description"

value={formData.description}

onChange={handleChange}

rows={5}

className="rounded-xl border border-violet-600 px-4 py-3 md:col-span-2"

/>




<button

className="rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 md:col-span-2"

>

Update Event

</button>



</form>


);


}
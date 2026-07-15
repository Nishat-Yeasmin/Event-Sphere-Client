"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


export default function EventForm() {

  const router = useRouter();

  const [loading,setLoading] = useState(false);


  const [formData,setFormData] = useState({

    title:"",
    category:"",
    date:"",
    time:"",
    location:"",
    price:"",
    image:"",
    description:"",
    organizer:"",
    availableSeats:"",

  });



  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  )=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };



  const handleSubmit = async (
    e:React.FormEvent
  )=>{

    e.preventDefault();


    try{

      setLoading(true);


      const response = await axios.post(

        "https://event-sphere-server-nu.vercel.app/api/events",

        {

          ...formData,

          price:Number(formData.price),

          availableSeats:Number(
            formData.availableSeats
          )

        },

        {
          withCredentials:true
        }

      );


      toast.success(
        response.data.message
      );


      router.push("/dashboard");



    }catch(error){


      console.log(error);


      if(axios.isAxiosError(error)){

        toast.error(
          error.response?.data?.message ||
          "Failed to add event"
        );

      }
      else{

        toast.error(
          "Something went wrong"
        );

      }


    }finally{

      setLoading(false);

    }


  };




  return (

    <motion.form

      onSubmit={handleSubmit}

      initial={{
        opacity:0,
        y:30
      }}

      animate={{
        opacity:1,
        y:0
      }}

      className="space-y-5 rounded-2xl bg-white p-8 shadow-lg"

    >


      <Input
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
      />


      <Input
        name="category"
        placeholder="Category (Conference, Workshop)"
        value={formData.category}
        onChange={handleChange}
      />


      <Input
        name="date"
        type="date"
        placeholder="Select event date"
        value={formData.date}
        onChange={handleChange}
      />


      <Input
        name="time"
        type="time"
          placeholder="Select event time"
        value={formData.time}
        onChange={handleChange}
      />


      <Input
        name="location"
        placeholder="Event Location"
        value={formData.location}
        onChange={handleChange}
      />


      <Input
        name="price"
        type="number"
        placeholder="Ticket Price"
        value={formData.price}
        onChange={handleChange}
      />


      <Input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />


      <Input
        name="organizer"
        placeholder="Organizer Name"
        value={formData.organizer}
        onChange={handleChange}
      />


      <Input
        name="availableSeats"
        type="number"
        placeholder="Available Seats"
        value={formData.availableSeats}
        onChange={handleChange}
      />


      <textarea

        name="description"

        placeholder="Event Description"

        value={formData.description}

        onChange={handleChange}

        className="w-full rounded-xl border p-3 outline-none focus:border-violet-600"

        rows={5}

      />



      <button

        disabled={loading}

        className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"

      >

        {
          loading ?

          <Loader2 className="animate-spin"/>

          :

          "Add Event"
        }


      </button>



    </motion.form>

  );

}




function Input({

  name,

  placeholder,

  value,

  onChange,

  type="text"

}:{

  name:string;

  placeholder:string;

  value:string;

  onChange:
  React.ChangeEventHandler<HTMLInputElement>;

  type?:string;

}){


return (

<input

type={type}

name={name}

placeholder={placeholder}

value={value}

onChange={onChange}

className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"

/>

)

}
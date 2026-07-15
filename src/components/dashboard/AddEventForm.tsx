"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddEventForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({

    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    price: "",
    image: "",
    description: "",
    organizer: "",
    availableSeats: "",

  });



  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);


      const res = await axios.post(

        "https://event-sphere-server-nu.vercel.app/api/events",

        {

          ...formData,

          price:Number(formData.price),

          availableSeats:Number(
            formData.availableSeats
          ),

        },

        {

          withCredentials:true,

        }

      );


      toast.success(
        res.data.message
      );


      router.push(
        "/dashboard/my-events"
      );


    } catch(error: unknown){

  console.log(error);

  if (axios.isAxiosError(error)) {

    toast.error(
      error.response?.data?.message ||
      "Failed to add event"
    );

  } else {

    toast.error(
      "Something went wrong"
    );

  }

} finally {

      setLoading(false);

    }

  };



  return (

    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h1 className="mb-8 text-3xl font-bold">

        Add New Event

      </h1>


      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >


        <input
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />


        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />


        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />


        <input
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />


        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />


        <input
          name="organizer"
          placeholder="Organizer Name"
          value={formData.organizer}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />


        <input
          name="price"
          type="number"
          placeholder="Ticket Price"
          value={formData.price}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />


        <input
          name="availableSeats"
          type="number"
          placeholder="Available Seats"
          value={formData.availableSeats}
          onChange={handleChange}
          className="rounded-xl border p-3"
          required
        />


        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="rounded-xl border p-3 md:col-span-2"
          required
        />


        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          className="rounded-xl border p-3 md:col-span-2"
          rows={5}
          required
        />


        <button
          disabled={loading}
          className="rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 md:col-span-2"
        >

          {
            loading
            ?
            "Adding..."
            :
            "Add Event"
          }


        </button>


      </form>


    </div>

  );

}
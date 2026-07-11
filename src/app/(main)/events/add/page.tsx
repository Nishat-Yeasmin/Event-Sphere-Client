import EventForm from "@/components/events/EventForm";


export default function AddEventPage(){

  return (

    <main className="min-h-screen bg-gray-50 py-16">

      <div className="mx-auto max-w-3xl px-5">

        <h1 className="mb-8 text-center text-4xl font-bold text-violet-600">

          Add New Event

        </h1>


        <EventForm/>

      </div>

    </main>

  );

}
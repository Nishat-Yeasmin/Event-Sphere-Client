import EditEventForm from "@/components/dashboard/EditEventForm";



export default async function EditEventPage({
  params,
}:{
  params: Promise<{id:string}>;
}){

const {id} = await params;

  return (

    <div className="p-6">

      <EditEventForm id={id}/>

    </div>

  );

}
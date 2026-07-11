import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/shared/Logo";



export default function RegisterPage() {

  return (

    <main className="flex min-h-screen items-center justify-center bg-violet-50 px-5 my-2.5 ">


      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-violet-600">


        <div className="mb-8 text-center">


          <div className="flex justify-center">
            <Logo />
          </div>


          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Create Account
          </h1>


          <p className="mt-3 text-gray-600">
            Join EventSphere and discover amazing events.
          </p>


        </div>


        <RegisterForm />


      </div>


    </main>

  );

}
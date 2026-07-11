import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/shared/Logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-violet-50 px-5">

      <div className="w-full max-w-md border border-violet-600 rounded-3xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">

          <div className="flex justify-center">
            <Logo />
          </div>


          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>


          <p className="mt-3 text-gray-600">
            Login to continue exploring events.
          </p>

        </div>


        <LoginForm />

      </div>

    </main>
  );
}
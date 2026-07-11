"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { loginSchema } from "@/lib/validations/auth.schema";
import { LoginFormData } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { getCurrentUser } = useAuth();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {

  try {

    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );
    
   
    toast.success(response.data.message);
    await getCurrentUser();
   router.push("/dashboard");
    console.log(response.data);

  } catch (error: unknown) {

    console.log(error);

    if (axios.isAxiosError(error)) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } else {

      toast.error("Something went wrong");

    }

  } finally {

    setLoading(false);

  }

};

  const handleDemoLogin = () => {
    setValue("email", "demo@eventsphere.com");
    setValue("password", "123456");
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-600"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-violet-600"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span>Remember Me</span>
        </label>

        <Link
          href="/forgot-password"
          className="font-medium text-violet-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Login"
        )}
      </button>

      {/* Demo Login */}
      <button
        type="button"
        onClick={handleDemoLogin}
        className="w-full rounded-xl border border-violet-600 py-3 font-semibold text-violet-600 transition hover:bg-violet-50"
      >
        Demo Login
      </button>

      {/* Register */}
      <p className="text-center text-sm text-gray-600">
        Do not have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-violet-600 hover:underline"
        >
          Create Account
        </Link>
      </p>
    </motion.form>
  );
}
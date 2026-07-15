"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { registerSchema } from "@/lib/validations/auth.schema";
import { RegisterFormData } from "@/types/auth";


export default function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const router = useRouter();

const { getCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
      defaultValues: {
    role: "user",
  },

  });



  const onSubmit = async (data: RegisterFormData) => {

  try {

    setLoading(true);


    const response = await axios.post(
      "https://event-sphere-server-nu.vercel.app/api/auth/register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      },
      {
        withCredentials: true,
      }
    );


    toast.success(response.data.message);
await getCurrentUser();

router.push("/dashboard");

  }catch (error: unknown) {
 console.log(error);
  if (axios.isAxiosError(error)) {

    toast.error(
      error.response?.data?.message ||
      "Registration failed"
    );

  } else {

    toast.error("Something went wrong");

  }

}finally {

    setLoading(false);

  }

};



  return (

    <motion.form

      onSubmit={handleSubmit(onSubmit)}

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:0.5
      }}

      className="space-y-5"

    >


      {/* Name */}

      <div>

        <label className="mb-2 block font-medium text-gray-700">
          Full Name
        </label>


        <input

          type="text"

          placeholder="Enter your name"

          {...register("name")}

          className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          transition
          focus:border-violet-600
          "

        />


        {
          errors.name && (

            <p className="mt-2 text-sm text-red-500">
              {errors.name.message}
            </p>

          )
        }


      </div>





      {/* Email */}

      <div>

        <label className="mb-2 block font-medium text-gray-700">
          Email Address
        </label>


        <input

          type="email"

          placeholder="Enter your email"

          {...register("email")}

          className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          transition
          focus:border-violet-600
          "

        />


        {
          errors.email && (

            <p className="mt-2 text-sm text-red-500">
              {errors.email.message}
            </p>

          )
        }


      </div>





      {/* Password */}

      <div>

        <label className="mb-2 block font-medium text-gray-700">
          Password
        </label>


        <div className="relative">

          <input

            type={showPassword ? "text" : "password"}

            placeholder="Create password"

            {...register("password")}

            className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            pr-12
            outline-none
            transition
            focus:border-violet-600
            "

          />


          <button

            type="button"

            onClick={() =>
              setShowPassword(!showPassword)
            }

            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            "

          >

            {
              showPassword
              ?
              <EyeOff size={20}/>
              :
              <Eye size={20}/>
            }

          </button>


        </div>


        {
          errors.password && (

            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>

          )
        }


      </div>






      {/* Confirm Password */}

      <div>

        <label className="mb-2 block font-medium text-gray-700">
          Confirm Password
        </label>


        <div className="relative">


          <input

            type={
              showConfirmPassword
              ?
              "text"
              :
              "password"
            }


            placeholder="Confirm password"


            {...register("confirmPassword")}


            className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            pr-12
            outline-none
            transition
            focus:border-violet-600
            "


          />



          <button

            type="button"


            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }


            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            "

          >


            {
              showConfirmPassword
              ?
              <EyeOff size={20}/>
              :
              <Eye size={20}/>
            }


          </button>


        </div>


        {
          errors.confirmPassword && (

            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>

          )
        }


      </div>


{/* Role */}

<div>

<label className="mb-2 block font-medium">

Register As

</label>

<select

{...register("role")}

className="w-full cursor-pointer rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"

>

<option value="user" className="cursor-pointer">

User

</option>

<option value="organizer" className="cursor-pointer">

Organizer

</option>

</select>

</div>


      {/* Submit Button */}

      <button

        type="submit"

        disabled={loading}

        className="
        flex
        w-full
        items-center
        justify-center
        rounded-xl
        bg-violet-600
        py-3
        font-semibold
        text-white
        transition
        hover:bg-violet-700
        disabled:opacity-70
        "

      >

        {
          loading
          ?
          <Loader2 className="animate-spin" size={20}/>
          :
          "Create Account"
        }


      </button>





      {/* Login Link */}

      <p className="text-center text-sm text-gray-600">

        Already have an account?{" "}


        <Link

          href="/login"

          className="
          font-semibold
          text-violet-600
          hover:underline
          "

        >

          Login

        </Link>


      </p>



    </motion.form>

  );

}
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarDays,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  PlusCircle,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import toast from "react-hot-toast";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuth();


  const handleLogout = async () => {

    await logout();

    toast.success("Logout successful");

    router.push("/");

  };


  const publicLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Events",
      path: "/events",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];


  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">


        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-violet-600"
        >

          <CalendarDays size={28}/>

          EventSphere

        </Link>



        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">

          {
            publicLinks.map((link)=>(

              <Link
                key={link.path}
                href={link.path}
                className={`transition ${
                  pathname === link.path
                  ? "text-violet-600 font-semibold"
                  : "text-gray-600 hover:text-violet-600"
                }`}
              >

                {link.name}

              </Link>

            ))
          }


          {
            user ? (

              <div className="flex items-center gap-4">


                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-violet-600"
                >

                  <LayoutDashboard size={18}/>

                  Dashboard

                </Link>


                <Link
                  href="/events/add"
                  className="flex items-center gap-2 text-gray-700 hover:text-violet-600"
                >

                  <PlusCircle size={18}/>

                  Add Event

                </Link>



                <div className="flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2">

                  <User size={18}
                    className="text-violet-600"
                  />

                  <span className="text-sm font-medium">
                    {user.name}
                  </span>

                </div>



                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                >

                  <LogOut size={18}/>

                  Logout

                </button>


              </div>


            ) : (

              <div className="flex items-center gap-3">


                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-xl border border-violet-600 px-4 py-2 text-violet-600 hover:bg-violet-50"
                >

                  <LogIn size={18}/>

                  Login

                </Link>



                <Link
                  href="/register"
                  className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                >

                  Register

                </Link>


              </div>

            )
          }


        </div>



        {/* Mobile Button */}

        <button
          className="md:hidden"
          onClick={()=>setOpen(!open)}
        >

          {
            open ?
            <X/>
            :
            <Menu/>
          }

        </button>


      </nav>




      {/* Mobile Menu */}

      {
        open && (

          <motion.div
            initial={{
              opacity:0,
              y:-20
            }}
            animate={{
              opacity:1,
              y:0
            }}
            className="md:hidden border-t bg-white px-5 py-5 space-y-4"
          >


            {
              publicLinks.map((link)=>(

                <Link
                  key={link.path}
                  href={link.path}
                  onClick={()=>setOpen(false)}
                  className="block text-gray-700"
                >

                  {link.name}

                </Link>

              ))
            }


            {
              user ? (

                <>

                <Link
                  href="/dashboard"
                  className="block"
                >
                  Dashboard
                </Link>


                <Link
                  href="/events/add"
                  className="block"
                >
                  Add Event
                </Link>


                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-violet-600 px-4 py-2 text-white"
                >
                  Logout
                </button>

                </>


              ) : (

                <>

                <Link href="/login">
                  Login
                </Link>

                <Link href="/register">
                  Register
                </Link>

                </>

              )
            }


          </motion.div>

        )
      }


    </header>
  );
}
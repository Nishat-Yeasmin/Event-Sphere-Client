"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

import Container from "../Container";
import Logo from "../Logo";
import Button from "../Button";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Explore Events",
    href: "/events",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <Container>
        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <Logo />

          {/* Desktop Menu */}

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-violet-600 transition font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}

          <div className="hidden md:flex items-center gap-3">

            <Link href="/login">
              <Button className="bg-transparent text-violet-600 border border-violet-600 hover:bg-violet-50">
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button>
                Register
              </Button>
            </Link>

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl text-violet-600"
          >
            {open ? <IoClose /> : <HiOutlineBars3BottomRight />}
          </button>

        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="md:hidden pb-6">

            <div className="flex flex-col gap-5">

              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-700 hover:text-violet-600"
                >
                  {item.name}
                </Link>
              ))}

              <Link href="/login">
                <Button
                  className="w-full bg-transparent text-violet-600 border border-violet-600 hover:bg-violet-50"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className="w-full">
                  Register
                </Button>
              </Link>

            </div>

          </div>
        )}

      </Container>
    </header>
  );
};

export default Navbar;
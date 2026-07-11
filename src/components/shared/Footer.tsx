"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import Container from "../shared/Container";
import Logo from "../shared/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >

          {/* Column 1 */}

          <div>

            <Logo />

            <p className="mt-5 leading-7 text-gray-400">
              EventSphere is a modern event management platform where
              people can discover, explore and register for amazing
              events happening around them.
            </p>

          </div>

          {/* Column 2 */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link href="/" className="hover:text-violet-400 transition">
                Home
              </Link>

              <Link href="/events" className="hover:text-violet-400 transition">
                Explore Events
              </Link>

              <Link href="/about" className="hover:text-violet-400 transition">
                About
              </Link>

              <Link href="/contact" className="hover:text-violet-400 transition">
                Contact
              </Link>

            </div>

          </div>

          {/* Column 3 */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3">

              <Link href="#">
                Privacy Policy
              </Link>

              <Link href="#">
                Terms & Conditions
              </Link>

              <Link href="#">
                Help Center
              </Link>

              <Link href="#">
                FAQ
              </Link>

            </div>

          </div>

          {/* Column 4 */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-3">

              <p>📧 support@eventsphere.com</p>

              <p>📞 +880 1700-000000</p>

              <p>📍 Sylhet, Bangladesh</p>

            </div>

            <div className="flex items-center gap-4 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center hover:bg-violet-700 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center hover:bg-violet-700 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center hover:bg-violet-700 transition"
              >
                <FaGithub />
              </a>

            </div>

          </div>

        </motion.div>

        <div className="border-t border-gray-800 mt-14 pt-6 text-center text-gray-500">

          © {new Date().getFullYear()} EventSphere. All rights reserved.

        </div>

      </Container>
    </footer>
  );
};

export default Footer;
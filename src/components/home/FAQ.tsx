"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const faqs = [
  {
    id: 1,
    question: "How do I register for an event?",
    answer:
      "Simply open the event details page, click the Register button, complete the registration form, and submit it. You'll receive instant confirmation after a successful registration.",
  },
  {
    id: 2,
    question: "Can I cancel my event registration?",
    answer:
      "Yes. You can cancel your registration before the registration deadline from your dashboard. After the deadline, cancellation may not be available depending on the organizer's policy.",
  },
  {
    id: 3,
    question: "Are all events verified?",
    answer:
      "Yes. Every event listed on EventSphere is reviewed before publication to ensure authenticity and provide a safe experience for our users.",
  },
  {
    id: 4,
    question: "Do I need an account to register?",
    answer:
      "Yes. You must create an account and log in before registering for any event. This helps us manage your registrations securely.",
  },
  {
    id: 5,
    question: "Can I organize my own events?",
    answer:
      "Absolutely! After creating an account, you can add and manage your own events from your organizer dashboard.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="bg-violet-50 py-20">
      <Container>
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Find answers to the most common questions about EventSphere."
        />

        <div className="mx-auto mt-14 max-w-4xl space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              layout
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -5,
              }}
              className={`overflow-hidden rounded-2xl border transition-all duration-300
              ${
                openId === faq.id
                  ? "border-violet-500 shadow-xl shadow-violet-100"
                  : "border-violet-100 bg-white shadow-md hover:border-violet-300 hover:shadow-lg"
              }`}
            >
              <button
                onClick={() =>
                  setOpenId(openId === faq.id ? null : faq.id)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <h3
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    openId === faq.id
                      ? "text-violet-700"
                      : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </h3>

                <motion.div
                  animate={{
                    rotate: openId === faq.id ? 180 : 0,
                    scale: openId === faq.id ? 1.15 : 1,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                    openId === faq.id
                      ? "bg-violet-600 text-white"
                      : "bg-violet-100 text-violet-600"
                  }`}
                >
                  <ChevronDown size={22} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  >
                    <motion.div
                      initial={{
                        y: -10,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        delay: 0.1,
                      }}
                      className="border-t border-violet-100 px-6 py-5 leading-8 text-gray-600"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
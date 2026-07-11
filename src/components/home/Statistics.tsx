"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const chartData = [
  { month: "Jan", events: 18 },
  { month: "Feb", events: 24 },
  { month: "Mar", events: 31 },
  { month: "Apr", events: 28 },
  { month: "May", events: 35 },
  { month: "Jun", events: 42 },
];

const stats = [
  {
    title: "Total Events",
    value: "500+",
  },
  {
    title: "Registered Users",
    value: "15K+",
  },
  {
    title: "Cities Covered",
    value: "40+",
  },
  {
    title: "Average Rating",
    value: "4.9",
  },
];

export default function Statistics() {
  return (
    <section className="bg-violet-50 py-20">
      <Container>
        <SectionTitle
          title="EventSphere in Numbers"
          subtitle="Our growing community and successful events across Bangladesh."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="rounded-2xl bg-white border border-violet-100 p-8 text-center shadow-md hover:shadow-xl hover:border-violet-300 transition-all duration-300 cursor-pointer"
              >
                <motion.h3
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.15 + 0.2,
                  }}
                  className="text-4xl font-extrabold text-violet-600"
                >
                  {item.value}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.15 + 0.3,
                  }}
                  className="mt-3 text-gray-600"
                >
                  {item.title}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
            }}
            whileHover={{
              y: -5,
            }}
            className="rounded-2xl bg-white border border-violet-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 h-[360px]"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Monthly Event Growth
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Number of events organized each month
              </p>
            </div>

            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" />

                <Tooltip
                  cursor={{ fill: "#F5F3FF" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E9D5FF",
                  }}
                />

                <Bar
                  dataKey="events"
                  fill="#7C3AED"
                  radius={[8, 8, 0, 0]}
                  animationBegin={500}
                  animationDuration={2500}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
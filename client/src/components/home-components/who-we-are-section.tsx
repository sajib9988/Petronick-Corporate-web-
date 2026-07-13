"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeSlide, staggerContainer } from "@/lib/motion";

const features = [
  "Digital product launch capability",
  "Procurement and logistics leverage",
  "Fulfillment infrastructure",
  "Advisory expertise",
];

const stats = [
  { value: "7+", label: "Business Units", bg: "bg-gray-900 text-white" },
  { value: "100%", label: "Revenue Ready", bg: "bg-emerald-50 text-gray-900" },
  { value: "Multi", label: "Market Reach", bg: "bg-blue-50 text-gray-900" },
  { value: "1", label: "Ecosystem", bg: "bg-amber-50 text-gray-900" },
];

export default function WhoWeAreSection() {
  return (
    <section className="bg-white py-20 lg:py-24 border border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
        {/* Left: text — fast slide-in from left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlide("left", 0, 60, 0.4)}
        >
  <p className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase mb-3">
  Who We Are
</p>

<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
  One Platform. Multiple Revenue Streams.
</h2>

<p className="text-base leading-8 text-gray-600 mb-8 max-w-2xl">
  Petronick Corporate Holdings LLC owns and operates multiple
  business units designed to work together — accelerating market
  entry, scaling operations, and maximizing profitability across
  every subsidiary.
</p>

<ul className="space-y-3">
  {features.map((item) => (
    <li
      key={item}
      className="flex items-center gap-3 text-base text-gray-700"
    >
      <CheckCircle2
        size={18}
        className="text-emerald-500 flex-shrink-0"
      />
      {item}
    </li>
  ))}
</ul>
        </motion.div>

        {/* Right: stats grid — fast slide-in from right, staggered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-2 gap-5 min-w-0"
        >
          {stats.map((s) => (
           <motion.div
  key={s.label}
  variants={fadeSlide("right", 0, 60, 0.4)}
  className={`rounded-2xl p-7 ${s.bg}`}
>
  <div className="text-3xl lg:text-4xl font-bold tracking-tight">
    {s.value}
  </div>

  <div className="mt-2 text-base font-medium opacity-70">
    {s.label}
  </div>
</motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
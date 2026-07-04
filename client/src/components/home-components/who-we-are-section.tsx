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
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
        {/* Left: text — fast slide-in from left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlide("left", 0, 60, 0.4)}
        >
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
            Who We Are
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 leading-snug">
            One Platform. Multiple Revenue Streams.
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Petronick Corporate Holdings LLC owns and operates multiple
            business units designed to work together — accelerating market
            entry, scaling operations, and maximizing profitability across
            every subsidiary.
          </p>
          <ul className="space-y-2.5">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
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
          className="grid grid-cols-2 gap-3 min-w-0"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeSlide("right", 0, 60, 0.4)}
              className={`rounded-xl p-5 ${s.bg}`}
            >
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs mt-1 opacity-60">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
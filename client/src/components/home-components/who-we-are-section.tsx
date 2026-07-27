"use client";


import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { fadeSlide, staggerContainer } from "@/lib/motion";

const features = [
  "Digital product launch capability",
  "Procurement and logistics leverage",
  "Fulfillment infrastructure",
  "Advisory expertise",
];

// After
const stats = [
  {
    number: 7,
    suffix: "+",
    label: "Business Units",
    bg: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
  },
  {
    number: 100,
    suffix: "%",
    label: "Revenue Ready",
    bg: "bg-white text-gray-900 ring-1 ring-blue-100",
  },
  {
    number: null,
    display: "Multi",
    label: "Market Reach",
    bg: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
  },
  {
    number: 1,
    suffix: "",
    label: "Ecosystem",
    bg: "bg-white text-gray-900 ring-1 ring-orange-100",
  },
];

export default function WhoWeAreSection() {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });




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
    // After
        <motion.div
          ref={ref}
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
              className={`rounded-2xl p-7 shadow-sm ${s.bg}`}
            >
              <div className="text-3xl lg:text-4xl font-bold tracking-tight">
                {s.number !== null ? (
                  <>
                    {inView ? <CountUp end={s.number} duration={2} /> : 0}
                    {s.suffix}
                  </>
                ) : (
                  s.display
                )}
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
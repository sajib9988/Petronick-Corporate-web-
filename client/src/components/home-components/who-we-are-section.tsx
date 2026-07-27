"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const features = [
  "Digital product launch capability",
  "Procurement and logistics leverage",
  "Fulfillment infrastructure",
  "Advisory expertise",
];

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
    bg: "bg-white text-gray-900 ring-1 ring-white/20",
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
    bg: "bg-white text-gray-900 ring-1 ring-white/20",
  },
];

// ✅ Explicit Variants type — no inference issues
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function WhoWeAreSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background: Image 1 style — Red replaced with Orange */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-600 to-cyan-500" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-white/70 uppercase mb-3">
            Who We Are
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            One Platform. Multiple Revenue Streams.
          </h2>

          <p className="text-base leading-8 text-white/80 mb-8 max-w-2xl">
            Petronick Corporate Holdings LLC owns and operates multiple
            business units designed to work together — accelerating market
            entry, scaling operations, and maximizing profitability across
            every subsidiary.
          </p>

          <ul className="space-y-3">
            {features.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-base text-white/90"
              >
                <CheckCircle2
                  size={18}
                  className="text-emerald-400 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Stats Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-2 gap-5 min-w-0"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className={`rounded-2xl p-7 shadow-lg ${s.bg}`}
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

              <div
                className={`mt-2 text-base font-medium ${
                  s.bg.includes("bg-white") ? "opacity-60" : "opacity-80"
                }`}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
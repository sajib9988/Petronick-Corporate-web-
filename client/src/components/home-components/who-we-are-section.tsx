"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    number: 10,
    suffix: "+",
    label: "Business Units",
    bg: "bg-gradient-to-br from-amber-500 to-amber-600 text-white",
  },
  {
    number: 100,
    suffix: "%",
    label: "Revenue Ready",
    bg: "bg-white text-gray-900",
  },
  {
    number: null,
    display: "Multi",
    label: "Market Reach",
    bg: "bg-gray-800 text-white ring-1 ring-white/10",
  },
  {
    number: 1,
    suffix: "",
    label: "Ecosystem",
    bg: "bg-white text-gray-900",
  },
];

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

interface WhoWeAreContent {
  title?: string;
  paragraph?: string;
  bullet1?: string;
  bullet2?: string;
  bullet3?: string;
  bullet4?: string;
}

interface WhoWeAreSectionProps {
  image?: string | null;
  content?: WhoWeAreContent;
}

export default function WhoWeAreSection({
  image,
  content,
}: WhoWeAreSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const title =
    content?.title ?? "One Platform. Multiple Revenue Streams.";

  const paragraph =
    content?.paragraph ??
    "Petronick Corporate Holdings LLC owns and operates multiple business units designed to work together — accelerating market entry, scaling operations, and maximizing profitability across every subsidiary.";

  const features = [
    content?.bullet1 ?? "Digital product launch capability",
    content?.bullet2 ?? "Procurement and logistics leverage",
    content?.bullet3 ?? "Fulfillment infrastructure",
    content?.bullet4 ?? "Advisory expertise",
  ].filter(Boolean);

  return (
    <section
      className="relative py-20 lg:py-24 overflow-hidden bg-gray-900 bg-cover bg-center"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      {/* Dark overlay — only when a custom image is set, for text readability */}
      {image && <div className="absolute inset-0 bg-gray-900/80" />}

      {/* Default subtle grid texture — only shows when no image (keeps default look) */}
      {!image && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}

      {/* Amber glow accent — 10% pop */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-amber-400 uppercase mb-3">
            Who We Are
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {title}
          </h2>

          <p className="text-base leading-8 text-gray-400 mb-8 max-w-2xl">
            {paragraph}
          </p>

          <ul className="space-y-3">
            {features.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-base text-gray-200"
              >
                <CheckCircle2
                  size={18}
                  className="text-amber-400 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Stats Grid — stays static, not CMS-driven */}
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
                  s.bg.includes("bg-white") ? "text-gray-500" : "opacity-80"
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
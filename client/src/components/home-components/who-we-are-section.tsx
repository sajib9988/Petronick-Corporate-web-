"use client";

import { motion, type Variants } from "framer-motion";
import { Rocket, Truck, Package, UserRound, type LucideIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";

const ICON_POOL: LucideIcon[] = [Rocket, Truck, Package, UserRound];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
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
    content?.title ?? "One Platform. Multiple Growth Engines.";

  const paragraph =
    content?.paragraph ??
    "Petronick Corporate Holdings LLC owns and supports businesses that can operate independently while benefiting from shared marketing, technology, logistics, fulfillment, procurement, and strategic leadership.";

  const capabilities = [
    content?.bullet1 ?? "Digital launch capability",
    content?.bullet2 ?? "Procurement and logistics",
    content?.bullet3 ?? "Fulfillment infrastructure",
    content?.bullet4 ?? "Business advisory expertise",
  ].filter(Boolean);

  return (
    <section
      className="relative py-16 lg:py-20 overflow-hidden bg-white bg-cover bg-center"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      {image && <div className="absolute inset-0 bg-white/90" />}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-600 uppercase mb-3">
            Who We Are
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-5 leading-tight">
            {title}
          </h2>

          <p className="text-base leading-7 text-gray-500 max-w-md">
            {paragraph}
          </p>
        </motion.div>

        {/* Right: Capability icon grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {capabilities.map((label, index) => {
            const Icon = ICON_POOL[index % ICON_POOL.length];
            return (
              <motion.div
                key={label}
                variants={itemVariants}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                  <Icon size={22} className="text-gray-700" strokeWidth={1.75} />
                </div>
                <span className="text-sm font-medium text-gray-700 leading-snug">
                  {label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
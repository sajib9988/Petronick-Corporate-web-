"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface ClosingContent {
  headline?: string;
  paragraph?: string;
  badge1?: string;
  badge2?: string;
  badge3?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface ClosingSectionProps {
  image?: string | null;
  content?: ClosingContent;
}

export default function ClosingSection({
  image,
  content,
}: ClosingSectionProps) {
  const headline =
    content?.headline || "Built to Scale. Designed to Win.";

  const paragraph =
    content?.paragraph ||
    "Petronick Corporate Holdings is positioned to grow rapidly across multiple markets with infrastructure already in place.";

  const ctaText = content?.ctaText || "Get in Touch";
  const ctaLink = content?.ctaLink || "/contact";

  const badges = [
    content?.badge1 || "Scalable Infrastructure",
    content?.badge2 || "Multiple Revenue Channels",
    content?.badge3 || "Strategic Ownership Model",
  ].filter(Boolean);

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 text-center rounded-3xl border border-amber-100 overflow-hidden bg-white bg-cover bg-center"
      style={
        image
          ? {
              backgroundImage: `url("${image}")`,
            }
          : undefined
      }
    >
      {/* Background overlay */}
   {image && (
  <div className="absolute inset-0 bg-white/75 " />
)}

      {/* Default background when no CMS image exists */}
      {!image && (
        <div className="absolute inset-0 bg-white" />
      )}

      {/* Amber glow accents */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Top amber line */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.4,
        }}
        variants={staggerContainer(0.12, 0)}
        className="relative z-10"
      >
        {/* Badges */}
        <motion.div
          variants={fadeUp(0, 0.5)}
          className="inline-flex items-center gap-3 flex-wrap justify-center mb-8"
        >
          {badges.map((label) => (
            <span
              key={label}
              className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={fadeUp(0.05, 0.6)}
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
        >
          {headline}
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          variants={fadeUp(0.1, 0.6)}
          className="text-gray-500 text-sm max-w-lg mx-auto mb-7"
        >
          {paragraph}
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp(0.15, 0.6)}>
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold text-sm px-6 py-2.5 rounded-lg shadow-md shadow-amber-900/10 hover:shadow-amber-700/20 hover:scale-[1.03] transition-all"
          >
            {ctaText}
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
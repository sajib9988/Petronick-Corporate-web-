"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Network, TrendingUp, Landmark } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface ClosingContent {
  label?: string;
  headline?: string;
  paragraph?: string;
  badge1?: string;
  badge2?: string;
  badge3?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

interface ClosingSectionProps {
  image?: string | null;
  content?: ClosingContent;
}

const ICONS = [Network, TrendingUp, Landmark];

export default function ClosingSection({ content }: ClosingSectionProps) {
  const label = content?.label || "Built for Long Term Growth";
  const headline =
    content?.headline ||
    "Explore the Companies Behind Petronick Corporate Holdings LLC";
  const paragraph =
    content?.paragraph ||
    "Discover the businesses, capabilities, and opportunities within our connected portfolio.";

  const ctaText = content?.ctaText || "View Our Companies";
  const ctaLink = content?.ctaLink || "/companies";
  const secondaryBtnText = content?.secondaryBtnText || "Contact Us";
  const secondaryBtnLink = content?.secondaryBtnLink || "/contact";

  const items = [
    content?.badge1 || "Scalable Infrastructure",
    content?.badge2 || "Multiple Revenue Channels",
    content?.badge3 || "Strategic Ownership Model",
  ].filter(Boolean);

  return (
    <section className="relative py-10 px-6 sm:px-10 lg:px-12 rounded-2xl bg-gray-950 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.1, 0)}
        className="relative flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12"
      >
        {/* Left: label + headline + buttons */}
        <div className="lg:w-[46%] lg:pr-10 lg:border-r lg:border-white/10">
          <motion.p
            variants={fadeUp(0, 0.5)}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3"
          >
            <span className="h-px w-5 bg-amber-500" />
            {label}
          </motion.p>

          <motion.h2
            variants={fadeUp(0.05, 0.6)}
            className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight"
          >
            {headline}
          </motion.h2>

          <motion.div
            variants={fadeUp(0.15, 0.6)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-950 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {ctaText} <ArrowRight size={14} />
            </Link>
            <Link
              href={secondaryBtnLink}
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              {secondaryBtnText} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Right: paragraph + icon row */}
        <div className="lg:w-[54%]">
          <motion.p
            variants={fadeUp(0.1, 0.6)}
            className="text-gray-400 text-sm leading-relaxed mb-6"
          >
            {paragraph}
          </motion.p>

          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            className="grid grid-cols-3 gap-4"
          >
            {items.map((label, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.div
                  key={label}
                  variants={fadeUp(0, 0.5)}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
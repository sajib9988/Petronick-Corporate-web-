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
    <section className="relative py-14 px-6 sm:px-10 lg:px-12 rounded-3xl border border-amber-100 bg-white overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.1, 0)}
        className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        {/* Left: text + buttons */}
        <div>
          <motion.p
            variants={fadeUp(0, 0.5)}
            className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3"
          >
            {label}
          </motion.p>

          <motion.h2
            variants={fadeUp(0.05, 0.6)}
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight"
          >
            {headline}
          </motion.h2>

          <motion.p
            variants={fadeUp(0.1, 0.6)}
            className="text-gray-500 text-sm leading-relaxed max-w-md mb-7"
          >
            {paragraph}
          </motion.p>

          <motion.div
            variants={fadeUp(0.15, 0.6)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {ctaText} <ArrowRight size={14} />
            </Link>
            <Link
              href={secondaryBtnLink}
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {secondaryBtnText}
            </Link>
          </motion.div>
        </div>

        {/* Right: icon list */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          className="flex flex-col gap-5"
        >
          {items.map((label, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={label}
                variants={fadeUp(0, 0.5)}
                className="flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
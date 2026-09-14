"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Network,
  TrendingUp,
  Landmark,
} from "lucide-react";

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

export default function ClosingSection({
  content,
}: ClosingSectionProps) {
  const label =
    content?.label || "Built Your Long Term Growth";

  const headline =
    content?.headline ||
    "Explore the Companies Behind Petronick Corporate Holdings LLC";

  const paragraph =
    content?.paragraph ||
    "Discover the businesses, capabilities, and opportunities within our connected portfolio.";

  const ctaText =
    content?.ctaText || "View Our Companies";

  const ctaLink =
    content?.ctaLink || "/companies";

  const secondaryBtnText =
    content?.secondaryBtnText || "Contact Us";

  const secondaryBtnLink =
    content?.secondaryBtnLink || "/contact";

  const items = [
    content?.badge1 || "Scalable Network",
    content?.badge2 || "Multiple Revenue Channels",
    content?.badge3 || "Strategic Ownership Model",
  ].filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden rounded-2xl py-6 sm:py-7 lg:py-8">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.1, 0)}
        className="relative flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-10"
      >
        {/* LEFT */}
        <div className="lg:w-[44%] lg:border-r lg:border-gray-200 lg:pr-8">
          {/* Label */}
          <motion.p
            variants={fadeUp(0, 0.5)}
            className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-amber-600"
          >
            <span className="h-px w-5 bg-amber-500" />
            {label}
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp(0.05, 0.6)}
            className="mb-4 max-w-xl text-2xl font-bold leading-[1.05] text-gray-900 sm:text-3xl"
          >
            {headline}
          </motion.h2>

          {/* Buttons */}
          <motion.div
            variants={fadeUp(0.15, 0.6)}
            className="flex flex-wrap gap-3"
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0F2747] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#16365f]"
            >
              {ctaText}
              <ArrowRight size={14} />
            </Link>

            <Link
              href={secondaryBtnLink}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              {secondaryBtnText}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-[56%]">
          {/* Paragraph */}
          <motion.p
            variants={fadeUp(0.1, 0.6)}
            className="mb-5 max-w-2xl text-xs leading-relaxed text-gray-500 sm:text-sm"
          >
            {paragraph}
          </motion.p>

          {/* ICON ITEMS */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            className="grid grid-cols-3 gap-3"
          >
            {items.map((label, i) => {
              const Icon = ICONS[i % ICONS.length];

              return (
                <motion.div
                  key={label}
                  variants={fadeUp(0, 0.5)}
                  className="flex items-center gap-2"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Icon size={19} />
                  </div>

                  {/* Label */}
                  <span className="text-[11px] font-semibold leading-snug text-gray-800 sm:text-xs">
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
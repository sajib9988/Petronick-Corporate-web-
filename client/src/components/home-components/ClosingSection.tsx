
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
    content?.badge1 || "Scalable Infrastructure",
    content?.badge2 || "Multiple Revenue Channels",
    content?.badge3 || "Strategic Ownership Model",
  ].filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden rounded-2xl px-4 py-7 sm:px-6 sm:py-9 lg:px-0">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.1, 0)}
        className="relative flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-10"
      >
        {/* LEFT SECTION */}
        <div className="w-full border-b border-gray-100 pb-7 lg:w-[44%] lg:border-b-0 lg:border-r lg:border-gray-200 lg:pb-0 lg:pr-8">
          {/* Label */}
          <motion.p
            variants={fadeUp(0, 0.5)}
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-600"
          >
            <span className="h-px w-6 shrink-0 bg-amber-500" />
            {label}
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp(0.05, 0.6)}
            className="mb-5 max-w-xl text-2xl font-bold leading-[1.15] text-gray-900 sm:text-3xl"
          >
            {headline}
          </motion.h2>

          {/* Buttons */}
          <motion.div
            variants={fadeUp(0.15, 0.6)}
            className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            {/* Primary Button */}
            <Link
              href={ctaLink}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0F2747] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16365f] sm:w-auto"
            >
              {ctaText}
              <ArrowRight size={16} />
            </Link>

            {/* Secondary Button */}
            <Link
              href={secondaryBtnLink}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
            >
              {secondaryBtnText}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full min-w-0 lg:w-[56%]">
          {/* Description */}
          <motion.p
            variants={fadeUp(0.1, 0.6)}
            className="mb-5 max-w-[520px] text-sm leading-6 text-gray-500 sm:mb-6"
          >
            {paragraph}
          </motion.p>

          {/* BENEFIT CARDS */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
          >
            {items.map((itemLabel, i) => {
              const Icon = ICONS[i % ICONS.length];

              return (
                <motion.div
                  key={i}
                  variants={fadeUp(0, 0.5)}
                  className="flex w-full min-w-0 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-3 sm:items-start sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Icon size={21} strokeWidth={2} />
                  </div>

                  {/* Benefit Text */}
                  <span className="min-w-0 flex-1 text-sm font-semibold leading-5 text-gray-800">
                    {itemLabel}
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

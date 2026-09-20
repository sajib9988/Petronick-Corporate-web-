"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeSlide, staggerContainer } from "@/lib/motion";

interface CompaniesHeroContent {
  badge?: string;
  headline?: string;
  subheadline?: string;
  primaryBtn?: string;
  primaryBtnLink?: string;
  secondaryBtn?: string;
  secondaryBtnLink?: string;
}

interface CompaniesHeroProps {
  content?: CompaniesHeroContent;
  image?: string | null;
}

export default function CompaniesHero({image,  content }: CompaniesHeroProps) {
  const imageUrl = image;
  const badge = content?.badge ?? "PORTFOLIO";

  const headline = content?.headline ?? "Our Companies";

  const subheadline =
    content?.subheadline ??
    "Explore the specialized businesses operating under Petronick Corporate Holdings LLC. Each company serves a distinct market while benefiting from shared strategy, technology, marketing, logistics, fulfillment, procurement, and leadership.";

  const primaryBtn = content?.primaryBtn ?? "Explore the Portfolio";
  const primaryBtnLink = content?.primaryBtnLink ?? "#portfolio";

  const secondaryBtn = content?.secondaryBtn ?? "Become a Promotion Agent";
  const secondaryBtnLink = content?.secondaryBtnLink ?? "/promotion-agent";

  return (
    <section style={{ backgroundImage: `url(${imageUrl})` }}  className="relative overflow-hidden  text-white">
   

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.15, 0.1)}
        className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-6 sm:py-28 lg:px-8"
      >
        <motion.p
          variants={fadeUp(0, 0.7)}
          className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-400"
        >
          {badge}
        </motion.p>

        <motion.h1
          variants={fadeUp(0.05, 0.9)}
          className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={fadeUp(0.1, 0.9)}
          className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"
        >
          {subheadline}
        </motion.p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.div variants={fadeSlide("left", 0.15, 60, 0.8)}>
            <Link
              href={primaryBtnLink}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-amber-400 to-amber-600 px-7 py-3.5 text-sm font-bold text-[#0B1220] shadow-lg shadow-amber-900/30 transition-all hover:brightness-105 hover:scale-[1.02]"
            >
              {primaryBtn}
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div variants={fadeSlide("right", 0.15, 60, 0.8)}>
            <Link
              href={secondaryBtnLink}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/10 hover:scale-[1.02]"
            >
              {secondaryBtn}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

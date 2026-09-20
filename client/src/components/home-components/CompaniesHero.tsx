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
      {/* Decorative orbit lines + stars */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 560"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g stroke="#d4af37" strokeWidth="1">
          <ellipse
            cx="380"
            cy="120"
            rx="720"
            ry="170"
            transform="rotate(-10 380 120)"
            opacity="0.35"
          />
          <ellipse
            cx="980"
            cy="360"
            rx="760"
            ry="150"
            transform="rotate(9 980 360)"
            opacity="0.3"
          />
          <ellipse
            cx="120"
            cy="420"
            rx="560"
            ry="190"
            transform="rotate(18 120 420)"
            opacity="0.25"
          />
          <ellipse
            cx="1260"
            cy="90"
            rx="520"
            ry="240"
            transform="rotate(-22 1260 90)"
            opacity="0.2"
          />
          <ellipse
            cx="1480"
            cy="470"
            rx="640"
            ry="210"
            transform="rotate(-12 1480 470)"
            opacity="0.25"
          />
        </g>

        <g fill="#d4af37">
          <circle cx="130" cy="132" r="2.5" opacity="0.7" />
          <circle cx="232" cy="232" r="2" opacity="0.55" />
          <circle cx="85" cy="300" r="2" opacity="0.5" />
          <circle cx="165" cy="255" r="1.8" opacity="0.6" />
          <circle cx="915" cy="108" r="2.2" opacity="0.65" />
          <circle cx="1085" cy="300" r="2" opacity="0.55" />
          <circle cx="1335" cy="140" r="2.5" opacity="0.7" />
          <circle cx="695" cy="192" r="1.8" opacity="0.5" />
          <circle cx="1250" cy="330" r="2" opacity="0.5" />
        </g>

        <g fill="#ffffff">
          <circle cx="60" cy="80" r="1.5" opacity="0.4" />
          <circle cx="1380" cy="60" r="1.5" opacity="0.35" />
          <circle cx="1200" cy="420" r="1.5" opacity="0.35" />
        </g>
      </svg>

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

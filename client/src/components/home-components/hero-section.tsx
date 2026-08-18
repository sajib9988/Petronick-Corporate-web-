"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeSlide, staggerContainer } from "@/lib/motion";
import { useEffect, useRef } from "react";
import Vivus from "vivus";

interface HeroContent {
  headline?: string;
  subheadline?: string;
  primaryBtn?: string;
  primaryBtnLink?: string;
  secondaryBtn?: string;
  secondaryBtnLink?: string;
  image?: string | null;
  backgroundImage?: string | null;
}

interface HeroSectionProps {
  image?: string | null;
  content?: HeroContent;
}

/* =========================================================
   VIVUS HANDWRITING TITLE
   ========================================================= */

function HandwritingTitle() {
  useEffect(() => {
    const animation = new Vivus("hero-handwriting", {
      type: "oneByOne",
      duration: 260,
      start: "autostart",
      forceRender: false,
      selfDestroy: false,
    });

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden">
      <svg
        id="hero-handwriting"
        viewBox="0 0 1200 260"
        className="mx-auto h-auto w-full text-cyan-400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Building Revenue-Driven Businesses"
      >
        {/* তোমার existing paths এখানে থাকবে */}

        <path
          d="M70 180 C240 195 420 191 590 184 C750 177 900 176 1080 185"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* =========================================================
   HERO SECTION
   ========================================================= */

export default function HeroSection({
  image,
  content,
}: HeroSectionProps) {
  const headline =
    content?.headline ??
    "Building Revenue-Driven Businesses";

  const subheadline =
    content?.subheadline ??
    "A vertically integrated holding company operating multiple brands.";

  const primaryBtn =
    content?.primaryBtn ?? "Explore";

  const primaryBtnLink =
    content?.primaryBtnLink ?? "/";

  const secondaryBtn =
    content?.secondaryBtn ?? "Learn More";

  const secondaryBtnLink =
    content?.secondaryBtnLink ?? "/about";

  const heroImage =
    image ??
    content?.image ??
    content?.backgroundImage ??
    null;

  /*
   * Vivus SVG is designed for this exact headline.
   * If CMS changes the headline, use normal text.
   */
  const useHandwriting =
    headline.trim().toLowerCase() ===
    "building revenue-driven businesses".toLowerCase();

  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-gray-950">
      {/* =================================================
          BACKGROUND IMAGE
         ================================================= */}

      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${heroImage}")`,
          }}
        />
      )}

      {/* =================================================
          DARK OVERLAY
         ================================================= */}

      <div className="absolute inset-0 bg-gray-950/65" />

      {/* =================================================
          GRADIENT
         ================================================= */}

      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-gray-950/60 to-gray-950" />

      {/* =================================================
          CONTENT
         ================================================= */}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.25, 0.15)}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 text-center"
      >
        {/* =================================================
            HEADLINE
           ================================================= */}

        {useHandwriting ? (
          <motion.div
            variants={fadeUp(0, 1)}
            className="mb-6"
          >
            <HandwritingTitle />
          </motion.div>
        ) : (
          <motion.h1
            variants={fadeUp(0, 1)}
            className="
              mx-auto
              mb-6
              max-w-5xl
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            {headline}
          </motion.h1>
        )}

        {/* =================================================
            DECORATIVE LINE
           ================================================= */}

        <motion.div
          variants={fadeUp(0.05, 0.8)}
          className="
            mx-auto
            mb-6
            h-1
            w-16
            rounded-full
            bg-gradient-to-r
            from-emerald-400
            to-emerald-600
          "
        />

        {/* =================================================
            SUBHEADLINE
           ================================================= */}

        <motion.p
          variants={fadeUp(0, 0.9)}
          className="
            mx-auto
            mb-8
            max-w-2xl
            text-base
            leading-7
            text-white/80
            sm:text-lg
          "
        >
          {subheadline}
        </motion.p>

        {/* =================================================
            BUTTONS
           ================================================= */}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {/* Primary */}

          <motion.div
            variants={fadeSlide(
              "left",
              0,
              80,
              0.9
            )}
          >
            <Button
              asChild
              size="lg"
              className="
                border-2
                border-white/70
                bg-white/10!
                font-semibold
                text-white!
                backdrop-blur-sm
                transition-all
                hover:scale-[1.03]
                hover:border-white
                hover:bg-white/20!
              "
            >
              <Link href={primaryBtnLink}>
                {primaryBtn}
              </Link>
            </Button>
          </motion.div>

          {/* Secondary */}

          <motion.div
            variants={fadeSlide(
              "right",
              0,
              80,
              0.9
            )}
          >
            <Button
              asChild
              size="lg"
              className="
                border-0
                bg-orange-500!
                font-semibold
                text-white!
                shadow-lg
                shadow-orange-500/40
                transition-all
                hover:scale-[1.03]
                hover:bg-orange-400!
                hover:shadow-orange-400/60
              "
            >
              <Link href={secondaryBtnLink}>
                {secondaryBtn}

                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
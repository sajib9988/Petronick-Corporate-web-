"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeSlide, staggerContainer } from "@/lib/motion";
import TrustBar, { type TrustBarItem } from "@/components/home-components/TrustBar";
import { Container } from "../Container";

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
  trustItems?: TrustBarItem[];
}

export default function HeroSection({
  image,
  content,
  trustItems,
}: HeroSectionProps) {
  const headline =
    content?.headline ??
    "Building and Scaling Revenue Driven Businesses";

  const subheadline =
    content?.subheadline ??
    "A connected portfolio of specialized companies across digital growth, fulfillment, ecommerce, business advisory, product development, specialty commerce, and gifting.";

  const primaryBtn = content?.primaryBtn ?? "Explore Our Companies";
  const primaryBtnLink = content?.primaryBtnLink ?? "/companies";

  const secondaryBtn = content?.secondaryBtn ?? "Become a Promotion Agent";
  const secondaryBtnLink = content?.secondaryBtnLink ?? "/promotion-agent";
  const heroImage = image || content?.image || content?.backgroundImage || null;

  const hasTrustBar = !!trustItems && trustItems.length > 0;

  return (
    <section
      className={`relative flex min-h-[42dvh] sm:min-h-[52dvh] w-full items-center justify-center bg-gray-950 pt-14 sm:pt-20 ${
        hasTrustBar ? "pb-24 sm:pb-28" : "pb-14 sm:pb-20"
      }`}
    >
      {/* Background */}
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-950/70" />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.3, 0.2)}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.h1
          variants={fadeUp(0, 1)}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {headline}
        </motion.h1>

        <motion.div
          variants={fadeUp(0.05, 0.8)}
          className="mx-auto mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
        />

        <motion.p
          variants={fadeUp(0, 0.9)}
          className="mx-auto mb-10 max-w-2xl text-base leading-7 text-white/80 sm:text-lg"
        >
          {subheadline}
        </motion.p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <motion.div variants={fadeSlide("left", 0, 80, 0.9)}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-gray-950! font-semibold border-0 shadow-lg shadow-amber-900/30 hover:shadow-amber-700/40 hover:scale-[1.03] transition-all"
            >
              <Link href={primaryBtnLink}>
                {primaryBtn}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={fadeSlide("right", 0, 80, 0.9)}>
            <Button
              asChild
              size="lg"
              className="bg-white/10! text-white! font-semibold border-2 border-white/70 backdrop-blur-sm hover:bg-white/20! hover:border-white hover:scale-[1.03] transition-all"
            >
              <Link href={secondaryBtnLink}>
                {secondaryBtn}
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust bar — overlaps the bottom edge of the hero, aligned to the site container */}
      {hasTrustBar && (
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-[75%]">
          <Container>
            <TrustBar items={trustItems!} />
          </Container>
        </div>
      )}
    </section>
  );
}
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeSlide, staggerContainer } from "@/lib/motion";

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

export default function HeroSection({
  image,
  content,
}: HeroSectionProps) {
  const headline =
    content?.headline ??
    "Building and Scaling Revenue-Driven Businesses";

  const subheadline =
    content?.subheadline ??
    "A vertically integrated holding company operating multiple brands.";

  const primaryBtn = content?.primaryBtn ?? "Explore";
  const primaryBtnLink = content?.primaryBtnLink ?? "/";

  const secondaryBtn = content?.secondaryBtn ?? "Learn More";
  const secondaryBtnLink = content?.secondaryBtnLink ?? "/about";
  const heroImage = image || content?.image || content?.backgroundImage || null;

  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center bg-gray-950">
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
       // AFTER
        <motion.h1
          variants={fadeUp(0, 1)}
          className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {headline}
        </motion.h1>

        <motion.div
          variants={fadeUp(0.05, 0.8)}
          className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
        />

        <motion.p
          variants={fadeUp(0, 0.9)}
          className="mx-auto mb-8 max-w-2xl text-base leading-7 text-white/80 sm:text-lg"
        >
          {subheadline}
        </motion.p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <motion.div variants={fadeSlide("left", 0, 80, 0.9)}>
            <Button asChild size="lg">
              <Link href={primaryBtnLink}>
                {primaryBtn}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={fadeSlide("right", 0, 80, 0.9)}>
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryBtnLink}>{secondaryBtn}</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
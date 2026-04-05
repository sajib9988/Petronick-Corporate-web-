"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroContent {
  headline?: string;
  subheadline?: string;
  primaryBtn?: string;
  primaryBtnLink?: string;
  secondaryBtn?: string;
  secondaryBtnLink?: string;
}

interface HeroSectionProps {
  image?: string | null;
  content?: HeroContent;
}

export default function HeroSection({ image, content }: HeroSectionProps) {
  const headline = content?.headline ?? "Building and Scaling Revenue-Driven Businesses";
  const subheadline = content?.subheadline ?? "A vertically integrated holding company operating marketing, product development, fulfillment, advisory, and e-commerce brands.";
  const primaryBtn = content?.primaryBtn ?? "Explore Our Companies";
  const primaryBtnLink = content?.primaryBtnLink ?? "/companies";
  const secondaryBtn = content?.secondaryBtn ?? "Become a Promotion Agent";
  const secondaryBtnLink = content?.secondaryBtnLink ?? "/promotion-agent";

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden bg-gray-950">

      {/* Background Image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-950/75" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs sm:text-sm font-medium px-4 py-2 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Petronick Corporate Holdings LLC
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-4 sm:mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12">
            {subheadline}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 h-12 text-base rounded-lg shadow-lg"
            >
              <Link href={primaryBtnLink}>
                {primaryBtn}
                <ArrowRight size={17} className="ml-2" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-semibold px-8 h-12 text-base rounded-lg backdrop-blur-sm"
            >
              <Link href={secondaryBtnLink}>{secondaryBtn}</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
            {[
              { value: "7+", label: "Business Units" },
              { value: "100%", label: "Revenue Ready" },
              { value: "Multi", label: "Market Presence" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/50 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden sm:flex flex-col items-center gap-1">
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="text-white/40" />
      </div>
    </section>
  );
}
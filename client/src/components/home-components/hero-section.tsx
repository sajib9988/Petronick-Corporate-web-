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
    // min-h কমিয়ে দেয়া হয়েছে এবং justify-start ব্যবহার করা হয়েছে
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-start overflow-hidden bg-gray-950">

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

      {/* Content Wrapper - Padding অনেক কমানো হয়েছে (pt-8 lg:pt-16) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-16 lg:pb-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge - Margin কমানো হয়েছে (mb-4) */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Petronick Corporate Holdings LLC
          </div>

          {/* Headline - Font size কমানো হয়েছে (text-2xl থেকে max 5xl) */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-3">
            {headline}
          </h1>

          {/* Subheadline - Font size এবং margin কমানো হয়েছে */}
          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-6">
            {subheadline}
          </p>

          {/* Buttons - বাটনের সাইজও একটু ছোট করা হয়েছে */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="default"
              className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 h-10 text-sm rounded-lg shadow-lg"
            >
              <Link href={primaryBtnLink}>
                {primaryBtn}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="default"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-semibold px-6 h-10 text-sm rounded-lg backdrop-blur-sm"
            >
              <Link href={secondaryBtnLink}>{secondaryBtn}</Link>
            </Button>
          </div>

          {/* Stats - উপরের গ্যাপ কমানো হয়েছে (mt-10) */}
          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { value: "7+", label: "Units" },
              { value: "100%", label: "Ready" },
              { value: "Multi", label: "Market" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

 
    </section>
  );
}
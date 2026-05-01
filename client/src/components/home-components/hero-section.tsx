"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-gray-950">

      {/* Background */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      <div className="absolute inset-0 bg-gray-950/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
          {headline}
        </h1>

        <p className="text-white/70 mb-6">{subheadline}</p>

        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href={primaryBtnLink}>
              {primaryBtn} <ArrowRight size={16} />
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href={secondaryBtnLink}>{secondaryBtn}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
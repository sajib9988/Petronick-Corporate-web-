"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";

interface RevenueOpportunityContent {
  label?: string;
  headline?: string;
  paragraph?: string;
  btnText?: string;
  btnLink?: string;
}

interface RevenueOpportunitySectionProps {
  image?: string | null;
  content?: RevenueOpportunityContent;
}

export default function RevenueOpportunitySection({
  image,
  content,
}: RevenueOpportunitySectionProps) {
  const label = content?.label || "Promotion Agent Opportunity";
  const headline =
    content?.headline || "Represent Companies Across the PCH Ecosystem";
  const paragraph =
    content?.paragraph ||
    "Qualified Promotion Agents can introduce products, services, and opportunities from one or multiple Petronick Corporate Holdings companies based on their experience and market focus.";
  const btnText = content?.btnText || "Apply as a Promotion Agent";
  const btnLink = content?.btnLink || "/promotion-agent";

  return (
    <div className="relative w-full overflow-hidden">
      {/* Subtle Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative flex w-full flex-col gap-8 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-14">
        {/* LEFT: Icon + Label + Headline */}
        <div className="flex min-w-0 items-start gap-4 sm:gap-5 lg:max-w-sm">
          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 sm:h-16 sm:w-16">
            <Users className="text-amber-400" size={26} strokeWidth={1.8} />
          </div>

          {/* Text */}
          <div className="min-w-0">
            {/* Label */}
            <div className="mb-2 flex items-center gap-3">
              <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
                {label}
              </p>
              <span className="hidden h-px w-10 shrink-0 bg-amber-400/40 sm:block" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl font-bold leading-snug text-white sm:text-[28px] lg:text-3xl">
              {headline}
            </h2>
          </div>
        </div>

        {/* MIDDLE: Paragraph */}
        <p className="max-w-sm text-sm leading-6 text-slate-300 sm:text-[15px] lg:pt-1">
          {paragraph}
        </p>

        {/* RIGHT: CTA */}
        <div className="relative z-10 shrink-0">
          <Link
            href={btnLink}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg shadow-amber-900/30 transition-all hover:scale-[1.03] hover:shadow-amber-700/40"
          >
            {btnText}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Decorative Right Image */}
      {image && (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-80 xl:block">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 40%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 40%)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

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
      <div className="relative flex w-full items-center gap-6 py-10 sm:gap-8 sm:py-12 lg:py-14">
        {/* LEFT: Icon + Text */}
        <div className="flex min-w-0 flex-1 items-center gap-5">
          {/* Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 sm:h-16 sm:w-16">
            <Users className="text-amber-400" size={28} strokeWidth={1.8} />
          </div>

          {/* Text */}
          <div className="min-w-0">
            {/* Label */}
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
              {label}
            </p>

            {/* Headline */}
            <h2 className="mb-2 text-xl font-bold leading-snug text-white sm:text-2xl">
              {headline}
            </h2>

            {/* Paragraph */}
            <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-[15px]">
              {paragraph}
            </p>
          </div>
        </div>

        {/* RIGHT: CTA */}
        <div className="shrink-0">
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
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-72 xl:block">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 35%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 35%)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

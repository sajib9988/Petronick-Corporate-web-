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
    <div className="relative overflow-hidden bg-[#0B1220] rounded-3xl">
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className={`relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 px-6 sm:px-10 py-16 sm:py-20 lg:py-24 ${
          image ? "xl:pr-72" : ""
        }`}
      >
        {/* Icon */}
        <div className="flex w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-amber-400/30 bg-amber-400/10 items-center justify-center flex-shrink-0">
          <Users className="text-amber-400" size={26} />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2">
            {label}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
            {headline}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            {paragraph}
          </p>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <Link
            href={btnLink}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg shadow-lg shadow-amber-900/30 hover:shadow-amber-700/40 hover:scale-[1.03] transition-all whitespace-nowrap"
          >
            {btnText} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Decorative right-edge photo (uses the section's uploaded image) */}
      {image && (
        <div className="hidden xl:block absolute inset-y-0 right-0 w-72 pointer-events-none">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 35%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 35%)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
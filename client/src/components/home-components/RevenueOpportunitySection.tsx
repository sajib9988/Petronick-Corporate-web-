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
  const label =
    content?.label || "Promotion Agent Opportunity";

  const headline =
    content?.headline ||
    "Represent Companies Across the PCH Ecosystem";

  const paragraph =
    content?.paragraph ||
    "Qualified Promotion Agents can introduce products, services, and opportunities from one or multiple Petronick Corporate Holdings companies based on their experience and market focus.";

  const btnText =
    content?.btnText || "Apply as a Promotion Agent";

  const btnLink =
    content?.btnLink || "/promotion-agent";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0B1220]">
      {/* =========================
          SUBTLE GRID TEXTURE
      ========================== */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <div
        className={`
          relative z-10
          flex flex-col
          gap-6
          px-6 py-12
          sm:px-10 sm:py-16
          lg:min-h-[300px]
          lg:flex-row
          lg:items-center
          lg:gap-8
          lg:pr-[36%]
          xl:min-h-[320px]
        `}
      >
        {/* =========================
            ICON
        ========================== */}
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-amber-400/30
            bg-amber-400/10
            sm:h-16
            sm:w-16
          "
        >
          <Users
            className="text-amber-400"
            size={28}
          />
        </div>

        {/* =========================
            TEXT CONTENT
        ========================== */}
        <div className="min-w-0 flex-1 text-center">
          {/* LABEL */}
          <p
            className="
              mb-2
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-amber-400
              sm:text-xs
            "
          >
            {label}
          </p>

          {/* HEADLINE */}
          <h2
            className="
              mx-auto
              mb-2
              max-w-xl
              text-xl
              font-bold
              leading-tight
              text-white
              sm:text-2xl
              lg:text-[25px]
            "
          >
            {headline}
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mx-auto
              max-w-2xl
              text-center
              text-sm
              font-semibold
              leading-relaxed
              text-slate-300
              sm:text-[13px]
              lg:text-sm
            "
          >
            {paragraph}
          </p>
        </div>

        {/* =========================
            CTA BUTTON
        ========================== */}
        <div className="shrink-0">
          <Link
            href={btnLink}
            className="
              inline-flex
              items-center
              gap-2
              whitespace-nowrap
              rounded-lg
              bg-gradient-to-r
              from-amber-400
              to-amber-600
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-900
              shadow-lg
              shadow-amber-900/30
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-amber-700/40
            "
          >
            {btnText}

            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* =========================
          RIGHT SIDE IMAGE
      ========================== */}
      {image && (
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            hidden
            w-[36%]
            xl:block
          "
        >
          <div className="relative h-full w-full">
            {/* IMAGE */}
            <Image
              src={image}
              alt=""
              fill
              priority
              className="object-cover"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 28%, black 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 28%, black 100%)",
              }}
            />

            {/* DARK GRADIENT OVER IMAGE */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#0B1220]
                via-[#0B1220]/30
                to-transparent
              "
            />
          </div>
        </div>
      )}
    </div>
  );
}
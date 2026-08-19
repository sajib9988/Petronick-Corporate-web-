"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { fadeSlide } from "@/lib/motion";

type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string | null;
  revenueStage: string | null;
  order: number;
  isVisible: boolean;
};

const stageColors: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Launching: "bg-blue-50 text-blue-700 border border-blue-200",
  "Pre-launch": "bg-amber-50 text-amber-700 border border-amber-200",
  "Re-launching": "bg-purple-50 text-purple-700 border border-purple-200",
  growth: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

interface CompanyCardProps {
  company: Company;
  index?: number;
}

export default function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  const direction = index % 2 === 0 ? "left" : "right";

  return (
    <motion.div
      variants={fadeSlide(direction, index * 0.08, 90, 0.65)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
      className="group relative h-full"
    >
      {/* Back Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-[2px]
          -z-10
          rounded-[22px]
          opacity-0
          transition-all
          duration-400
          group-hover:opacity-100
          bg-gradient-to-r
          from-[#F97316]
          via-[#FB923C]
          to-[#FBBF24]
          blur-lg
          group-hover:blur-xl
        "
      />

      {/* Card */}
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300
          ${
            company.isVisible
              ? "border-gray-200 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,.4),0_0_40px_rgba(251,146,60,.25)]"
              : "border-gray-200 opacity-50 grayscale"
          }`}
      >
        {/* Top Row: Logo + Badges */}
        <div className="flex items-start justify-between gap-3">
          {/* ✅ Logo: Bigger container + image fills it */}
          <div className="flex h-30 w-30 shrink-0 items-center justify-center overflow-hidden rounded-xl  ring-1 ">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-full w-full object-contain p-1.5"
              />
            ) : (
              <span className="text-base font-bold text-gray-400">
                {company.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {company.revenueStage && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
                  stageColors[company.revenueStage] ??
                  "border border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                {company.revenueStage}
              </span>
            )}

            <div className="rounded-full border border-gray-100 bg-white p-1 shadow-sm">
              {company.isVisible ? (
                <Eye size={12} className="text-emerald-500" />
              ) : (
                <EyeOff size={12} className="text-gray-300" />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="text-base font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
            {company.name}
          </h3>

          {/* ✅ Fixed height for description so all cards align */}
          <p className="mt-2 text-[13px] leading-relaxed text-gray-500 line-clamp-2 min-h-[38px]">
            {company.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <Link
            href={`/companies/${company.id}`}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-gray-700 transition-all hover:text-orange-600"
          >
            View Details
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[13px] text-gray-500 transition-colors hover:text-orange-600"
            >
              Website
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
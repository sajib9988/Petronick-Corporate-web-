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
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
      className="group relative"
    >
      {/* 🔥 Back Glow - Orange + Amber */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-[3px]
          -z-10
          rounded-[26px]
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
          bg-gradient-to-r
          from-[#F97316]
          via-[#FB923C]
          to-[#FBBF24]
          blur-xl
          group-hover:blur-2xl
        "
      />

      {/* Card */}
      <div
        className={`relative flex flex-col overflow-hidden rounded-3xl border bg-gray-50 p-7 transition-all duration-300
          ${
            company.isVisible
              ? "border-gray-200 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,.45),0_0_50px_rgba(251,146,60,.30)]"
              : "border-gray-200 opacity-50 grayscale"
          }`}
      >
        {/* Top */}
        <div className="relative flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span className="text-lg font-bold text-gray-400">
                {company.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {company.revenueStage && (
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
                  stageColors[company.revenueStage] ??
                  "border border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                {company.revenueStage}
              </span>
            )}

            <div className="rounded-full border border-gray-100 bg-white p-1.5 shadow-sm">
              {company.isVisible ? (
                <Eye size={14} className="text-emerald-500" />
              ) : (
                <EyeOff size={14} className="text-gray-300" />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative mt-7 flex-1">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
            {company.name}
          </h3>

          <p className="mt-3 min-h-[52px] text-sm leading-relaxed text-gray-500 line-clamp-2">
            {company.description}
          </p>
        </div>

        {/* Footer */}
        <div className="relative mt-8 flex items-center justify-between border-t border-gray-200 pt-5">
          <Link
            href={`/companies/${company.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-all hover:text-orange-600"
          >
            View Details
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange-600"
            >
              Website
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
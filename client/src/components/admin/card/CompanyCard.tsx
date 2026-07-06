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
  Active:
    "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",

  Launching:
    "bg-blue-500/10 text-blue-300 border border-blue-500/20",

  "Pre-launch":
    "bg-amber-500/10 text-amber-300 border border-amber-500/20",

  "Re-launching":
    "bg-purple-500/10 text-purple-300 border border-purple-500/20",

  growth:
    "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
};

interface CompanyCardProps {
  company: Company;
  index?: number;
}

export default function CompanyCard({
  company,
  index = 0,
}: CompanyCardProps) {
  const direction = index % 2 === 0 ? "left" : "right";

  return (
    <motion.div
      variants={fadeSlide(direction, index * 0.08, 90, 0.65)}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: {
          duration: 0.25,
        },
      }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border
      bg-gradient-to-br from-zinc-900 via-zinc-900 to-black
      p-7 transition-all duration-300
      ${
        company.isVisible
          ? "border-zinc-800 hover:border-zinc-700 hover:shadow-[0_25px_60px_rgba(0,0,0,.45)]"
          : "border-zinc-800 opacity-50 grayscale"
      }`}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Top */}
      <div className="relative flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800/60 shadow-sm">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-lg font-bold text-zinc-400">
              {company.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {company.revenueStage && (
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
                stageColors[company.revenueStage] ??
                "border border-zinc-700 bg-zinc-800 text-zinc-300"
              }`}
            >
              {company.revenueStage}
            </span>
          )}

          <div className="rounded-full border border-zinc-800 bg-zinc-900 p-1.5">
            {company.isVisible ? (
              <Eye size={14} className="text-emerald-400" />
            ) : (
              <EyeOff size={14} className="text-zinc-600" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative mt-7 flex-1">
        <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-300">
          {company.name}
        </h3>

        <p className="mt-3 min-h-[52px] text-sm leading-relaxed text-zinc-400 line-clamp-2">
          {company.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative mt-8 flex items-center justify-between border-t border-zinc-800 pt-5">
        <Link
          href={`/companies/${company.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-all hover:text-white"
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
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-emerald-300"
          >
            Website

            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
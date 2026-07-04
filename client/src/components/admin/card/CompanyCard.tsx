"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

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
  Active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Launching: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Pre-launch": "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "Re-launching": "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  "growth": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", // আপনার ইমেজে গ্রোথ ছিল তাই এড করলাম
};

interface CompanyCardProps {
  company: Company;
  index?: number;
}

export default function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`group flex flex-col rounded-3xl border border-zinc-800/50
        bg-gradient-to-b from-zinc-900/50 to-black
        p-7 transition-all duration-300
        hover:border-zinc-700/50
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
        backdrop-blur-sm
        ${!company.isVisible ? "opacity-50 grayscale" : "opacity-100"}`}
    >
      {/* Top row — logo + visibility */}
      <div className="flex items-start justify-between">
        <div className="relative group-hover:scale-105 transition-transform duration-300">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-inner overflow-hidden">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-full w-full object-contain p-2.5"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold text-lg bg-zinc-900">
                {company.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {company.revenueStage && (
            <span
              className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                stageColors[company.revenueStage] ?? "bg-zinc-800 text-zinc-400 border border-zinc-700"
              }`}
            >
              {company.revenueStage}
            </span>
          )}
          <div className="p-1.5 rounded-full bg-zinc-900/50 border border-zinc-800">
            {company.isVisible ? (
              <Eye size={14} className="text-emerald-500/80" />
            ) : (
              <EyeOff size={14} className="text-zinc-600" />
            )}
          </div>
        </div>
      </div>

      {/* Title & Description Section */}
      <div className="flex-1 mt-8"> {/* এখানে mt-6 থেকে বাড়িয়ে mt-8 করা হয়েছে */}
        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
          {company.name}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-zinc-400 line-clamp-2 min-h-[44px]">
          {company.description}
        </p>
      </div>

      {/* Footer — links */}
      <div className="mt-8 pt-5 border-t border-zinc-800/60 flex items-center justify-between">
        <Link
          href={`/companies/${company.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-all group/link"
        >
          View Details 
          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
        </Link>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            Website <ExternalLink size={13} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
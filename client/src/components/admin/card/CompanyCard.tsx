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
      whileHover={{ y: -5, transition: { duration: 0.2 } }}

     className={`group flex flex-col rounded-2xl border border-zinc-800
bg-gradient-to-b from-zinc-900 to-[#171717]
p-6 transition-all duration-300
hover:-translate-y-1
hover:border-zinc-700
hover:shadow-[0_20px_60px_rgba(0,0,0,.35)]
${
  !company.isVisible && "opacity-60"
}`}
    >
      {/* Top row — logo + visibility */}
      <div className="flex items-center justify-between">
       <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800/60 shadow-sm">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
             className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold text-sm bg-zinc-800">
              {company.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {company.revenueStage && (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                stageColors[company.revenueStage] ?? "bg-zinc-800 text-zinc-400"
              }`}
            >
              {company.revenueStage}
            </span>
          )}
          {company.isVisible ? (
            <Eye size={14} className="text-emerald-500/80" />
          ) : (
            <EyeOff size={14} className="text-zinc-600" />
          )}
        </div>
      </div>

      
      <div className="flex-1 mt-6">
        <h3 className="
text-xl
font-semibold
tracking-tight
text-white
leading-none
">
          {company.name}
        </h3>
        <p className="
mt-2
text-sm
leading-6
text-zinc-300
line-clamp-2
min-h-[48px]
">
          {company.description}
        </p>
      </div>

      {/* Footer — links */}
      <div className="pt-3 border-t border-zinc-800/50 flex items-center justify-between">
        <Link
          href={`/companies/${company.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          View Details <ArrowRight size={10} />
        </Link>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Website <ExternalLink size={10} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
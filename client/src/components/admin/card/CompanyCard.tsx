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

// স্টেজ কালারগুলো ডার্ক ব্যাকগ্রাউন্ডে ফুটে ওঠার জন্য কিছুটা উজ্জ্বল করা হয়েছে
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
      // কার্ডের ব্যাকগ্রাউন্ড Dark Grey (#18181b) করা হয়েছে
      className={`group bg-[#18181b] border rounded-xl p-5 flex flex-col gap-3 transition-all hover:shadow-2xl hover:shadow-black/20 ${
        company.isVisible
          ? "border-zinc-800 hover:border-zinc-700"
          : "border-dashed border-zinc-800 opacity-50"
      }`}
    >
      {/* Top row — logo + visibility */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain p-1.5"
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

      {/* Name + description - সাদা ও ধূসর টেক্সট ব্যবহার করা হয়েছে */}
      <div className="flex-1">
        <h3 className="font-semibold text-zinc-100 text-sm mb-1 group-hover:text-white transition-colors">
          {company.name}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
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
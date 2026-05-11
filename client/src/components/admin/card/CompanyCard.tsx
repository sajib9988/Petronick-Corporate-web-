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
  Active: "bg-emerald-50 text-emerald-700",
  Launching: "bg-blue-50 text-blue-700",
  "Pre-launch": "bg-amber-50 text-amber-700",
  "Re-launching": "bg-purple-50 text-purple-700",
};

interface CompanyCardProps {
  company: Company;
  index?: number;
}

export default function CompanyCard({ company, index = 0 }: CompanyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group bg-white border rounded-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-sm ${
        company.isVisible
          ? "border-gray-100 hover:border-gray-200"
          : "border-dashed border-gray-200 opacity-60"
      }`}
    >
      {/* Top row — logo + visibility */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-lg border border-gray-100 bg-gray-50 overflow-hidden flex-shrink-0">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-sm">
              {company.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {company.revenueStage && (
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                stageColors[company.revenueStage] ?? "bg-gray-50 text-gray-600"
              }`}
            >
              {company.revenueStage}
            </span>
          )}
          {company.isVisible ? (
            <Eye size={12} className="text-emerald-400" />
          ) : (
            <EyeOff size={12} className="text-gray-300" />
          )}
        </div>
      </div>

      {/* Name + description */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">
          {company.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {company.description}
        </p>
      </div>

      {/* Footer — link */}
   {/* Footer — link */}
<div className="pt-1 border-t border-gray-50">
  {company.website ? (
    <a
      href={company.website}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
    >
      Visit Website <ExternalLink size={10} />
    </a>
  ) : (
    <Link
      href="/companies"
      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors"
    >
      Learn more <ArrowRight size={10} />
    </Link>
  )}
</div>
    </motion.div>
  );
}
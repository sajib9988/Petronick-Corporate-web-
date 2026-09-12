"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Globe,
  Gift,
  RefreshCcw,
  Package,
  ShieldCheck,
  Armchair,
  Shield,
  BarChart3,
  Flag,
  Building2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { fadeSlide } from "@/lib/motion";

type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
  icon: string | null;
  website: string | null;
  category: string | null;
  order: number;
  isVisible: boolean;
};

// Mirrors the keyword → icon/color mapping in EcosystemFlow.tsx so a
// company's fallback badge (no uploaded icon) stays consistent site-wide.
const CATEGORY_ICON_RULES: {
  keywords: string[];
  icon: LucideIcon;
  text: string;
  bg: string;
}[] = [
  { keywords: ["digital"], icon: Globe, text: "text-blue-600", bg: "bg-blue-50" },
  { keywords: ["gift"], icon: Gift, text: "text-pink-600", bg: "bg-pink-50" },
  { keywords: ["distribut"], icon: RefreshCcw, text: "text-sky-600", bg: "bg-sky-50" },
  { keywords: ["fulfillment"], icon: Package, text: "text-violet-600", bg: "bg-violet-50" },
  { keywords: ["sanitation", "clean"], icon: ShieldCheck, text: "text-emerald-600", bg: "bg-emerald-50" },
  { keywords: ["furniture"], icon: Armchair, text: "text-amber-800", bg: "bg-amber-50" },
  { keywords: ["insurance", "title"], icon: Shield, text: "text-slate-700", bg: "bg-slate-100" },
  { keywords: ["advisory", "consult"], icon: BarChart3, text: "text-orange-600", bg: "bg-orange-50" },
  { keywords: ["growth"], icon: Flag, text: "text-red-600", bg: "bg-red-50" },
];

const FALLBACK_ICON_POOL: { icon: LucideIcon; text: string; bg: string }[] = [
  { icon: Building2, text: "text-blue-600", bg: "bg-blue-50" },
  { icon: Sparkles, text: "text-amber-600", bg: "bg-amber-50" },
  { icon: Globe, text: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Package, text: "text-violet-600", bg: "bg-violet-50" },
];

function getCategoryMeta(category: string | null | undefined, index: number) {
  const normalized = (category ?? "").toLowerCase();
  const matched = CATEGORY_ICON_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  );
  if (matched) return matched;
  return FALLBACK_ICON_POOL[index % FALLBACK_ICON_POOL.length];
}

interface CompanyCardProps {
  company: Company;
  index?: number;
}

export default function CompanyCard({
  company,
  index = 0,
}: CompanyCardProps) {
  const direction = index % 2 === 0 ? "left" : "right";
  const meta = getCategoryMeta(company.category, index);
  const FallbackIcon = meta.icon;

  return (
    <motion.div
      variants={fadeSlide(direction, index * 0.08, 90, 0.65)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
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
        className={`
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          bg-white
          p-5
          transition-all
          duration-300

          ${
            company.isVisible
              ? "border-gray-200 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,.4),0_0_40px_rgba(251,146,60,.25)]"
              : "border-gray-200 opacity-50 grayscale"
          }
        `}
      >
        {/* ================================
            HEADER
            Number badge + Icon + Name+Category
        ================================= */}
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div
              className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-full ${
                company.logo || company.icon ? "border border-gray-100 bg-white" : meta.bg
              }`}
            >
              {company.logo || company.icon ? (
                <img
                  src={company.logo || company.icon || ""}
                  alt={company.name}
                  className="h-7 w-7 object-contain"
                />
              ) : (
                <FallbackIcon size={20} className={meta.text} />
              )}
            </div>
            <span
              className="
                absolute
                -top-2
                -left-2
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-gray-900
                text-[10px]
                font-bold
                text-white
                ring-2
                ring-white
              "
            >
              {index + 1}
            </span>
          </div>

          <div className="min-w-0 pt-1">
            <h3
              className="
                truncate
                text-[15px]
                font-bold
                tracking-tight
                text-gray-900
                transition-colors
                duration-300
                group-hover:text-orange-600
              "
            >
              {company.name}
            </h3>

            {company.category && (
              <p className={`text-xs font-semibold ${meta.text}`}>
                {company.category}
              </p>
            )}
          </div>
        </div>

        {/* ================================
            DESCRIPTION
        ================================= */}

        <p
          className="
            mt-3
            line-clamp-3
            text-[13px]
            leading-relaxed
            text-gray-500
          "
        >
          {company.description}
        </p>

        {/* ================================
            FOOTER
        ================================= */}

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={`/companies/${company.id}`}
            className="
              flex-1
              inline-flex
              items-center
              justify-center
              rounded-lg
              bg-gray-900
              px-3
              py-2
              text-[13px]
              font-semibold
              text-white
              transition-colors
              hover:bg-orange-600
            "
          >
            View Details
          </Link>

          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1
                inline-flex
                items-center
                justify-center
                gap-1
                rounded-lg
                border
                border-gray-200
                px-3
                py-2
                text-[13px]
                font-semibold
                text-gray-700
                transition-colors
                hover:border-orange-300
                hover:text-orange-600
              "
            >
              Website
              <ExternalLink size={12} />
            </a>
          ) : (
            <span
              className="
                flex-1
                inline-flex
                items-center
                justify-center
                rounded-lg
                border
                border-gray-100
                px-3
                py-2
                text-[13px]
                font-medium
                text-gray-300
              "
            >
              Website
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

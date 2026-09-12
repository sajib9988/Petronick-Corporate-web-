
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

const CATEGORY_ICON_RULES: {
  keywords: string[];
  icon: LucideIcon;
  text: string;
  bg: string;
}[] = [
  {
    keywords: ["digital"],
    icon: Globe,
    text: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    keywords: ["gift"],
    icon: Gift,
    text: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    keywords: ["distribut"],
    icon: RefreshCcw,
    text: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    keywords: ["fulfillment"],
    icon: Package,
    text: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    keywords: ["sanitation", "clean"],
    icon: ShieldCheck,
    text: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    keywords: ["furniture"],
    icon: Armchair,
    text: "text-amber-800",
    bg: "bg-amber-50",
  },
  {
    keywords: ["insurance", "title"],
    icon: Shield,
    text: "text-slate-700",
    bg: "bg-slate-100",
  },
  {
    keywords: ["advisory", "consult"],
    icon: BarChart3,
    text: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    keywords: ["growth"],
    icon: Flag,
    text: "text-red-600",
    bg: "bg-red-50",
  },
];

const FALLBACK_ICON_POOL: {
  icon: LucideIcon;
  text: string;
  bg: string;
}[] = [
  {
    icon: Building2,
    text: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Sparkles,
    text: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Globe,
    text: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Package,
    text: "text-violet-600",
    bg: "bg-violet-50",
  },
];

function getCategoryMeta(
  category: string | null | undefined,
  index: number,
) {
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
      viewport={{
        once: true,
        amount: 0.25,
      }}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.2,
        },
      }}
      className="group relative h-full"
    >
      {/* =================================
          BACK GLOW
      ================================== */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-[2px]
          -z-10
          rounded-[22px]
          bg-gradient-to-r
          from-[#F97316]
          via-[#FB923C]
          to-[#FBBF24]
          opacity-0
          blur-lg
          transition-all
          duration-300
          group-hover:opacity-100
          group-hover:blur-xl
        "
      />

      {/* =================================
          CARD
      ================================== */}
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
              ? "border-gray-200 hover:border-orange-300 hover:shadow-lg"
              : "border-gray-200 opacity-50 grayscale"
          }
        `}
      >
        {/* =================================
            NUMBER BADGE
        ================================== */}
        <div className="mb-4">
          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-[#0F2747]
              text-sm
              font-bold
              text-white
              shadow-sm
            "
          >
            {index + 1}
          </span>
        </div>

        {/* =================================
            LOGO + COMPANY INFO
        ================================== */}
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              overflow-hidden
            "
          >
            {company.logo || company.icon ? (
              <img
                src={company.logo || company.icon || ""}
                alt={company.name}
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            ) : (
              <FallbackIcon
                size={42}
                className={meta.text}
              />
            )}
          </div>

          {/* Company Name + Category */}
          <div className="mt-3 min-w-0 w-full">
            <h3
              className="
                truncate
                text-[16px]
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
              <p
                className={`
                  mt-1
                  text-xs
                  font-semibold
                  ${meta.text}
                `}
              >
                {company.category}
              </p>
            )}
          </div>
        </div>

        {/* =================================
            DESCRIPTION
        ================================== */}
        <p
          className="
            mt-4
            line-clamp-3
            text-center
            text-[13px]
            leading-6
            text-gray-500
          "
        >
          {company.description}
        </p>

        {/* =================================
            FOOTER
        ================================== */}
        <div className="mt-auto flex items-center gap-2 pt-5">
          {/* View Details */}
          <Link
            href={`/companies/${company.id}`}
            className="
              inline-flex
              flex-1
              items-center
              justify-center
              rounded-lg
              bg-[#0F2747]
              px-3
              py-2.5
              text-[13px]
              font-semibold
              text-white
              transition-colors
              hover:bg-orange-600
            "
          >
            View Details
          </Link>

          {/* Website */}
          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                gap-1
                rounded-lg
                border
                border-gray-200
                px-3
                py-2.5
                text-[13px]
                font-semibold
                text-gray-700
                transition-all
                hover:border-orange-300
                hover:text-orange-600
              "
            >
              Website
              <ExternalLink size={13} />
            </a>
          ) : (
            <span
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                rounded-lg
                border
                border-gray-100
                px-3
                py-2.5
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

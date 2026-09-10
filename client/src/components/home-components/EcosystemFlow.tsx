"use client";

import { useMemo } from "react";
import {
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
  LucideIcon,
} from "lucide-react";

type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
  icon: string | null;
  website: string | null;
  revenueStage: string | null;
  order: number;
  isVisible: boolean;
};

/* -------------------------------------------------------------------------- */
/* FALLBACK ICON RESOLUTION (used only when company.icon is NOT uploaded)     */
/* -------------------------------------------------------------------------- */

const CATEGORY_ICON_RULES: { keywords: string[]; icon: LucideIcon; color: string }[] = [
  { keywords: ["digital"], icon: Globe, color: "text-blue-600" },
  { keywords: ["gift"], icon: Gift, color: "text-pink-600" },
  { keywords: ["distribut"], icon: RefreshCcw, color: "text-sky-600" },
  { keywords: ["fulfillment"], icon: Package, color: "text-violet-600" },
  { keywords: ["sanitation", "clean"], icon: ShieldCheck, color: "text-emerald-600" },
  { keywords: ["furniture"], icon: Armchair, color: "text-amber-800" },
  { keywords: ["insurance", "title"], icon: Shield, color: "text-slate-700" },
  { keywords: ["advisory", "consult"], icon: BarChart3, color: "text-orange-600" },
  { keywords: ["growth"], icon: Flag, color: "text-red-600" },
];

const FALLBACK_ICON_POOL: { icon: LucideIcon; color: string }[] = [
  { icon: Building2, color: "text-blue-600" },
  { icon: Sparkles, color: "text-amber-600" },
  { icon: Globe, color: "text-emerald-600" },
  { icon: Package, color: "text-violet-600" },
];

function getFallbackIconMeta(category: string | null | undefined, index: number) {
  const normalized = (category ?? "").toLowerCase();
  const matched = CATEGORY_ICON_RULES.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  );
  if (matched) return matched;
  return FALLBACK_ICON_POOL[index % FALLBACK_ICON_POOL.length];
}

const NAME_COLOR_POOL = [
  "text-blue-700",
  "text-pink-600",
  "text-emerald-700",
  "text-orange-600",
  "text-amber-700",
  "text-teal-700",
  "text-rose-600",
  "text-violet-700",
];

/* -------------------------------------------------------------------------- */
/* COMPANY ICON                                                               */
/* -------------------------------------------------------------------------- */

function CompanyIcon({
  company,
  fallbackIcon,
  fallbackColor,
  size,
}: {
  company: Company;
  fallbackIcon: LucideIcon;
  fallbackColor: string;
  size: number;
}) {
  // Uploaded icon always wins — this is the real, exact-match icon.
  if (company.icon) {
    return (
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white"
        style={{ width: size, height: size }}
      >
        <img
          src={company.icon}
          alt={`${company.name} icon`}
          className="h-full w-full object-contain p-1"
        />
      </div>
    );
  }

  // No custom icon uploaded yet — plain category-matched icon.
  const Icon = fallbackIcon;
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-lg bg-slate-50"
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.55)} className={fallbackColor} strokeWidth={2} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LAYOUT                                                                     */
/* -------------------------------------------------------------------------- */
/*
 | Companies are arranged around a central hub in reading order:
 |
 |            1
 |     10           2
 |      9           3
 |      8           4
 |      7           5
 |            6
 |
 |  1  = top          6      = bottom
 |  2..= right column (top → bottom)
 |  ..10 = left column (bottom → top)
*/

type Slot = "top" | "right" | "bottom" | "left";

// Vertical band the side columns spread across (percent of the box height).
const BAND_TOP = 15;
const BAND_BOTTOM = 85;

function bandPosition(i: number, count: number) {
  if (count <= 1) return 50;
  return BAND_TOP + ((BAND_BOTTOM - BAND_TOP) * i) / (count - 1);
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function EcosystemFlow({
  companies,
}: {
  companies: Company[];
}) {
  const total = companies.length;

  const nodes = useMemo(() => {
    const rest = Math.max(0, total - 2);
    const rightCount = Math.ceil(rest / 2);
    const leftCount = rest - rightCount;

    return companies.map((company, index) => {
      let slot: Slot = "top";
      let left = 50;
      let top = 50;
      let cardTransform = "translate(-50%, -50%)";
      // where the connector line ends (arrow tip sits just before the card)
      let lineX = 50;
      let lineY = 50;

      if (index === 0) {
        slot = "top";
        left = 50;
        top = 3;
        cardTransform = "translate(-50%, 0%)";
        lineX = 50;
        lineY = 17;
      } else if (index <= rightCount) {
        slot = "right";
        const i = index - 1; // 0-based, top → bottom
        left = 98;
        top = bandPosition(i, rightCount);
        cardTransform = "translate(-100%, -50%)";
        lineX = 64;
        lineY = top;
      } else if (index === rightCount + 1) {
        slot = "bottom";
        left = 50;
        top = 97;
        cardTransform = "translate(-50%, -100%)";
        lineX = 50;
        lineY = 83;
      } else {
        slot = "left";
        const i = index - (rightCount + 2); // 0-based within the left column
        left = 2;
        // numbering runs bottom → top on the left side
        top =
          leftCount <= 1
            ? 50
            : BAND_BOTTOM - ((BAND_BOTTOM - BAND_TOP) * i) / (leftCount - 1);
        cardTransform = "translate(0%, -50%)";
        lineX = 36;
        lineY = top;
      }

      const meta = getFallbackIconMeta(company.revenueStage, index);

      return {
        company,
        index,
        slot,
        left,
        top,
        cardTransform,
        lineX,
        lineY,
        fallbackIcon: meta.icon,
        fallbackColor: meta.color,
        nameColor: NAME_COLOR_POOL[index % NAME_COLOR_POOL.length],
      };
    });
  }, [companies, total]);

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP DIAGRAM                                                    */}
      {/* ================================================================== */}

      <div className="relative hidden h-[520px] w-full overflow-visible lg:block xl:h-[560px] 2xl:h-[600px]">
        {/* Connector lines + amber arrowheads */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="ecoArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#f59e0b" />
            </marker>
          </defs>

          {nodes.map((node) => (
            <line
              key={`line-${node.company.id}`}
              x1="50%"
              y1="50%"
              x2={`${node.lineX}%`}
              y2={`${node.lineY}%`}
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.6"
              markerEnd="url(#ecoArrow)"
            />
          ))}

          {/* origin dot */}
          <circle cx="50%" cy="50%" r="4" fill="#f59e0b" />
        </svg>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 z-20 h-36 w-36 -translate-x-1/2 -translate-y-1/2 xl:h-40 xl:w-40">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-950 px-4 text-center text-white shadow-xl shadow-slate-900/25 ring-1 ring-amber-500/40">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 font-serif text-base font-bold text-slate-950 xl:h-9 xl:w-9">
              P
            </div>
            <div className="max-w-[130px] text-[9px] font-bold uppercase leading-tight tracking-wide xl:text-[10px]">
              Petronick Corporate Holdings LLC
            </div>
          </div>
        </div>

        {/* Company cards */}
        {nodes.map((node) => {
          const content = (
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md xl:gap-3 xl:p-3">
              <CompanyIcon
                company={node.company}
                fallbackIcon={node.fallbackIcon}
                fallbackColor={node.fallbackColor}
                size={38}
              />
              <div className="min-w-0 flex-1">
                <div
                  className={`text-[13px] font-bold leading-tight ${node.nameColor} xl:text-sm`}
                  title={node.company.name}
                >
                  {node.index + 1}. {node.company.name}
                </div>
                <div className="mt-0.5 text-[10px] leading-tight text-slate-400 xl:text-[11px]">
                  {node.company.revenueStage || "Business Unit"}
                </div>
              </div>
            </div>
          );

          const style = {
            left: `${node.left}%`,
            top: `${node.top}%`,
            transform: node.cardTransform,
          };

          if (node.company.website) {
            return (
              <a
                key={node.company.id}
                href={node.company.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${node.company.name}`}
                className="absolute z-30 block w-[190px] cursor-pointer xl:w-[220px] 2xl:w-[240px]"
                style={style}
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={node.company.id}
              className="absolute z-30 w-[190px] xl:w-[220px] 2xl:w-[240px]"
              style={style}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* MOBILE / TABLET                                                    */}
      {/* ================================================================== */}

      <div className="lg:hidden">
        <div className="mx-auto mb-5 flex w-fit max-w-full flex-col items-center rounded-2xl bg-slate-950 px-6 py-4 text-center text-white shadow-lg ring-1 ring-amber-500/40">
          <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 font-serif text-base font-bold text-slate-950">
            P
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wide">
            Petronick Corporate Holdings LLC
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          {nodes.map((node) => {
            const content = (
              <>
                <CompanyIcon
                  company={node.company}
                  fallbackIcon={node.fallbackIcon}
                  fallbackColor={node.fallbackColor}
                  size={40}
                />
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-bold leading-tight ${node.nameColor}`}>
                    {node.index + 1}. {node.company.name}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {node.company.revenueStage || "Business Unit"}
                  </div>
                </div>
                <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500 ring-2 ring-amber-100" />
              </>
            );

            if (node.company.website) {
              return (
                <a
                  key={node.company.id}
                  href={node.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${node.company.name}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={node.company.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

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
/* COMPANY NAME FONT SIZE                                                     */
/* -------------------------------------------------------------------------- */

function getCompanyNameFontSize(name: string) {
  const length = name.trim().length;

  if (length <= 15) return "12px";
  if (length <= 19) return "11.5px";
  if (length <= 24) return "10.5px";
  if (length <= 29) return "10px";
  return "9.5px";
}

/* -------------------------------------------------------------------------- */
/* CARD POSITION                                                              */
/* -------------------------------------------------------------------------- */

function getCardTransform(left: number, top: number) {
  let translateX = "-50%";
  let translateY = "-50%";

  if (left > 58) translateX = "-100%";
  if (left < 42) translateX = "0%";
  if (top > 67) translateY = "-100%";
  if (top < 33) translateY = "0%";

  return `translate(${translateX}, ${translateY})`;
}

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

  // No custom icon uploaded yet — plain category-matched icon, no box.
  const Icon = fallbackIcon;
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.58)} className={fallbackColor} strokeWidth={2} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function EcosystemFlow({
  companies,
}: {
  companies: Company[];
}) {
  const total = companies.length || 1;

  // More companies = more breathing room needed, otherwise cards overlap.
  const RADIUS_X = total <= 6 ? 40 : total <= 8 ? 44 : 48;
  const RADIUS_Y = total <= 6 ? 39 : total <= 8 ? 43 : 46;
  const CARD_WIDTH = total <= 8 ? 188 : 166;
  const CENTER_RADIUS_PERCENT = 14;
  const LINE_END_DISTANCE = 0.91;

  const desktopHeightClass =
    total > 8
      ? "h-[620px] xl:h-[650px] 2xl:h-[680px]"
      : "h-[560px] xl:h-[580px] 2xl:h-[610px]";

  const nodes = useMemo(() => {
    return companies.map((company, index) => {
      const angle = (index * 2 * Math.PI) / total - Math.PI / 2;

      const left = 50 + RADIUS_X * Math.cos(angle);
      const top = 50 + RADIUS_Y * Math.sin(angle);

      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      const lineEndX = 50 + (left - 50) * LINE_END_DISTANCE;
      const lineEndY = 50 + (top - 50) * LINE_END_DISTANCE;

      const lineStartX = 50 + dx * CENTER_RADIUS_PERCENT;
      const lineStartY = 50 + dy * CENTER_RADIUS_PERCENT;

      const fallbackMeta = getFallbackIconMeta(company.revenueStage, index);

      return {
        company,
        index,
        left,
        top,
        lineStartX,
        lineStartY,
        lineEndX,
        lineEndY,
        cardTransform: getCardTransform(left, top),
        fallbackIcon: fallbackMeta.icon,
        fallbackColor: fallbackMeta.color,
        nameColor: NAME_COLOR_POOL[index % NAME_COLOR_POOL.length],
        nameFontSize: getCompanyNameFontSize(company.name),
      };
    });
  }, [companies, total, RADIUS_X, RADIUS_Y]);

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP RADIAL ECOSYSTEM                                           */}
      {/* ================================================================== */}

      <div className={`relative hidden w-full overflow-visible xl:block ${desktopHeightClass}`}>
        {/* Connection lines */}
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {nodes.map((node) => (
            <g key={`connection-${node.company.id}`}>
              <line
                x1={node.lineStartX}
                y1={node.lineStartY}
                x2={node.lineEndX}
                y2={node.lineEndY}
                stroke="#f59e0b"
                strokeWidth="0.26"
                strokeLinecap="round"
                strokeOpacity="0.7"
                strokeDasharray="1.4 1.8"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={node.lineEndX} cy={node.lineEndY} r="0.85" fill="#f59e0b" />
            </g>
          ))}

          <circle cx="50" cy="50" r="1.5" fill="#f59e0b" />
        </svg>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 z-20 h-36 w-36 -translate-x-1/2 -translate-y-1/2 xl:h-40 xl:w-40">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-950 px-4 text-center text-white shadow-xl shadow-slate-900/25 ring-1 ring-amber-500/40">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 font-serif text-base font-bold text-slate-950">
              P
            </div>
            <div className="max-w-[130px] text-[8px] font-bold uppercase leading-tight tracking-wide xl:text-[9px]">
              Petronick Corporate Holdings LLC
            </div>
          </div>
        </div>

        {/* Company cards */}
        {nodes.map((node) => {
          const content = (
            <div className="flex h-[58px] w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md xl:h-[60px] xl:px-3">
              <CompanyIcon
                company={node.company}
                fallbackIcon={node.fallbackIcon}
                fallbackColor={node.fallbackColor}
                size={36}
              />

              <div className="min-w-0 flex-1 overflow-hidden">
                <div
                  className={`whitespace-nowrap font-bold leading-none tracking-[-0.015em] ${node.nameColor}`}
                  style={{ fontSize: node.nameFontSize }}
                  title={node.company.name}
                >
                  {node.index + 1}. {node.company.name}
                </div>

                <div className="mt-1.5 whitespace-nowrap text-[9px] leading-none text-slate-400 xl:text-[10px]">
                  {node.company.revenueStage || "Business Unit"}
                </div>
              </div>
            </div>
          );

          const style = {
            left: `${node.left}%`,
            top: `${node.top}%`,
            transform: node.cardTransform,
            width: CARD_WIDTH,
          };

          if (node.company.website) {
            return (
              <a
                key={node.company.id}
                href={node.company.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${node.company.name}`}
                className="absolute z-30 block cursor-pointer"
                style={style}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={node.company.id} className="absolute z-30" style={style}>
              {content}
            </div>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* MOBILE / TABLET                                                    */}
      {/* ================================================================== */}

      <div className="xl:hidden">
        <div className="mx-auto mb-5 flex w-fit max-w-full flex-col items-center rounded-2xl bg-slate-950 px-6 py-4 text-center text-white shadow-lg ring-1 ring-amber-500/40">
          <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 font-serif text-base font-bold text-slate-950">
            P
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wide">
            Petronick Corporate Holdings LLC
          </div>
        </div>

        <div className="space-y-2.5">
          {nodes.map((node) => {
            const content = (
              <>
                <CompanyIcon
                  company={node.company}
                  fallbackIcon={node.fallbackIcon}
                  fallbackColor={node.fallbackColor}
                  size={40}
                />

                <div className="min-w-0 flex-1 overflow-hidden">
                  <div
                    className={`whitespace-nowrap font-bold leading-tight ${node.nameColor}`}
                    style={{ fontSize: node.nameFontSize }}
                  >
                    {node.index + 1}. {node.company.name}
                  </div>

                  <div className="mt-1 whitespace-nowrap text-[10px] text-slate-400">
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
                  className="flex items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={node.company.id}
                className="flex items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
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
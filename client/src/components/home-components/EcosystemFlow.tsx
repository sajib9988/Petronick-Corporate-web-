"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
/*
 | Layout — reading order around a central hub:
 |
 |            1
 |    10             2
 |     9             3
 |     8             4
 |     7             5
 |            6
 |
 |  1  = top-center            6      = bottom-center
 |  2..5  = right column (top → bottom)
 |  7..10 = left column  (bottom → top)
 |
 | Both side columns share the same vertical band, so left and right
 | are always the exact same height. Each card is joined to the hub by
 | a golden line with an amber arrowhead that lands on the card's inner edge.
*/

export default function EcosystemFlow({
  companies,
}: {
  companies: Company[];
}) {
  const total = companies.length;

  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 960, h: 560 });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { nodes, cx, cy } = useMemo(() => {
    const cX = box.w / 2;
    const cY = box.h / 2;

    const CARD_W =
      box.w < 620 ? 178 : box.w < 820 ? 202 : box.w < 1000 ? 222 : 242;
    const CARD_H = 66; // fixed → every row lines up left ↔ right
    const SIDE_MARGIN = 4;
    const EDGE_MARGIN = 6;

    // one band shared by both side columns → identical left/right heights
    const bandTop = box.h * 0.18;
    const bandBottom = box.h * 0.82;

    const rest = Math.max(0, total - 2);
    const rightCount = Math.ceil(rest / 2);
    const leftCount = rest - rightCount;

    const yAt = (i: number, count: number) =>
      count <= 1 ? cY : bandTop + ((bandBottom - bandTop) * i) / (count - 1);

    const list = companies.map((company, index) => {
      let cardStyle: CSSProperties;
      let connX: number;
      let connY: number;

      if (index === 0) {
        // TOP
        cardStyle = {
          left: cX,
          top: EDGE_MARGIN,
          transform: "translateX(-50%)",
          width: CARD_W,
        };
        connX = cX;
        connY = EDGE_MARGIN + CARD_H;
      } else if (index <= rightCount) {
        // RIGHT column (top → bottom)
        const y = yAt(index - 1, rightCount);
        cardStyle = {
          left: box.w - SIDE_MARGIN,
          top: y,
          transform: "translate(-100%, -50%)",
          width: CARD_W,
        };
        connX = box.w - SIDE_MARGIN - CARD_W;
        connY = y;
      } else if (index === rightCount + 1) {
        // BOTTOM
        cardStyle = {
          left: cX,
          top: box.h - EDGE_MARGIN,
          transform: "translate(-50%, -100%)",
          width: CARD_W,
        };
        connX = cX;
        connY = box.h - EDGE_MARGIN - CARD_H;
      } else {
        // LEFT column (bottom → top)
        const i = index - (rightCount + 2);
        const y =
          leftCount <= 1
            ? cY
            : bandBottom - ((bandBottom - bandTop) * i) / (leftCount - 1);
        cardStyle = {
          left: SIDE_MARGIN,
          top: y,
          transform: "translateY(-50%)",
          width: CARD_W,
        };
        connX = SIDE_MARGIN + CARD_W;
        connY = y;
      }

      const meta = getFallbackIconMeta(company.revenueStage, index);

      return {
        company,
        index,
        cardStyle,
        connX,
        connY,
        fallbackIcon: meta.icon,
        fallbackColor: meta.color,
        nameColor: NAME_COLOR_POOL[index % NAME_COLOR_POOL.length],
      };
    });

    return { nodes: list, cx: cX, cy: cY };
  }, [companies, total, box]);

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP DIAGRAM                                                    */}
      {/* ================================================================== */}

      <div
        ref={boxRef}
        className="relative hidden h-[500px] w-full overflow-hidden rounded-2xl lg:block xl:h-[540px] 2xl:h-[580px]"
      >
        {/* soft ambient wash */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_68%)]" />
        {/* hub glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-3xl xl:h-64 xl:w-64" />

        {/* Connector lines + amber arrowheads */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox={`0 0 ${box.w} ${box.h}`}
          aria-hidden="true"
        >
          <defs>
            <marker
              id="ecoArrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#f59e0b" />
            </marker>
          </defs>

          {nodes.map((node) => (
            <line
              key={`line-${node.company.id}`}
              x1={cx}
              y1={cy}
              x2={node.connX}
              y2={node.connY}
              stroke="#f59e0b"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeOpacity="0.85"
              markerEnd="url(#ecoArrow)"
            />
          ))}

          <circle cx={cx} cy={cy} r="4.5" fill="#f59e0b" />
        </svg>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 z-20 h-36 w-36 -translate-x-1/2 -translate-y-1/2 xl:h-40 xl:w-40">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-b from-slate-800 to-slate-950 px-5 text-center text-white shadow-2xl shadow-slate-900/40 ring-2 ring-amber-500/30">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-300 to-amber-600 font-serif text-lg font-bold text-slate-950 shadow-lg shadow-amber-500/30 xl:h-10 xl:w-10">
              P
            </div>
            <div className="max-w-[130px] text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-white/90 xl:text-[10px]">
              Petronick Corporate Holdings LLC
            </div>
          </div>
        </div>

        {/* Company cards — fixed height so every left/right row aligns */}
        {nodes.map((node) => {
          const content = (
            <div className="group flex h-[66px] items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 shadow-[0_8px_28px_-12px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_14px_32px_-10px_rgba(245,158,11,0.28)] xl:gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-amber-400 to-amber-600 text-[10px] font-bold text-slate-950 shadow-sm shadow-amber-500/30">
                {node.index + 1}
              </span>
              <CompanyIcon
                company={node.company}
                fallbackIcon={node.fallbackIcon}
                fallbackColor={node.fallbackColor}
                size={34}
              />
              <div className="min-w-0 flex-1">
                <div
                  className={`line-clamp-2 text-[12px] font-bold leading-[1.15] ${node.nameColor} xl:text-[13px]`}
                  title={node.company.name}
                >
                  {node.company.name}
                </div>
                <div className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                  {node.company.revenueStage || "Business Unit"}
                </div>
              </div>
            </div>
          );

          if (node.company.website) {
            return (
              <a
                key={node.company.id}
                href={node.company.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${node.company.name}`}
                className="absolute z-30 block cursor-pointer"
                style={node.cardStyle}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={node.company.id} className="absolute z-30" style={node.cardStyle}>
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
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-amber-400 to-amber-600 text-[10px] font-bold text-slate-950 shadow-sm shadow-amber-500/30">
                  {node.index + 1}
                </span>
                <CompanyIcon
                  company={node.company}
                  fallbackIcon={node.fallbackIcon}
                  fallbackColor={node.fallbackColor}
                  size={38}
                />
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-bold leading-tight ${node.nameColor}`}>
                    {node.company.name}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {node.company.revenueStage || "Business Unit"}
                  </div>
                </div>
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

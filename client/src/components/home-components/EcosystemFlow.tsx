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

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
/*
 | ONE diagram, every screen size — no separate mobile "list" fallback.
 | Every size (hub, card, icon, badge, margins, box height) is derived from
 | the measured container width via `t` (0 = a ~320px phone, 1 = a ~1200px+
 | desktop column), so the exact same radial layout scales smoothly all the
 | way down to a small phone instead of switching to a different component.
 |
 | Reading order around the hub:
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
 | Both side columns share the same vertical band, so left and right are
 | always the exact same height. Each card is joined to the hub by a golden
 | line with an amber arrowhead landing on the card's inner edge.
*/

export default function EcosystemFlow({
  companies,
}: {
  companies: Company[];
}) {
  const total = companies.length;

  const boxRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(960);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) {
        setContainerWidth((prev) => (prev === w ? prev : w));
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 0 at a small phone (~300px wide) → 1 at a wide desktop column (~1200px+).
  const t = clamp01((containerWidth - 300) / 900);

  const { nodes, cx, cy, boxHeight, hubSize, hubShowsText } = useMemo(() => {
    const CARD_W = Math.round(104 + 140 * t);
    const CARD_H = Math.round(50 + 16 * t);
    const HUB = Math.round(64 + 96 * t);
    const ICON = Math.round(20 + 16 * t);
    const BADGE = Math.round(14 + 6 * t);
    const SIDE_MARGIN = Math.round(3 + 1 * t);
    const H = Math.round(440 + 160 * t);
    // Top/bottom cards sit this far from the box edge — a % of the box height
    // (rather than a small fixed px) so they pull in noticeably closer to the
    // hub instead of hugging the very top/bottom edge.
    const EDGE_MARGIN = Math.round(H * 0.09);
    const showText = HUB >= 100;
    const showSubtitle = CARD_W >= 132;

    const cX = containerWidth / 2;
    const cY = H / 2;

    // one band shared by both side columns → identical left/right heights.
    const bandTop = H * 0.26;
    const bandBottom = H * 0.74;

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
          left: containerWidth - SIDE_MARGIN,
          top: y,
          transform: "translate(-100%, -50%)",
          width: CARD_W,
        };
        connX = containerWidth - SIDE_MARGIN - CARD_W;
        connY = y;
      } else if (index === rightCount + 1) {
        // BOTTOM
        cardStyle = {
          left: cX,
          top: H - EDGE_MARGIN,
          transform: "translate(-50%, -100%)",
          width: CARD_W,
        };
        connX = cX;
        connY = H - EDGE_MARGIN - CARD_H;
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
        cardH: CARD_H,
        iconSize: ICON,
        badgeSize: BADGE,
        showSubtitle,
        fallbackIcon: meta.icon,
        fallbackColor: meta.color,
        nameColor: NAME_COLOR_POOL[index % NAME_COLOR_POOL.length],
      };
    });

    return {
      nodes: list,
      cx: cX,
      cy: cY,
      boxHeight: H,
      hubSize: HUB,
      hubShowsText: showText,
    };
  }, [companies, total, containerWidth, t]);

  const pBadgeSize = hubShowsText
    ? Math.round(hubSize * 0.26)
    : Math.round(hubSize * 0.5);
  const pBadgeFontSize = hubShowsText
    ? Math.round(hubSize * 0.16)
    : Math.round(hubSize * 0.28);
  const hubLabelFontSize = Math.min(10, Math.max(7, Math.round(hubSize * 0.075)));

  return (
    <div
      ref={boxRef}
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ height: boxHeight }}
    >
      {/* soft ambient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_68%)]" />
      {/* hub glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-3xl"
        style={{ width: hubSize * 2.2, height: hubSize * 2.2 }}
      />

      {/* Connector lines + amber arrowheads */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox={`0 0 ${containerWidth} ${boxHeight}`}
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
      <div
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ width: hubSize, height: hubSize }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-b from-slate-800 to-slate-950 px-2 text-center text-white shadow-2xl shadow-slate-900/40 ring-2 ring-amber-500/30">
          <div
            className="flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-300 to-amber-600 font-serif font-bold text-slate-950 shadow-lg shadow-amber-500/30"
            style={{
              width: pBadgeSize,
              height: pBadgeSize,
              fontSize: pBadgeFontSize,
              marginBottom: hubShowsText ? Math.round(hubSize * 0.05) : 0,
            }}
          >
            P
          </div>
          {hubShowsText && (
            <div
              className="font-bold uppercase leading-tight tracking-[0.1em] text-white/90"
              style={{ maxWidth: hubSize * 0.82, fontSize: hubLabelFontSize }}
            >
              Petronick Corporate Holdings LLC
            </div>
          )}
        </div>
      </div>

      {/* Company cards — every row lines up left ↔ right at any screen size */}
      {nodes.map((node) => {
        const content = (
          <div
            className="group flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2 shadow-[0_8px_28px_-12px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_14px_32px_-10px_rgba(245,158,11,0.28)]"
            style={{ height: node.cardH }}
          >
            <span
              className="flex shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-amber-400 to-amber-600 font-bold text-slate-950 shadow-sm shadow-amber-500/30"
              style={{
                width: node.badgeSize,
                height: node.badgeSize,
                fontSize: Math.max(8, Math.round(node.badgeSize * 0.55)),
              }}
            >
              {node.index + 1}
            </span>
            <CompanyIcon
              company={node.company}
              fallbackIcon={node.fallbackIcon}
              fallbackColor={node.fallbackColor}
              size={node.iconSize}
            />
            <div className="min-w-0 flex-1">
              <div
                className={`line-clamp-2 font-bold leading-[1.15] ${node.nameColor}`}
                style={{ fontSize: Math.max(9.5, node.cardH * 0.19) }}
                title={node.company.name}
              >
                {node.company.name}
              </div>
              {node.showSubtitle && (
                <div className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                  {node.company.revenueStage || "Business Unit"}
                </div>
              )}
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
  );
}

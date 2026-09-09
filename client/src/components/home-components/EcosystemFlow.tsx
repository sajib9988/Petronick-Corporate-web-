"use client";

import { useMemo } from "react";

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

const ICON_BG_POOL = [
  "from-blue-500 to-blue-700",
  "from-pink-500 to-pink-700",
  "from-emerald-500 to-emerald-700",
  "from-orange-500 to-orange-700",
  "from-amber-500 to-amber-700",
  "from-teal-500 to-teal-700",
  "from-rose-500 to-rose-700",
  "from-violet-500 to-violet-700",
];

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

interface EcosystemFlowProps {
  companies: Company[];
}

// Ellipse radii, as a percentage of the diagram box.
const RADIUS_X = 46;
const RADIUS_Y = 42;

function CompanyIcon({
  company,
  bg,
  className,
}: {
  company: Company;
  bg: string;
  className: string;
}) {
  if (company.icon) {
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white ${className}`}
      >
        <img
          src={company.icon}
          alt={company.name}
          className="h-full w-full object-contain p-1"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr ${bg} font-bold text-white ${className}`}
    >
      {company.name.charAt(0)}
    </div>
  );
}

export default function EcosystemFlow({ companies }: EcosystemFlowProps) {
  const nodes = useMemo(() => {
    const total = companies.length || 1;

    return companies.map((company, index) => {
      // Start at the top (12 o'clock), go clockwise.
      const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
      const left = 50 + RADIUS_X * Math.cos(angle);
      const top = 50 + RADIUS_Y * Math.sin(angle);

      // Anchor edge cards by their inner edge so nothing spills out of the box.
      const anchorX = left > 62 ? "-100%" : left < 38 ? "0%" : "-50%";
      const anchorY = top > 62 ? "-100%" : top < 38 ? "0%" : "-50%";

      return {
        company,
        index,
        left,
        top,
        anchorX,
        anchorY,
        iconBg: ICON_BG_POOL[index % ICON_BG_POOL.length],
        nameColor: NAME_COLOR_POOL[index % NAME_COLOR_POOL.length],
      };
    });
  }, [companies]);

  return (
    <>
      {/* ── Desktop: radial diagram ── */}
      <div className="relative hidden aspect-[16/10] w-full overflow-visible lg:block">
        {/* Solid connector lines + round joints */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {nodes.map((node) => (
            <line
              key={`line-${node.company.id}`}
              x1="50%"
              y1="50%"
              x2={`${node.left}%`}
              y2={`${node.top}%`}
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.55"
            />
          ))}
          {/* Origin joint */}
          <circle cx="50%" cy="50%" r="4" fill="#f59e0b" />
          {/* Card joints */}
          {nodes.map((node) => (
            <circle
              key={`dot-${node.company.id}`}
              cx={`${node.left}%`}
              cy={`${node.top}%`}
              r="4"
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 z-20 h-40 w-40 -translate-x-1/2 -translate-y-1/2 xl:h-44 xl:w-44">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-950 px-4 text-center text-white shadow-xl shadow-slate-900/25 ring-1 ring-amber-500/40">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 font-serif text-lg font-bold text-slate-950">
              P
            </div>
            <div className="text-[11px] font-bold uppercase leading-tight tracking-wide">
              Petronick Corporate Holdings LLC
            </div>
          </div>
        </div>

        {/* Company cards */}
        {nodes.map((node) => (
          <div
            key={node.company.id}
            className="absolute z-10 w-44 xl:w-52"
            style={{
              left: `${node.left}%`,
              top: `${node.top}%`,
              transform: `translate(${node.anchorX}, ${node.anchorY})`,
            }}
          >
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm xl:gap-3 xl:p-3">
              <CompanyIcon
                company={node.company}
                bg={node.iconBg}
                className="h-9 w-9 text-xs"
              />
              <div className="min-w-0">
                <div
                  className={`truncate text-[13px] font-bold xl:text-sm ${node.nameColor}`}
                >
                  {node.index + 1}. {node.company.name}
                </div>
                <div className="truncate text-[11px] text-slate-400 xl:text-xs">
                  {node.company.revenueStage || "Business Unit"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile / tablet: stacked list ── */}
      <div className="lg:hidden">
        <div className="mx-auto mb-5 flex w-fit flex-col items-center rounded-2xl bg-slate-950 px-6 py-4 text-center text-white ring-1 ring-amber-500/40">
          <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 font-serif text-base font-bold text-slate-950">
            P
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wide">
            Petronick Corporate Holdings LLC
          </div>
        </div>

        <div className="space-y-2.5">
          {nodes.map((node) => (
            <div
              key={node.company.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <CompanyIcon
                company={node.company}
                bg={node.iconBg}
                className="h-10 w-10 text-sm"
              />
              <div className="min-w-0">
                <div className={`truncate text-sm font-bold ${node.nameColor}`}>
                  {node.index + 1}. {node.company.name}
                </div>
                <div className="truncate text-xs text-slate-400">
                  {node.company.revenueStage || "Business Unit"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, LayoutGrid, Waypoints } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const EcosystemFlow = dynamic(() => import("./EcosystemFlow"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[520px] bg-slate-950/80 rounded-2xl border border-slate-800/80 animate-pulse" />
  ),
});

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

export default function EcosystemSection({ companies }: { companies: Company[] }) {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string | null>(companies[0]?.id ?? null);
  const [viewMode, setViewMode] = useState<"flow" | "list">("flow");
  const [userPicked, setUserPicked] = useState(false);

  // Default to List view on mobile, Flow view on desktop — unless user manually toggled
  useEffect(() => {
    if (!userPicked) {
      setViewMode(isMobile ? "list" : "flow");
    }
  }, [isMobile, userPicked]);

  const handleViewChange = (mode: "flow" | "list") => {
    setUserPicked(true);
    setViewMode(mode);
  };

  const activeCompany = companies.find((c) => c.id === activeId) ?? null;

  if (companies.length === 0) return null;

  return (
    <section className="py-16 px-6 lg:px-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-amber-400 uppercase mb-3">
            About the Holding Company
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            A Connected Business Ecosystem
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-8 max-w-xl">
            Petronick Corporate Holdings LLC brings together multiple companies
            that work independently while supporting one another through shared
            expertise, marketing, logistics, fulfillment, technology, and growth
            strategies.
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="inline-flex bg-slate-900 border border-slate-800 rounded-full p-1 self-start lg:self-auto">
          <button
            onClick={() => handleViewChange("flow")}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all ${
              viewMode === "flow"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Waypoints size={15} />
            <span className="hidden sm:inline">Interactive Node Web</span>
            <span className="sm:hidden">Node Web</span>
          </button>
          <button
            onClick={() => handleViewChange("list")}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all ${
              viewMode === "list"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid size={15} />
            <span className="hidden sm:inline">Structured Directory List</span>
            <span className="sm:hidden">List</span>
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Flow or List */}
        {viewMode === "flow" ? (
          <div className="lg:col-span-7 xl:col-span-8">
            <EcosystemFlow
              companies={companies}
              activeNodeId={activeId}
              onSelectNode={setActiveId}
            />
          </div>
        ) : (
          <div className="lg:col-span-7 xl:col-span-8 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-2 h-[420px] sm:h-[520px] overflow-y-auto">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => setActiveId(company.id)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  company.id === activeId
                    ? "bg-slate-800 border-amber-500"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="min-w-0">
                  <p className="text-base font-semibold text-white truncate">
                    {company.name}
                  </p>
                  <p className="text-sm text-slate-400 leading-6 truncate mt-1">
                    {company.description}
                  </p>
                </div>
                {company.revenueStage && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 flex-shrink-0">
                    {company.revenueStage}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Right: Detail panel */}
        <div className="lg:col-span-5 xl:col-span-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 flex flex-col">
          {activeCompany ? (
            <>
              <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase mb-4">
                Ecosystem Integration Detail
              </p>

              <div className="flex items-center gap-3 mb-5">
                {activeCompany.logo ? (
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={activeCompany.logo}
                      alt={activeCompany.name}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {activeCompany.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold text-white truncate">
                    {activeCompany.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {activeCompany.revenueStage || "Business Unit"}
                  </p>
                </div>
              </div>

              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase mb-2">
                Inter-Company Business Synergy
              </p>
              <p className="text-base leading-8 text-slate-300 flex-1">
                {activeCompany.description}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Part of Petronick Corporate Holdings
                </span>
                {activeCompany.website && (
                  <a
                    href={activeCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Visit <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
              Select a company to view details
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 px-8 py-3.5 bg-white text-slate-900 rounded-full text-base font-semibold hover:bg-slate-100 transition-all"
        >
          Explore All Units
        </Link>
      </div>
    </section>
  );
}
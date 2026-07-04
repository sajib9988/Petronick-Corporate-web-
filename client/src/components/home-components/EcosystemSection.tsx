"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, X, LayoutGrid, Waypoints } from "lucide-react";
import EcosystemFlow from "./EcosystemFlow";

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
  const [activeId, setActiveId] = useState<string | null>(companies[0]?.id ?? null);
  const [viewMode, setViewMode] = useState<"flow" | "list">("flow");

  const activeCompany = companies.find((c) => c.id === activeId) ?? null;

  if (companies.length === 0) return null;

  return (
    <section className=" mx-auto py-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">
            About the Holding Company
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
            A Connected Business Ecosystem
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
            Petronick Corporate Holdings LLC brings together multiple companies
            that work independently while supporting one another through shared
            expertise, marketing, logistics, fulfillment, technology, and growth
            strategies.
          </p>
        </div>

        {/* Toggle */}
        <div className="inline-flex bg-slate-900 border border-slate-800 rounded-full p-1 self-start lg:self-auto">
          <button
            onClick={() => setViewMode("flow")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
              viewMode === "flow"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Waypoints size={13} />
            Interactive Node Web
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
              viewMode === "list"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid size={13} />
            Structured Directory List
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
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
          <div className="lg:col-span-7 xl:col-span-8 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 space-y-2 h-[520px] overflow-y-auto">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => setActiveId(company.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  company.id === activeId
                    ? "bg-slate-800 border-indigo-500"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{company.name}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{company.description}</p>
                </div>
                {company.revenueStage && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 flex-shrink-0">
                    {company.revenueStage}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Right: Detail panel */}
        <div className="lg:col-span-5 xl:col-span-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col">
          {activeCompany ? (
            <>
              <p className="text-[10px] font-semibold tracking-widest text-indigo-400 uppercase mb-4">
                Ecosystem Integration Detail
              </p>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {activeCompany.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">{activeCompany.name}</h3>
                  <p className="text-xs text-slate-400">
                    {activeCompany.revenueStage || "Business Unit"}
                  </p>
                </div>
              </div>

              <p className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase mb-2">
                Inter-Company Business Synergy
              </p>
              <p className="text-sm text-slate-300 leading-relaxed flex-1">
                {activeCompany.description}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium">
                  Part of Petronick Corporate Holdings
                </span>
                {activeCompany.website && (
                  <a
                    href={activeCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Visit <ExternalLink size={11} />
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

      <div className="mt-8 text-center">
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-slate-900 rounded-full text-sm font-semibold hover:bg-slate-100 transition-all"
        >
          Explore All Units
        </Link>
      </div>
    </section>
  );
}
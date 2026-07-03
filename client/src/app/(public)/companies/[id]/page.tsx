import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Building2,
  Layers,
  CircleDot,
} from "lucide-react";
import { getCompanyById } from "@/service/company";

import { Company } from "@/lib/type";

const stageColors: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  Launching: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  "Pre-launch": "bg-amber-500/15 text-amber-300 border-amber-400/30",
  "Re-launching": "bg-purple-500/15 text-purple-300 border-purple-400/30",
};

async function getCompany(id: string): Promise<Company | null> {
  try {
    const res = await getCompanyById(id);
    if (res?.success && res?.data) return res.data as Company;
  } catch {
    // fall through to fallback lookup
  }
  return null;
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await getCompany(id);

  if (!company) notFound();

  const initial = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="bg-white min-h-screen">
      {/* ── Hero / Dossier header ── */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 pt-10 pb-16">
          {/* Breadcrumb */}
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white/80 transition-colors mb-8"
          >
            <ArrowLeft size={12} />
            Our Companies
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Logo tile */}
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain p-2.5 rounded-2xl"
                />
              ) : (
                <span className="text-2xl font-bold text-white/80">
                  {initial}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {company.revenueStage && (
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border mb-3 ${
                    stageColors[company.revenueStage] ??
                    "bg-white/10 text-white/70 border-white/20"
                  }`}
                >
                  <CircleDot size={9} />
                  {company.revenueStage}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                {company.name}
              </h1>
              <p className="text-white/50 text-sm mt-2">
                A Petronick Corporate Holdings business unit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
              Overview
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              {company.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Visit Website
                  <ExternalLink size={14} />
                </a>
              )}
              <Link
                href="/promotion-agent"
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Represent This Unit
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* ── Sidebar: Company Profile / dossier ── */}
          <aside className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden sticky top-24">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Building2 size={14} className="text-gray-400" />
                <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Company Profile
                </span>
              </div>

              <dl className="divide-y divide-gray-100">
                <div className="px-5 py-3.5 flex items-center justify-between">
                  <dt className="text-xs text-gray-400">Status</dt>
                  <dd className="text-xs font-semibold text-gray-800">
                    {company.isVisible ? "Active Listing" : "Unlisted"}
                  </dd>
                </div>
                <div className="px-5 py-3.5 flex items-center justify-between">
                  <dt className="text-xs text-gray-400">Stage</dt>
                  <dd className="text-xs font-semibold text-gray-800">
                    {company.revenueStage ?? "—"}
                  </dd>
                </div>
                <div className="px-5 py-3.5 flex items-center justify-between">
                  <dt className="text-xs text-gray-400">Unit No.</dt>
                  <dd className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                    <Layers size={11} className="text-gray-300" />
                    {String(company.order ?? 0).padStart(2, "0")}
                  </dd>
                </div>
                <div className="px-5 py-3.5 flex items-center justify-between">
                  <dt className="text-xs text-gray-400">Website</dt>
                  <dd className="text-xs font-semibold text-gray-800">
                    {company.website ? "Available" : "Coming soon"}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Explore More
          </p>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            See the rest of our ecosystem
          </h2>
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            View All Companies
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
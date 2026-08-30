import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Building2,
  Layers,
  CircleDot,
  Globe2,
  Sparkles,
  Network,
} from "lucide-react";
import { getCompanyById } from "@/service/company";
import { Container } from "@/components/Container";
import Reveal from "@/components/ui/motion/Reveal";

import { Company } from "@/lib/type";

const stageColors: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  Launching: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  "Pre-launch": "bg-amber-500/15 text-amber-300 border-amber-400/30",
  "Re-launching": "bg-purple-500/15 text-purple-300 border-purple-400/30",
  growth: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
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

  const quickFacts = [
    {
      icon: CircleDot,
      label: "Listing Status",
      value: company.isVisible ? "Active Listing" : "Unlisted",
    },
    {
      icon: Sparkles,
      label: "Revenue Stage",
      value: company.revenueStage ? company.revenueStage : "—",
    },
    {
      icon: Layers,
      label: "Unit No.",
      value: String(company.order ?? 0).padStart(2, "0"),
    },
    {
      icon: Globe2,
      label: "Website",
      value: company.website ? "Available" : "Coming soon",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      {/* ── Hero / Dossier header ── */}
      <section className="relative overflow-hidden bg-[#0B1220] text-white">
        {/* grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* emerald glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-emerald-400/10 blur-[100px]" />

        <Container>
          <div className="relative mx-auto max-w-6xl px-1 pt-10 pb-24 sm:pb-28">
            {/* Breadcrumb */}
            <Link
              href="/companies"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 transition-colors hover:text-white/80"
            >
              <ArrowLeft size={13} />
              Our Companies
            </Link>

            <Reveal>
              <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-end">
                {/* Logo tile */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-[3px] rounded-[26px] bg-gradient-to-tr from-emerald-400/70 via-emerald-500/10 to-transparent" />
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-full rounded-[22px] object-contain p-3"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-white/80">
                        {initial}
                      </span>
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  {company.revenueStage && (
                    <span
                      className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        stageColors[company.revenueStage] ??
                        "border-white/20 bg-white/10 text-white/70"
                      }`}
                    >
                      <CircleDot size={9} />
                      {company.revenueStage}
                    </span>
                  )}
                  <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                    {company.name}
                  </h1>
                  <p className="mt-3 flex items-center gap-2 text-sm text-white/45">
                    <Network size={14} className="text-emerald-400/80" />
                    A Petronick Corporate Holdings business unit
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Body ── */}
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Quick facts strip (overlaps hero) */}
          <Reveal>
            <div className="relative -mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)] sm:grid-cols-4">
              {quickFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className={`px-5 py-5 sm:px-6 sm:py-6 ${
                      index % 2 === 0 ? "border-r border-gray-100" : ""
                    } ${index < 2 ? "border-b border-gray-100 sm:border-b-0" : ""} ${
                      index < 3 ? "sm:border-r sm:border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      <Icon size={12} className="text-emerald-500" />
                      {fact.label}
                    </div>
                    <div className="mt-1.5 text-sm font-bold text-[#111827] sm:text-[15px]">
                      {fact.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-3">
            {/* Main content */}
            <Reveal className="lg:col-span-2">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-1 w-6 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Overview
                  </span>
                </div>

                <p className="text-lg leading-8 text-gray-700">
                  {company.description}
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
                    >
                      Visit Website
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <Link
                    href="/promotion-agent"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                  >
                    Represent This Unit
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* ── Sidebar: ecosystem context ── */}
            <Reveal className="lg:col-span-1" delay={0.1}>
              <aside className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-white px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                      Inside the Ecosystem
                    </span>
                  </div>
                </div>

                <div className="space-y-4 px-5 py-5">
                  <p className="text-sm leading-6 text-gray-500">
                    {company.name} operates independently while sharing marketing,
                    logistics, technology, and growth support across Petronick
                    Corporate Holdings.
                  </p>

                  <dl className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/60">
                    <div className="flex items-center justify-between px-4 py-3">
                      <dt className="text-xs text-gray-400">Status</dt>
                      <dd className="text-xs font-semibold text-gray-800">
                        {company.isVisible ? "Active Listing" : "Unlisted"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <dt className="text-xs text-gray-400">Stage</dt>
                      <dd className="text-xs font-semibold text-gray-800">
                        {company.revenueStage ?? "—"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <dt className="text-xs text-gray-400">Unit No.</dt>
                      <dd className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                        <Layers size={11} className="text-gray-300" />
                        {String(company.order ?? 0).padStart(2, "0")}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    href="/companies"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                    Explore all business units
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* ── CTA ── */}
      <Container>
        <div className="mx-auto max-w-6xl pb-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-[#0B1220] px-6 py-16 text-center sm:px-12 sm:py-20">
              <div className="pointer-events-none absolute -bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[110px]" />
              <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-emerald-400">
                Explore More
              </p>
              <h2 className="relative mx-auto mt-4 max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
                See the rest of our ecosystem
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-400">
                Every Petronick business unit is built to generate independent
                revenue while strengthening the whole.
              </p>
              <Link
                href="/companies"
                className="relative mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100"
              >
                View All Companies
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}

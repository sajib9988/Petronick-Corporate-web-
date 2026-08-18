import { getAllCompanies } from "@/service/company";
import { getPageBySlug } from "@/service/cms";
import { Container } from "@/components/Container";
import {
  ExternalLink,
  ArrowRight,
  Building2,
  Globe2,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const stageColors: Record<string, string> = {
  Active:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",

  Launching:
    "bg-blue-50 text-blue-700 border border-blue-200",

  "Pre-launch":
    "bg-amber-50 text-amber-700 border border-amber-200",

  "Re-launching":
    "bg-purple-50 text-purple-700 border border-purple-200",
};

export default async function CompaniesPage() {
  const [pageRes, companiesRes] = await Promise.all([
    getPageBySlug("company-page"),

    getAllCompanies({
      isVisible: true,
      limit: 50,
    }).catch(() => ({
      data: [],
    })),
  ]);

  const sections = pageRes?.data?.sections ?? [];

  const heroSection = sections.find(
    (s: any) => s.sectionType === "HERO"
  );

  const statsSection = sections.find(
    (s: any) => s.sectionType === "STATS"
  );

  const ctaSection = sections.find(
    (s: any) => s.sectionType === "CTA"
  );

  const heroContent = heroSection?.content ?? {};
  const statsContent = statsSection?.content ?? {};
  const ctaContent = ctaSection?.content ?? {};

  const companies: any[] = companiesRes?.data ?? [];

  // =========================
  // HERO
  // =========================

  const badge =
    heroContent.badge ?? "PORTFOLIO OVERVIEW";

  const headline =
    heroContent.headline ?? "Our Companies";

  const subheadline =
    heroContent.subheadline ??
    "Petronick Corporate Holdings operates multiple specialized business units, each built to create independent revenue while contributing to a stronger and more collaborative business ecosystem.";

  // =========================
  // STATS
  // =========================

  const stats = [
    {
      value: statsContent.statValue1 ?? "7+",
      label: statsContent.statLabel1 ?? "Business Units",
    },
    {
      value: statsContent.statValue2 ?? "100%",
      label: statsContent.statLabel2 ?? "Revenue Ready",
    },
    {
      value: statsContent.statValue3 ?? "Multi",
      label: statsContent.statLabel3 ?? "Market Reach",
    },
  ];

  // =========================
  // CTA
  // =========================

  const ctaEyebrow =
    ctaContent.eyebrow ?? "PARTNERSHIP OPPORTUNITY";

  const ctaTitle =
    ctaContent.title ?? "Represent Our Business Units";

  const ctaDescription =
    ctaContent.description ??
    "Qualified Promotion Agents can represent one or multiple Petronick business units depending on their experience and focus area.";

  const ctaBtnText =
    ctaContent.btnText ?? "Apply as Promotion Agent";

  const ctaBtnLink =
    ctaContent.btnLink ?? "/promotion-agent";

  const ctaSecondaryText =
    ctaContent.secondaryBtnText ?? "Contact Us";

  const ctaSecondaryLink =
    ctaContent.secondaryBtnLink ?? "/contact";

  return (
    <main className="min-h-screen bg-[#F7F9FC]">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden bg-[#0B1220] text-white">

        {/* Background grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-6 lg:px-8">

          {/* Badge */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-[11px] font-bold tracking-[0.22em] text-emerald-300">
              {badge}
            </span>

          </div>

          {/* Heading */}

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {headline}
          </h1>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {subheadline}
          </p>

        </div>
      </section>


      {/* ==================================================
          CONTENT
      ================================================== */}

      <Container>

        {/* ==================================================
            STATS
        ================================================== */}

        <section className="relative -mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="grid grid-cols-3">

            {stats.map((stat, index) => (

              <div
                key={stat.label}
                className={`
                  px-3 py-6 text-center sm:px-6 sm:py-7
                  ${
                    index !== stats.length - 1
                      ? "border-r border-gray-100"
                      : ""
                  }
                `}
              >

                <div className="text-xl font-bold text-[#111827] sm:text-2xl">
                  {stat.value}
                </div>

                <div className="mt-1 text-[11px] font-medium text-[#64748B] sm:text-xs">
                  {stat.label}
                </div>

              </div>

            ))}

          </div>

        </section>


        {/* ==================================================
            COMPANIES
        ================================================== */}

        <section className="py-20">

          {/* Section Header */}

          <div className="mb-10">

            <div className="mb-3 flex items-center gap-2">

              <span className="h-1 w-6 rounded-full bg-emerald-500" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Our Portfolio
              </span>

            </div>

            <div className="flex items-end justify-between gap-6">

              <div>

                <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                  Business Units
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Explore the businesses operating under
                  Petronick Corporate Holdings and their
                  respective market focus.
                </p>

              </div>

              <div className="hidden items-center gap-2 text-sm font-medium text-slate-400 sm:flex">

                <Building2 size={17} />

                <span>
                  {companies.length} Companies
                </span>

              </div>

            </div>

          </div>


          {/* ==================================================
              COMPANY GRID
          ================================================== */}

          {companies.length > 0 ? (

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {companies.map((company: any) => {

                const initial =
                  company.initial ??
                  company.name
                    ?.split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                return (

                  <article
                    key={company.id}
                    className="
                      group
                      flex
                      h-full
                      flex-col
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      shadow-[0_2px_8px_rgba(15,23,42,0.04)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-gray-300
                      hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]
                    "
                  >

                    {/* --------------------------------------
                        TOP COLOR STRIP
                    -------------------------------------- */}

                    <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />


                    {/* --------------------------------------
                        HEADER
                    -------------------------------------- */}

                    <div className="p-7 pb-5">

                      <div className="flex items-start gap-4">

                        {/* Logo */}

                        {company.logo ? (

                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-[#F8FAFC]">

                            <img
                              src={company.logo}
                              alt={company.name}
                              className="h-full w-full object-contain p-2.5"
                            />

                          </div>

                        ) : (

                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-[#111827]">

                            <span className="text-xl font-bold text-white">
                              {initial}
                            </span>

                          </div>

                        )}


                        {/* Name */}

                        <div className="min-w-0 flex-1 pt-1">

                          <h3 className="text-[17px] font-bold leading-tight text-[#111827]">
                            {company.name}
                          </h3>

                          {company.revenueStage && (

                            <span
                              className={`
                                mt-2
                                inline-flex
                                items-center
                                rounded-full
                                px-2.5
                                py-1
                                text-[10px]
                                font-bold
                                ${
                                  stageColors[
                                    company.revenueStage
                                  ] ??
                                  "border border-gray-200 bg-gray-50 text-gray-600"
                                }
                              `}
                            >
                              {company.revenueStage}
                            </span>

                          )}

                        </div>

                      </div>

                    </div>


                    {/* --------------------------------------
                        DESCRIPTION
                    -------------------------------------- */}

                    <div className="flex-1 px-7 pb-7">

                      <p className="text-sm leading-7 text-[#64748B]">
                        {company.description}
                      </p>

                    </div>


                    {/* --------------------------------------
                        FOOTER
                    -------------------------------------- */}

                    <div className="border-t border-gray-100 bg-[#F8FAFC] px-7 py-5">

                      {company.website ? (

                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-[#475569]
                            transition-colors
                            hover:text-emerald-600
                          "
                        >

                          <Globe2 size={15} />

                          Visit Website

                          <ExternalLink size={14} />

                        </a>

                      ) : (

                        <span className="text-xs italic text-gray-400">
                          Website coming soon
                        </span>

                      )}

                    </div>

                  </article>

                );

              })}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

              <Building2
                size={32}
                className="mx-auto text-gray-300"
              />

              <p className="mt-4 text-sm font-medium text-gray-500">
                No companies available at the moment.
              </p>

            </div>

          )}

        </section>


        {/* ==================================================
            CTA
        ================================================== */}

        <section className="pb-20">

          <div className="overflow-hidden rounded-3xl bg-[#0B1220]">

            <div className="px-6 py-16 text-center sm:px-12 sm:py-20">

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-400">
                {ctaEyebrow}
              </p>

              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {ctaTitle}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                {ctaDescription}
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                  href={ctaBtnLink}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-emerald-500
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-white
                    transition-colors
                    hover:bg-emerald-600
                  "
                >
                  {ctaBtnText}

                  <ArrowRight size={16} />

                </Link>

                <Link
                  href={ctaSecondaryLink}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-white/15
                    bg-white/5
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-colors
                    hover:bg-white/10
                  "
                >
                  {ctaSecondaryText}
                </Link>

              </div>

            </div>

          </div>

        </section>

      </Container>

    </main>
  );
}
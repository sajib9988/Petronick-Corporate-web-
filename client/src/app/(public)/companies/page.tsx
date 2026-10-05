import { getAllCompanies } from "@/service/company";
import { getPageBySlug } from "@/service/cms";
import { Container } from "@/components/Container";
import {
  ArrowRight,
  Building2,
  Globe2,
  TrendingUp,
  Package,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import CompanyCard from "@/components/admin/card/CompanyCard";
import CompaniesHero from "@/components/home-components/CompaniesHero";

export const dynamic = "force-dynamic";

// Image is only shown on the frontend when the admin's "Image Visibility"
// toggle is on — the upload itself is preserved either way.
function visibleImage(section?: {
  image?: string | null;
  imageVisible?: boolean;
}) {
  if (!section?.image) return null;
  return section.imageVisible === false ? null : section.image;
}

const FACT_ICONS = [TrendingUp, Package, Globe2, Briefcase];

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

  const heroSection = sections.find((s: any) => s.sectionType === "HERO");

  const statsSection0 = sections.find(
    (s: any) => s.sectionType === "STATS" && s.order === 0
  );
  const statsSection1 = sections.find(
    (s: any) => s.sectionType === "STATS" && s.order === 1
  );
  const statsSection2 = sections.find(
    (s: any) => s.sectionType === "STATS" && s.order === 2
  );

  const snapshotSection = sections.find(
    (s: any) => s.sectionType === "SNAPSHOT"
  );

  const revenueSection = sections.find(
    (s: any) => s.sectionType === "REVENUE"
  );

  const heroContent = heroSection?.content ?? {};
  const statsContent0 = statsSection0?.content ?? {};
  const statsContent1 = statsSection1?.content ?? {};
  const statsContent2 = statsSection2?.content ?? {};
  const snapshotContent = snapshotSection?.content ?? {};
  const revenueContent = revenueSection?.content ?? {};

  const companies: any[] = companiesRes?.data ?? [];

  // Snapshot — individual CMS fields (FIELDS.SNAPSHOT), only Facts 1-4 used.
  const snapshotFacts: { label: string; value: string }[] = [
    {
      label: snapshotContent.entityTypeLabel ?? "Entity Type",
      value: snapshotContent.entityType ?? "Limited Liability Company",
    },
    {
      label: snapshotContent.headquartersLabel ?? "Headquarters",
      value: snapshotContent.headquarters ?? "Pittsburgh, Pennsylvania, USA",
    },
    {
      label: snapshotContent.structureLabel ?? "Structure",
      value:
        snapshotContent.structure ?? "Vertically Integrated Holding Company",
    },
    {
      label: snapshotContent.businessModelLabel ?? "Business Model",
      value:
        snapshotContent.businessModel ??
        "Holding Company plus Promotion Agent Network",
    },
  ];

  // Promotion Agent banner — from CMS "REVENUE" section (company-page)
  const label = revenueContent.label || "Promotion Agent Opportunity";
  const headline =
    revenueContent.headline || "Represent Companies Across the PCH Ecosystem";
  const paragraph =
    revenueContent.paragraph ||
    "Qualified Promotion Agents can introduce products, services, and opportunities from one or multiple Petronick Corporate Holdings companies based on their experience and market focus.";
  const btnText = revenueContent.btnText || "Apply as a Promotion Agent";
  const btnLink = revenueContent.btnLink || "/promotion-agent";
  const secondaryBtnText = revenueContent.secondaryBtnText || "Contact Us";
  const secondaryBtnLink = revenueContent.secondaryBtnLink || "/contact";

  return (
    <main className="min-h-screen bg-[#F7F9FC]">
      <CompaniesHero
        content={heroContent}
        image={visibleImage(heroSection)}
      />

      {/* ==================================================
          PORTFOLIO OVERVIEW (dynamic, from CMS "STATS" section)
      ================================================== */}

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">
              {statsContent0.eyebrow ?? "Portfolio Overview"}
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
              {statsContent0.title ??
                "10 Specialized Companies. One Connected Ecosystem."}
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64748B] sm:text-base">
              {statsContent0.description ??
                "The PCH portfolio brings together businesses across digital growth, fulfillment, distribution, specialty commerce, gifting, title services, lifestyle products, and business advisory. Each company operates with its own market focus while contributing to a broader connected business ecosystem."}
            </p>
          </div>
        </Container>
      </section>

      <Container>
        {/* ==================================================
            COMPANIES section
        ================================================== */}

        <section id="our-companies"
         className="scroll-mt-24 py-8">
          <div className="mb-3 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-1 w-6 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                {statsContent1.eyebrow ?? "Our Portfolio"}
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
              {statsContent1.title ?? "Explore Our Companies"}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
              {statsContent1.description ??
                "Learn what each company does, where it fits within the PCH ecosystem, and how to explore its services or website."}
            </p>
          </div>

          {companies.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company: any, idx: number) => (
                <CompanyCard key={company.id} company={company} index={idx} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
              <Building2 size={32} className="mx-auto text-gray-300" />
              <p className="mt-4 text-sm font-medium text-gray-500">
                No companies available at the moment.
              </p>
            </div>
          )}
        </section>
      </Container>

      {/* ==================================================
          CONNECTED CAPABILITIES + SNAPSHOT + PROMOTION BANNER
      ================================================== */}

      <section className="bg-[#173652] pb-8">
        <Container>
          {/* Heading */}
          <div className="py-16 text-center sm:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-400">
              {statsContent2.eyebrow ?? "Connected Capabilities"}
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {statsContent2.title ?? "Different Businesses. Shared Strengths"}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              {statsContent2.description ??
                "The companies operate independently while benefiting from capabilities that can support launch, operations, customer acquisition, fulfillment, and long term growth."}
            </p>
          </div>

          {/* Snapshot — one grid, full container width */}
          {snapshotFacts.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {snapshotFacts.map((fact, idx) => {
                const Icon = FACT_ICONS[idx % FACT_ICONS.length];

                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-[#10233A] p-6 text-left transition-colors hover:border-amber-400/40"
                  >
                    <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-400">
                      <Icon size={18} />
                    </div>

                    <h3 className="text-base font-semibold text-white">
                      {fact.label}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {fact.value}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Promotion Agent banner */}
          <div className="mt-12 border-t border-white/10">
            <div className="flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-14">
              {/* LEFT: label + headline + paragraph */}
              <div className="min-w-0 lg:max-w-2xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
                  {label}
                </p>

                <h2 className="font-serif text-2xl font-bold leading-snug text-white sm:text-3xl">
                  {headline}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                  {paragraph}
                </p>
              </div>

              {/* RIGHT: buttons (stacked) */}
              <div className="flex w-full shrink-0 flex-col items-start gap-3 lg:w-[330px]">
                <Link
                  href={btnLink}
                  className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#B8934A] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:brightness-110"
                >
                  {btnText}
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href={secondaryBtnLink}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-amber-400/60 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:border-amber-400 hover:bg-white/5"
                >
                  {secondaryBtnText}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
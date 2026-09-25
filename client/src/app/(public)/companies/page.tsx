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

  const statsSection0 = sections.find(
    (s: any) => s.sectionType === "STATS" && s.order === 0
  );

  const statsSection1 = sections.find(
    (s: any) => s.sectionType === "STATS" && s.order === 1
  );

  const statsSection2 = sections.find(
    (s: any) => s.sectionType === "STATS" && s.order === 2
  );




  const ctaSection = sections.find(
    (s: any) => s.sectionType === "CTA"
  );

  const heroContent = heroSection?.content ?? {};
  const statsContent0 = statsSection0?.content ?? {};
  const statsContent1 = statsSection1?.content ?? {};
  const statsContent2 = statsSection2?.content ?? {};
  const ctaContent = ctaSection?.content ?? {};

  const companies: any[] = companiesRes?.data ?? [];


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




      <CompaniesHero
        content={heroContent}
        image={visibleImage(heroSection)}
      />

      {/* ==================================================
          PORTFOLIO OVERVIEW (dynamic, from CMS "STATS" section)
      ================================================== */}

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div



            className="mx-auto max-w-3xl text-center"
          >
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

        <section className="py-8">

          {/* Section Header */}

          <div className="text-center mb-3">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-1 w-6 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600"> {statsContent1.eyebrow ?? "Our Portfolio"}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">

              {statsContent1.title ?? "Explore Our Companies"}
            </h2> <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
              {statsContent1.description ?? "Learn what each company does, where it fits within the PCH ecosystem, and how to explore its services or website."}

            </p>
          </div>


          {/* ==================================================
              COMPANY GRID
          ================================================== */}

          {companies.length > 0 ? (

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company: any, idx: number) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  index={idx}
                />
              ))}
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
      </Container>

      {/* ==================================================
            CTA
        ================================================== */}

      <section className="pb-8 bg-[#173652]">

        <Container>

          <div className="px-6 py-16 text-center sm:px-12 sm:py-20">

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-400">
              {statsContent2.eyebrow ?? "Connected Capabilities"}
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {statsContent2.title ?? "Different Businesses. Shared Strengths"}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              {statsContent2.description ?? "The companies operate independently while benefiting from capabilities that can support launch, operations, customer acquisition, fulfillment, and long term growth."}
            </p>
          </div>


        </Container>
      </section>



    </main>
  );
}
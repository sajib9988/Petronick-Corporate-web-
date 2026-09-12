import CompanyCard from "@/components/admin/card/CompanyCard";
import { Container } from "@/components/Container";
import ClosingSection from "@/components/home-components/ClosingSection";
import EcosystemSection from "@/components/home-components/EcosystemSection";
import HeroSection from "@/components/home-components/hero-section";
import RevenueOpportunitySection from "@/components/home-components/RevenueOpportunitySection";
import WhoWeAreSection from "@/components/home-components/who-we-are-section";
import Reveal from "@/components/ui/motion/Reveal";

import { Company } from "@/lib/type";
import { getPageBySlug } from "@/service/cms";
import { getAllCompanies } from "@/service/company";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PageSection = {
  sectionType: string;
  image?: string | null;
  imageVisible?: boolean;
  content?: Record<string, string> | null;
};

// Image is only shown on the frontend when the admin's "Image Visibility"
// toggle is on — the upload itself is preserved either way.
function visibleImage(section?: PageSection) {
  if (!section?.image) return null;
  return section.imageVisible === false ? null : section.image;
}

export default async function HomePage() {
  const [pageRes, allCompanies] = await Promise.all([
    getPageBySlug("home-page"),
    getAllCompanies({ isVisible: true, limit: 100 }),
  ]);

  const homePage = pageRes.data;
  const sections: PageSection[] = homePage?.sections ?? [];
  const heroSection = sections.find((s) => s.sectionType === "HERO");
  const whoWeAreSection = sections.find((s) => s.sectionType === "WHO_WE_ARE");
  const ecosystemSection = sections.find((s) => s.sectionType === "ECOSYSTEM");
  const revenueSection = sections.find((s) => s.sectionType === "REVENUE");
  const closingSection = sections.find((s) => s.sectionType === "CLOSING");

  const companies: Company[] = allCompanies.data || [];

  const heroContent = heroSection?.content ?? {};
  const trustItems = [
    {
      value: heroContent.stat1Value?.trim() || String(companies.length),
      label: heroContent.stat1Label?.trim() || "Core Business Units",
    },
    {
      value: heroContent.stat2Value?.trim() || "1",
      label: heroContent.stat2Label?.trim() || "Connected Ecosystem",
    },
    {
      value: heroContent.stat3Value?.trim() || "B2B • B2C",
      label: heroContent.stat3Label?.trim() || "Market Reach",
    },
    {
      value: heroContent.stat4Value?.trim() || "Multi Sector",
      label: heroContent.stat4Label?.trim() || "Portfolio Model",
    },
  ];

  return (
    <main>
      <HeroSection
        image={visibleImage(heroSection) || "/placeholder-hero.jpg"}
        content={heroContent}
        trustItems={trustItems}
      />

      {/* ── Section 2: Who We Are ── */}
      {/* pt-28 on mobile clears the 2-row trust bar (translate-y-1/2 in HeroSection);
          sm:pt-24 clears the single-row desktop trust bar (translate-y-[75%]). */}
      <section className="pt-28 pb-8 sm:pt-24 sm:pb-10">
        <Container>
      <Reveal>

          <div className="rounded-3xl overflow-hidden">
            <WhoWeAreSection
              image={visibleImage(whoWeAreSection)}
              content={whoWeAreSection?.content ?? {}}
            />
          </div>

          </Reveal>
        </Container>
      </section>

      {/* ── Section 3: Our Ecosystem ── */}
      <section className="py-8 sm:py-6">
        <Container>
          <Reveal>
            <EcosystemSection
              companies={companies}
              content={ecosystemSection?.content ?? undefined}
            />
          </Reveal>
        </Container>
      </section>

      {/* ── Section 4: Companies Preview Grid ── */}

      <section className="py-8 sm:py-10">
        <Container>
          <div className="rounded-3xl border border-amber-200 bg-gray-900 overflow-visible px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {companies.map((company, index) => (
                <CompanyCard key={company.id} company={company} index={index} />
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/companies"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-200 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                View all companies <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Section 5: Revenue Opportunity ── */}
      <section className="py-8 sm:py-10">
        <Container>
          <Reveal>
          <RevenueOpportunitySection
            image={visibleImage(revenueSection)}
            content={revenueSection?.content ?? {}}
          />
          </Reveal>
        </Container>
      </section>

      {/* ── Section 6: Closing Authority ── */}
      <section className="py-8 sm:py-10">
        <Container>
          <Reveal>
            <ClosingSection
              image={visibleImage(closingSection)}
              content={closingSection?.content ?? {}}
            />
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
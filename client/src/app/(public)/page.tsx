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

export default async function HomePage() {
  const [pageRes, allCompanies] = await Promise.all([
    getPageBySlug("home-page"),
    getAllCompanies({ isVisible: true }),
  ]);

  const homePage = pageRes.data;
  const heroSection = homePage?.sections?.find((s: any) => s.sectionType === "HERO");
  const whoWeAreSection = homePage?.sections?.find((s: any) => s.sectionType === "WHO_WE_ARE");
  const revenueSection = homePage?.sections?.find((s: any) => s.sectionType === "REVENUE");
  const closingSection = homePage?.sections?.find((s: any) => s.sectionType === "CLOSING");

  const companies: Company[] = allCompanies.data || [];

  return (
    <main>
      <HeroSection
        image={heroSection?.image || "/placeholder-hero.jpg"}
        content={heroSection?.content ?? {}}
      />

      {/* ── Section 2: Who We Are ── */}
      <section className="py-8 sm:py-10">
        <Container>
      <Reveal>

          <div className="rounded-3xl overflow-hidden">
            <WhoWeAreSection
              image={whoWeAreSection?.image}
              content={whoWeAreSection?.content ?? {}}
            />
          </div>

          </Reveal>
        </Container>
      </section>

      {/* ── Section 3: Our Ecosystem ── */}
      <section className="py-8 sm:py-10">
        <Container>
          <Reveal>
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
            <EcosystemSection companies={companies} />
          </div>
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
            image={revenueSection?.image}
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
              image={closingSection?.image}
              content={closingSection?.content ?? {}}
            />
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
import CompanyCard from "@/components/admin/card/CompanyCard";
import { Container } from "@/components/Container";
import ClosingSection from "@/components/home-components/ClosingSection";
import EcosystemSection from "@/components/home-components/EcosystemSection";
import HeroSection from "@/components/home-components/hero-section";
import RevenueOpportunitySection from "@/components/home-components/RevenueOpportunitySection";
import WhoWeAreSection from "@/components/home-components/who-we-are-section";

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
          <div className="rounded-3xl overflow-hidden">
            <WhoWeAreSection
              image={whoWeAreSection?.image}
              content={whoWeAreSection?.content ?? {}}
            />
          </div>
        </Container>
      </section>

      {/* ── Section 3: Our Ecosystem ── */}
      <section className="py-8 sm:py-10">
        <Container>
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
            <EcosystemSection companies={companies} />
          </div>
        </Container>
      </section>

      {/* ── Section 4: Companies Preview Grid ── */}
      <section className="py-8 sm:py-10">
        <Container>
       <div className="rounded-[28px] border border-slate-200 bg-slate-50 overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company, index) => (
                <div key={company.id}>
                  <CompanyCard company={company} index={index} />
                </div>
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/companies"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
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
          <RevenueOpportunitySection
            image={revenueSection?.image}
            content={revenueSection?.content ?? {}}
          />
        </Container>
      </section>

      {/* ── Section 6: Closing Authority ── */}
      <section className="py-8 sm:py-10">
        <Container>
          <ClosingSection
            image={closingSection?.image}
            content={closingSection?.content ?? {}}
          />
        </Container>
      </section>
    </main>
  );
}
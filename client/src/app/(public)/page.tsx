import CompanyCard from "@/components/admin/card/CompanyCard";
import EcosystemSection from "@/components/home-components/EcosystemSection";
import HeroSection from "@/components/home-components/hero-section";
import WhoWeAreSection from "@/components/home-components/who-we-are-section";
import { Company, ICreatepage } from "@/lib/type";
import { getAllPages, getPageBySlug } from "@/service/cms";
import { getAllCompanies } from "@/service/company";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";



export const dynamic = 'force-dynamic';






const stageColors: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Launching: "bg-blue-50 text-blue-700",
  "Pre-launch": "bg-amber-50 text-amber-700",
  "Re-launching": "bg-purple-50 text-purple-700",
};

// ─── Ecosystem flow data ─────────────────────────────────
const ecosystemFlow = [
  { name: "Fusion DigiWeb", role: "Drives product launches & digital growth", color: "border-blue-200 bg-blue-50", dot: "bg-blue-500" },
  { name: "Treaded Brands", role: "Creates branded consumer products", color: "border-purple-200 bg-purple-50", dot: "bg-purple-500" },
  { name: "Petron Fulfillment", role: "Handles logistics & packaging", color: "border-orange-200 bg-orange-50", dot: "bg-orange-500" },
  { name: "Germ Shooters / Solutions", role: "Manages product distribution", color: "border-teal-200 bg-teal-50", dot: "bg-teal-500" },
  { name: "Celebrations Are Sweet", role: "Expands B2B & B2C markets", color: "border-pink-200 bg-pink-50", dot: "bg-pink-500" },
  { name: "Profit Pioneers", role: "Advises businesses across growth stages", color: "border-indigo-200 bg-indigo-50", dot: "bg-indigo-500" },
];

export default async function HomePage() {

  

const pageRes = await getPageBySlug("home-page"); // ✅ direct call
  const homePage = pageRes.data;
  const heroSection = homePage?.sections?.find(
    (s: any) => s.sectionType === "HERO"
  );

// console.log('hero section:', heroSection);



   const  allCompanies = await getAllCompanies({ isVisible: true });
   const  companies: Company[] = allCompanies.data || [];
   console.log('companies from public page:', companies);  




  return (
    <main>
      {/* ── Section 1: Hero ── */}
      <HeroSection
        image={heroSection?.image || "/placeholder-hero.jpg"}
        content={heroSection?.content ?? {}}
 
        
       />

      {/* ── Section 2: Who We Are ── */}

      <WhoWeAreSection></WhoWeAreSection>



{/* ── Section 3: Our Ecosystem ── */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-950 rounded-2xl overflow-hidden">
    <EcosystemSection companies={companies} />
  </div>
</section>

      {/* ── Section 4: Companies Preview Grid ── */}
<section className="bg-white   py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map((company, index) => (
        <div
          key={company.id}
          className=""
        >
          <CompanyCard
            company={company}
            index={index}
          />
        </div>
      ))}
    </div>

    <div className="mt-6 text-center sm:hidden border-4 border-pink-500">
      <Link
        href="/companies"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
      >
        View all companies <ArrowRight size={13} />
      </Link>
    </div>

  </div>
</section>

      {/* ── Section 5: Revenue Opportunity ── */}
 <section className="bg-gray-900 max-w-7xl mx-auto text-white py-16 rounded-full border-t-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Partner With Us
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Revenue Opportunity Awaits
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Qualified Promotion Agents can represent one or multiple Petronick
            business units depending on their experience and focus area. Join
            our growing ecosystem and earn across multiple channels.
          </p>
          <Link
            href="/promotion-agent"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Apply as a Promotion Agent <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Section 6: Closing Authority ── */}
    <section className="max-w-7xl mx-auto rounded-full py-14">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-6 flex-wrap justify-center mb-8">
            {[
              { label: "Scalable Infrastructure", color: "text-blue-600" },
              { label: "Multiple Revenue Channels", color: "text-emerald-600" },
              { label: "Strategic Ownership Model", color: "text-purple-600" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-6">
                <span className={`text-sm font-semibold ${item.color}`}>{item.label}</span>
                {i < 2 && <span className="w-1 h-1 rounded-full bg-gray-200" />}
              </div>
            ))}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Built to Scale. Designed to Win.
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto mb-7">
            Petronick Corporate Holdings is positioned to grow rapidly across
            multiple markets with infrastructure already in place.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-gray-900 text-gray-900 font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
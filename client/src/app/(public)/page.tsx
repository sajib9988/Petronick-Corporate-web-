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

  
const [pageRes, allCompanies] = await Promise.all([
  getPageBySlug("home-page"),
  getAllCompanies({ isVisible: true }),
]);

const homePage = pageRes.data;  

const heroSection = homePage?.sections?.find(
  (s: any) => s.sectionType === "HERO"
);

const companies: Company[] = allCompanies.data || [];





  return (
    <main>
      {/* ── Section 1: Hero ── */}
      <HeroSection
        image={heroSection?.image || "/placeholder-hero.jpg"}
        content={heroSection?.content ?? {}}
 
        
       />

      {/* ── Section 2: Who We Are ── */}
      <div className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden">
            <WhoWeAreSection />
          </div>
        </div>
      </div>

      {/* ── Section 3: Our Ecosystem ── */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
            <EcosystemSection companies={companies} />
          </div>
        </div>
      </section>

      {/* ── Section 4: Companies Preview Grid ── */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" rounded-3xl border border-green-600 overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
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
        </div>
      </section>

    // AFTER
      {/* ── Section 5: Revenue Opportunity ── */}
      <section className="relative overflow-hidden max-w-7xl mx-auto bg-gray-900 text-white py-20 rounded-3xl">
        {/* Grid pattern texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Dual amber glow */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
            Partner With Us
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Revenue Opportunity Awaits
          </h2>
          <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Qualified Promotion Agents can represent one or multiple Petronick
            business units depending on their experience and focus area. Join
            our growing ecosystem and earn across multiple channels.
          </p>
          <Link
            href="/promotion-agent"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold text-sm px-7 py-3 rounded-lg shadow-lg shadow-amber-900/30 hover:shadow-amber-700/40 hover:scale-[1.03] transition-all"
          >
            Apply as a Promotion Agent <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Section 6: Closing Authority ── */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden py-16 px-4 sm:px-6 lg:px-8 text-center">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

            <div className="inline-flex items-center gap-3 flex-wrap justify-center mb-8">
              {[
                "Scalable Infrastructure",
                "Multiple Revenue Channels",
                "Strategic Ownership Model",
              ].map((label) => (
                <span
                  key={label}
                  className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
                >
                  {label}
                </span>
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold text-sm px-6 py-2.5 rounded-lg shadow-md shadow-amber-900/10 hover:shadow-amber-700/20 hover:scale-[1.03] transition-all"
            >
              Get in Touch <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
   
   
   
    </main>
  );
}
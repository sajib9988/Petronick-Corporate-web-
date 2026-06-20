import { getAllCompanies } from "@/service/company";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const stageColors: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Launching: "bg-blue-50 text-blue-700 border border-blue-200",
  "Pre-launch":
    "bg-amber-50 text-amber-700 border border-amber-200",
  "Re-launching":
    "bg-purple-50 text-purple-700 border border-purple-200",
};

// Fallback static data
const fallbackCompanies = [
  {
    id: "1",
    name: "Fusion DigiWeb",
    description:
      "Full-service digital marketing and rapid market launch agency. We specialize in taking products from concept to revenue-generating reality — building websites, running campaigns, and managing e-commerce operations for clients at scale.",
    logo: null,
    initial: "FD",
    color: "bg-blue-600",
    website: null,
    revenueStage: "Active",
    isVisible: true,
  },
  {
    id: "2",
    name: "Germ Solutions Shop",
    description:
      "Joint venture sanitation supply company with a marketing-led revenue structure. Our partner handles procurement, sales, and shipping — we handle growth. A lean, efficient model designed for consistent revenue.",
    logo: null,
    initial: "GS",
    color: "bg-emerald-600",
    website: null,
    revenueStage: "Active",
    isVisible: true,
  },
  {
    id: "3",
    name: "Germ Shooters Co",
    description:
      "Independent branded e-commerce channel with full profit capture. Mirroring the Germ Solutions product line, this unit markets directly to consumers and captures 100% of profits through strategic online distribution.",
    logo: null,
    initial: "GC",
    color: "bg-teal-600",
    website: "https://germshooters.com",
    revenueStage: "Active",
    isVisible: true,
  },
  {
    id: "4",
    name: "Petron Fulfillment",
    description:
      "Regional fulfillment and packaging infrastructure operation serving the Pittsburgh area. Hand-packaged with care, this unit provides the logistical backbone for Petronick subsidiaries and third-party clients.",
    logo: null,
    initial: "PF",
    color: "bg-orange-600",
    website: null,
    revenueStage: "Launching",
    isVisible: true,
  },
  {
    id: "5",
    name: "Treaded Brands",
    description:
      "Graphic-driven apparel and lifestyle brand with 3D product integration. Built around bold, original designs — farm animal graphics with attitude — paired with 3D printed accessories and a pay-when-sold fulfillment model.",
    logo: null,
    initial: "TB",
    color: "bg-purple-600",
    website: null,
    revenueStage: "Pre-launch",
    isVisible: true,
  },
  {
    id: "6",
    name: "Celebrations Are Sweet LLC",
    description:
      "Specialty dessert brand with a scalable B2B and B2C distribution model. Previously supplying hundreds of cakes monthly to Nevada casinos, this brand is relaunching to target casinos, events, and direct consumers nationwide.",
    logo: null,
    initial: "CA",
    color: "bg-pink-600",
    website: null,
    revenueStage: "Re-launching",
    isVisible: true,
  },
  {
    id: "7",
    name: "Profit Pioneers",
    description:
      "Small business advisory firm focused on marketing, profitability, management, and technology. We help businesses identify revenue gaps, sharpen operations, and implement systems that drive measurable growth.",
    logo: null,
    initial: "PP",
    color: "bg-indigo-600",
    website: null,
    revenueStage: "Active",
    isVisible: true,
  },
];

export default async function CompaniesPage() {
  let apiCompanies: any[] = [];

  try {
    const result = await getAllCompanies({
      isVisible: true,
      limit: 50,
    });

    apiCompanies = result?.data ?? [];
  } catch {
    apiCompanies = [];
  }

  const companies =
    apiCompanies.length > 0 ? apiCompanies : fallbackCompanies;

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gray-950 text-white">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400 mb-4">
            Portfolio Overview
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Companies
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Petronick Corporate Holdings operates multiple specialized business
            units — each designed to generate revenue independently while
            contributing to a larger, collaborative ecosystem.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-3 divide-x divide-gray-200">
          {[
            { value: "7+", label: "Business Units" },
            { value: "100%", label: "Revenue Ready" },
            { value: "Multi", label: "Market Reach" },
          ].map((s) => (
            <div
              key={s.label}
              className="px-6 text-center first:pl-0 last:pr-0"
            >
              <div className="text-2xl font-bold text-gray-900">
                {s.value}
              </div>

              <div className="text-xs text-gray-500 mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Companies Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company: any) => {
            const initial =
              company.initial ??
              company.name
                .split(" ")
                .map((w: string) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

            const color = company.color ?? "bg-gray-700";

            return (
              <div
                key={company.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col"
              >
                {/* Card Top */}
                <div className="p-6 pb-4 flex items-start gap-4">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    {company.logo ? (
                      <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-contain p-1.5"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-lg">
                          {initial}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name + Stage */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-900 text-base leading-snug">
                      {company.name}
                    </h2>

                    {company.revenueStage && (
                      <span
                        className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          stageColors[company.revenueStage] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {company.revenueStage}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="px-6 pb-5 flex-1">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {company.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50">
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors group"
                    >
                      Visit Website

                      <ExternalLink
                        size={13}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      Website coming soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16 px-4 mx-4 mb-16 rounded-2xl max-w-5xl lg:mx-auto">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Partnership Opportunity
          </p>

          <h2 className="text-2xl font-bold mb-4">
            Represent Our Business Units
          </h2>

          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Qualified Promotion Agents can represent one or multiple Petronick
            business units depending on their experience and focus area.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/promotion-agent"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply as Promotion Agent
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
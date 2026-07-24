import { getAllCompanies } from "@/service/company";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const stageColors: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Launching: "bg-blue-50 text-blue-700 border border-blue-200",
  "Pre-launch": "bg-amber-50 text-amber-700 border border-amber-200",
  "Re-launching": "bg-purple-50 text-purple-700 border border-purple-200",
};

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

  const companies = apiCompanies;

  return (
    <main className="bg-sky-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gray-950 text-white">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400 mb-4">
            PORTFOLIO OVERVIEW
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
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 divide-x divide-gray-200">
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

      {/* Companies Grid - Improved Design with max-w-7xl */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden 
                           hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 
                           transition-all duration-300 flex flex-col h-full"
              >
                {/* Card Header */}
                <div className="p-8 pb-5 flex items-start gap-5">
                  <div className="flex-shrink-0">
                    {company.logo ? (
                      <div className="w-16 h-16 rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden shadow-sm">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center shadow-sm`}
                      >
                        <span className="text-white font-bold text-2xl">
                          {initial}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <h2 className="font-bold text-gray-900 text-[17px] leading-tight tracking-tight">
                      {company.name}
                    </h2>
                    {company.revenueStage && (
                      <span
                        className={`inline-block mt-2 text-[10px] font-semibold px-3 py-1 rounded-full 
                          ${stageColors[company.revenueStage] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {company.revenueStage}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="px-8 pb-8 flex-1">
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    {company.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto px-8 py-6 border-t border-gray-100 bg-gray-50/70">
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 
                                 hover:text-emerald-600 group-hover:text-emerald-600 transition-colors"
                    >
                      Visit Website
                      <ExternalLink
                        size={15}
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

      {/* Partnership CTA - Aligned with Navbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900 text-white py-16 px-8 md:px-16 rounded-3xl">
          <div className="text-center">
            <p className="text-base font-semibold tracking-widest text-emerald-400 uppercase mb-3">
              PARTNERSHIP OPPORTUNITY
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Represent Our Business Units
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Qualified Promotion Agents can represent one or multiple Petronick
              business units depending on their experience and focus area.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/promotion-agent"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Apply as Promotion Agent
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
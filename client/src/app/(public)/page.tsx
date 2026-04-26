import HeroSection from "@/components/home-components/hero-section";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";

// ─── Static company data (পরে API replace করবে) ─────────
const companies = [
  {
    name: "Fusion DigiWeb",
    description: "Full-service digital marketing and rapid market launch agency.",
    initial: "FD",
    color: "bg-blue-600",
    revenueStage: "Active",
    website: null,
  },
  {
    name: "Germ Solutions Shop",
    description: "Joint venture sanitation supply company with marketing-led revenue structure.",
    initial: "GS",
    color: "bg-emerald-600",
    revenueStage: "Active",
    website: null,
  },
  {
    name: "Germ Shooters Co",
    description: "Independent branded e-commerce channel with full profit capture.",
    initial: "GC",
    color: "bg-teal-600",
    revenueStage: "Active",
    website: "https://germshooters.com",
  },
  {
    name: "Petron Fulfillment",
    description: "Regional fulfillment and packaging infrastructure operation.",
    initial: "PF",
    color: "bg-orange-600",
    revenueStage: "Launching",
    website: null,
  },
  {
    name: "Treaded Brands",
    description: "Graphic-driven apparel and lifestyle brand with 3D product integration.",
    initial: "TB",
    color: "bg-purple-600",
    revenueStage: "Pre-launch",
    website: null,
  },
  {
    name: "Celebrations Are Sweet",
    description: "Specialty dessert brand with scalable B2B and B2C distribution.",
    initial: "CA",
    color: "bg-pink-600",
    revenueStage: "Re-launching",
    website: null,
  },
  {
    name: "Profit Pioneers",
    description: "Small business advisory focused on marketing, profitability, and technology.",
    initial: "PP",
    color: "bg-indigo-600",
    revenueStage: "Active",
    website: null,
  },
];

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

export default function HomePage() {
  return (
    <main>
      {/* ── Section 1: Hero ── */}
      <HeroSection />

      {/* ── Section 2: Who We Are ── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
              Who We Are
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 leading-snug">
              One Platform. Multiple Revenue Streams.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Petronick Corporate Holdings LLC owns and operates multiple
              business units designed to work together — accelerating market
              entry, scaling operations, and maximizing profitability across
              every subsidiary.
            </p>
            <ul className="space-y-2.5">
              {[
                "Digital product launch capability",
                "Procurement and logistics leverage",
                "Fulfillment infrastructure",
                "Advisory expertise",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: visual block */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "7+", label: "Business Units", bg: "bg-gray-900 text-white" },
              { value: "100%", label: "Revenue Ready", bg: "bg-emerald-50 text-gray-900" },
              { value: "Multi", label: "Market Reach", bg: "bg-blue-50 text-gray-900" },
              { value: "1", label: "Ecosystem", bg: "bg-amber-50 text-gray-900" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl p-5 ${s.bg}`}>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs mt-1 opacity-60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Our Ecosystem ── */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
              Integrated Capability
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Our Ecosystem
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Each company plays a distinct role — together they form a
              self-reinforcing revenue engine.
            </p>
          </div>

          {/* Flow grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecosystemFlow.map((item, i) => (
              <div
                key={item.name}
                className={`rounded-xl border p-5 ${item.color} relative`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Companies Preview Grid ── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                Portfolio
              </p>
              <h2 className="text-2xl font-bold text-gray-900">Our Companies</h2>
            </div>
            <Link
              href="/companies"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((company) => (
              <div
                key={company.name}
                className="border border-gray-100 rounded-xl p-5 hover:shadow-sm hover:border-gray-200 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg ${company.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-xs">{company.initial}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{company.name}</h3>
                    {company.revenueStage && (
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${stageColors[company.revenueStage] ?? ""}`}>
                        {company.revenueStage}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {company.description}
                </p>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Visit Website <ExternalLink size={10} />
                  </a>
                ) : (
                  <Link
                    href="/companies"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    Learn more <ArrowRight size={10} />
                  </Link>
                )}
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
      </section>

      {/* ── Section 5: Revenue Opportunity ── */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
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
      <section className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
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
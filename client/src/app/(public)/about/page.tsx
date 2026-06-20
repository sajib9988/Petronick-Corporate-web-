import { ArrowRight, Building2, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const pillars = [
    {
      icon: <TrendingUp size={20} className="text-blue-600" />,
      bg: "bg-blue-50",
      title: "Digital Product Launch",
      desc: "Rapid go-to-market capability through Fusion DigiWeb — from concept to revenue-generating product.",
    },
    {
      icon: <Building2 size={20} className="text-emerald-600" />,
      bg: "bg-emerald-50",
      title: "Procurement & Logistics",
      desc: "Petron Fulfillment provides regional packaging and logistics infrastructure to support all subsidiaries.",
    },
    {
      icon: <Users size={20} className="text-purple-600" />,
      bg: "bg-purple-50",
      title: "Advisory Expertise",
      desc: "Profit Pioneers delivers targeted small business advisory across marketing, management, and technology.",
    },
    {
      icon: <Target size={20} className="text-amber-600" />,
      bg: "bg-amber-50",
      title: "B2B & B2C Distribution",
      desc: "Celebrations Are Sweet and Germ Solutions serve multiple market segments through diversified channels.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Petronick Corporate Holdings LLC
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-5 leading-tight">
            About Petronick
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A vertically integrated holding company built to own, operate, and
            scale multiple revenue-generating business units under one strategic roof.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
            Our Mission
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 leading-snug">
            Building and Scaling Revenue-Driven Businesses
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Petronick Corporate Holdings LLC owns and operates multiple business
            units specifically designed to work together — accelerating market
            entry, scaling operations, and maximizing profitability across every
            subsidiary.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Our ecosystem model means every company benefits from shared
            infrastructure, procurement leverage, digital marketing capability,
            and fulfillment infrastructure — giving each unit a competitive
            advantage from day one.
          </p>
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b-2 border-gray-900 pb-0.5 hover:gap-3 transition-all"
          >
            Explore Our Companies <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "7+", label: "Active Business Units", color: "bg-gray-900 text-white" },
            { value: "100%", label: "Revenue Ready", color: "bg-emerald-50 text-gray-900" },
            { value: "Multi", label: "Market Reach", color: "bg-blue-50 text-gray-900" },
            { value: "1", label: "Integrated Ecosystem", color: "bg-amber-50 text-gray-900" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl p-6 flex flex-col justify-between min-h-[120px] ${stat.color}`}
            >
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-xs font-medium opacity-70 mt-2">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
              What We Bring
            </p>
            <h2 className="text-2xl font-bold text-gray-900">Strategic Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-sm transition-shadow"
              >
                <div className={`p-2.5 rounded-xl ${p.bg} w-fit mb-4`}>{p.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Partner With Us?
        </h2>
        <p className="text-gray-500 text-sm mb-7 max-w-lg mx-auto">
          Qualified Promotion Agents can represent one or multiple Petronick
          business units. Join our growing ecosystem today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/promotion-agent"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Apply as Promotion Agent <ArrowRight size={14} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
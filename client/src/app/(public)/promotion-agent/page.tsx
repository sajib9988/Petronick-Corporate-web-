import PromotionAgentForm from "@/components/admin/form/Promotion-form";
import { CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";

export default function PromotionAgentPage() {
  const perks = [
    {
      icon: <TrendingUp size={18} className="text-emerald-600" />,
      title: "Multiple Revenue Streams",
      desc: "Represent one or multiple business units based on your expertise.",
      bg: "bg-emerald-50",
    },
    {
      icon: <Users size={18} className="text-blue-600" />,
      title: "Ecosystem Access",
      desc: "Gain access to our vertically integrated network of companies.",
      bg: "bg-blue-50",
    },
    {
      icon: <Zap size={18} className="text-amber-600" />,
      title: "Revenue Ready",
      desc: "Our subsidiaries are operational and ready to generate income.",
      bg: "bg-amber-50",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Partnership Opportunity
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Become a Promotion Agent
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Qualified Promotion Agents can represent one or multiple Petronick
            business units depending on experience and focus area.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {perks.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
            >
              <div className={`p-2.5 rounded-xl ${p.bg} w-fit mb-3`}>{p.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: What to expect */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">What Happens Next</h3>
              <ul className="space-y-3">
                {[
                  "Submit your application below",
                  "Our team reviews your profile",
                  "We reach out within 5 business days",
                  "Onboarding to your selected business units",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs text-gray-600 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <CheckCircle2 size={18} className="text-emerald-600 mb-2" />
              <p className="text-xs font-semibold text-emerald-800 mb-1">No upfront cost</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Becoming a Promotion Agent requires no financial commitment from your side.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Apply Now</h2>
            <p className="text-sm text-gray-400 mb-6">
              Tell us about yourself and which business units interest you most.
            </p>
            <PromotionAgentForm />
          </div>
        </div>
      </section>
    </main>
  );
}
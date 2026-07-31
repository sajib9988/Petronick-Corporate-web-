import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RevenueOpportunityContent {
  label?: string;        // ← নতুন
  headline?: string;
  paragraph?: string;
  btnText?: string;
  btnLink?: string;
}

interface RevenueOpportunitySectionProps {
  image?: string | null;
  content?: RevenueOpportunityContent;
}

export default function RevenueOpportunitySection({ image, content }: RevenueOpportunitySectionProps) {
  const label = content?.label || "Partner With Us";        // ← dynamic
  const headline = content?.headline || "Revenue Opportunity Awaits";
  const paragraph =
    content?.paragraph ||
    "Qualified Promotion Agents can represent one or multiple Petronick business units depending on their experience and focus area. Join our growing ecosystem and earn across multiple channels.";
  const btnText = content?.btnText || "Apply as a Promotion Agent";
  const btnLink = content?.btnLink || "/promotion-agent";

  return (
    <div className="relative overflow-hidden bg-gray-900 text-white py-20 rounded-3xl">
      {image ? (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
          <div className="absolute inset-0 bg-gray-950/80" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />
        </>
      )}

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge Label — এখন dynamic */}
        <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
          {label}
        </p>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{headline}</h2>
        <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
        <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">{paragraph}</p>
        <Link
          href={btnLink}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold text-sm px-7 py-3 rounded-lg shadow-lg shadow-amber-900/30 hover:shadow-amber-700/40 hover:scale-[1.03] transition-all"
        >
          {btnText} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
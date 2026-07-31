import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ClosingContent {
  headline?: string;
  paragraph?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface ClosingSectionProps {
  image?: string | null;
  content?: ClosingContent;
}

const badges = ["Scalable Infrastructure", "Multiple Revenue Channels", "Strategic Ownership Model"];

export default function ClosingSection({ image, content }: ClosingSectionProps) {
  const headline = content?.headline || "Built to Scale. Designed to Win.";
  const paragraph =
    content?.paragraph ||
    "Petronick Corporate Holdings is positioned to grow rapidly across multiple markets with infrastructure already in place.";
  const ctaText = content?.ctaText || "Get in Touch";
  const ctaLink = content?.ctaLink || "/contact";

  return (
    <div className="relative bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden py-16 px-4 sm:px-6 lg:px-8 text-center">
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="relative">
        <div className="inline-flex items-center gap-3 flex-wrap justify-center mb-8">
          {badges.map((label) => (
            <span key={label} className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {label}
            </span>
          ))}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{headline}</h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto mb-7">{paragraph}</p>
        <Link
          href={ctaLink}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold text-sm px-6 py-2.5 rounded-lg shadow-md shadow-amber-900/10 hover:shadow-amber-700/20 hover:scale-[1.03] transition-all"
        >
          {ctaText} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EcosystemFlow from "./EcosystemFlow";

type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
  icon: string | null;
  website: string | null;
  revenueStage: string | null;
  order: number;
  isVisible: boolean;
};

interface EcosystemSectionProps {
  companies: Company[];
  content?: {
    label?: string;
    title?: string;
    description?: string;
    btnText?: string;
    btnLink?: string;
  };
}

export default function EcosystemSection({ companies, content }: EcosystemSectionProps) {
  if (companies.length === 0) return null;

  const label = content?.label ?? "About the Holding Company";
  const title = content?.title ?? "A Connected Business Ecosystem";
  const description =
    content?.description ??
    "Each company brings distinct capability to the portfolio. Together, they create opportunities to launch, market, fulfill, advise, and scale products and services across multiple sectors.";
  const btnText = content?.btnText ?? "Explore All Companies";
  const btnLink = content?.btnLink ?? "/companies";

  return (
    <section className="py-12 lg:py-16">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-amber-500 uppercase mb-3">
          {label}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-slate-500 text-[15px] sm:text-base leading-7 mb-6">
          {description}
        </p>
        <Link
          href={btnLink}
          className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-lg px-5 py-3 text-sm font-semibold hover:bg-slate-800 transition-all"
        >
          {btnText}
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Diagram — full width */}
      <div className="mt-10 lg:mt-6">
        <EcosystemFlow companies={companies} />
      </div>
    </section>
  );
}
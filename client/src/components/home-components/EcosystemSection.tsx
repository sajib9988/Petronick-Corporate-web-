"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EcosystemFlow = dynamic(() => import("./EcosystemFlow"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[440px] sm:h-[560px] bg-slate-50 rounded-2xl border border-slate-100 animate-pulse" />
  ),
});

type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Text */}
        <div className="lg:col-span-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-amber-500 uppercase mb-3">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-slate-500 text-base leading-7 mb-8">
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

        {/* Right: Diagram */}
        <div className="lg:col-span-8">
          <EcosystemFlow companies={companies} />
        </div>
      </div>
    </section>
  );
}
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

export default function EcosystemSection({
  companies,
  content,
}: EcosystemSectionProps) {
  if (companies.length === 0) return null;

  const label =
    content?.label ??
    "About the Holding Company";

  const title =
    content?.title ??
    "A Connected Business Ecosystem";

  const description =
    content?.description ??
    "Each company brings distinct capability to the portfolio. Together, they create opportunities to launch, market, fulfill, advise, and scale products and services across multiple sectors.";

  const btnText =
    content?.btnText ??
    "Explore All Companies";

  const btnLink =
    content?.btnLink ??
    "/companies";

  return (
    <section>
      <div
        className="
          grid
          grid-cols-1
          gap-10
          rounded-3xl
         
          lg:grid-cols-12
          lg:items-stretch
          lg:gap-6
          xl:gap-8
        "
      >
        {/* ================================================================ */}
        {/* LEFT CONTENT                                                      */}
        {/* ================================================================ */}

        <div className="flex flex-col justify-center lg:col-span-4">
          <p
            className="
              mb-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              text-amber-500
              sm:text-base
            "
          >
            {label}
          </p>

          <h2
            className="
              mb-6
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-slate-900
              md:text-4xl
            "
          >
            {title}
          </h2>

          <p
            className="
              mb-10
              text-base
              leading-8
              text-slate-500
              sm:text-lg
            "
          >
            {description}
          </p>

          <Link
            href={btnLink}
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-lg
              bg-slate-900
              px-6
              py-3.5
              text-base
              font-semibold
              text-white
              transition-all
              hover:bg-slate-800
            "
          >
            {btnText}

            <ArrowRight size={16} />
          </Link>
        </div>

        {/* ================================================================ */}
        {/* RIGHT: ECOSYSTEM FLOW                                             */}
        {/* ================================================================ */}

        <div
          className="
            min-w-0
            lg:col-span-8
          "
        >
          <EcosystemFlow companies={companies} />
        </div>
      </div>
    </section>
  );
}
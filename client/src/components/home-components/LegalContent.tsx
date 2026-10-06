import Link from "next/link";
import { FileText } from "lucide-react";
import { Container } from "@/components/Container";

type Content = Record<string, string | undefined>;

export interface LegalSectionItem {
  title: string;
  body: string;
}

interface Props {
  slugBase: "privacy" | "terms";
  heroContent?: Content;
  sections: LegalSectionItem[];
  ctaContent?: Content;
}

function Body({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={i} className="mt-3 list-disc space-y-2 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mt-3 first:mt-0 whitespace-pre-line">
            {block}
          </p>
        );
      })}
    </>
  );
}

export default function LegalContent({
  slugBase,
  heroContent = {},
  sections,
  ctaContent = {},
}: Props) {
  const isPrivacy = slugBase === "privacy";

  const badge = heroContent.badge?.trim() || "Legal";
  const title =
    heroContent.headline?.trim() || (isPrivacy ? "Privacy Policy" : "Terms of Use");
  const subtitle = heroContent.subheadline?.trim() || "";
  const lastUpdated = heroContent.lastUpdated?.trim() || "";

  const ctaTitle =
    ctaContent.title?.trim() ||
    (isPrivacy ? "Questions About This Privacy Policy?" : "Questions About These Terms?");
  const ctaDesc = ctaContent.description?.trim() || "";
  const ctaBtnText = ctaContent.btnText?.trim() || "Contact Us";
  const ctaBtnLink = ctaContent.btnLink?.trim() || "/contact";

  const links = [
    { label: "Privacy Policy", href: "/privacy", active: isPrivacy },
    { label: "Terms of Use", href: "/terms", active: !isPrivacy },
    { label: "Contact Us", href: "/contact", active: false },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-[#10243A] py-14 text-white sm:py-16">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B99346]">
            {badge}
          </p>
          <span className="mt-3 block h-[2px] w-10 bg-[#B99346]" />
          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#D8E0E8] sm:text-base">
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <p className="mt-4 text-xs text-[#D8E0E8]/70">Last updated: {lastUpdated}</p>
          )}
        </Container>
      </section>

      {/* BODY */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[250px_1fr] lg:gap-14">
            {/* TOC */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {/* mobile: collapsible */}
              <details className="rounded-xl border border-[#DEE5EC] bg-[#F5F7FA] p-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-bold text-[#10243A]">
                  Table of Contents
                </summary>
                <TocList sections={sections} />
              </details>

              {/* desktop: sticky card */}
              <div className="hidden rounded-xl border border-[#DEE5EC] bg-[#F5F7FA] p-5 lg:block">
                <p className="text-xs font-bold uppercase tracking-widest text-[#B99346]">
                  On this page
                </p>
                <TocList sections={sections} />
              </div>
            </aside>

            {/* CONTENT */}
            <div className="min-w-0 max-w-3xl">
              {sections.map((s, i) => (
                <article
                  key={i}
                  id={`section-${i + 1}`}
                  className="scroll-mt-28 border-b border-[#DEE5EC] pb-10 pt-10 first:pt-0 last:border-0"
                >
                  <h2 className="text-xl font-bold text-[#10243A] sm:text-2xl">
                    {i + 1}. {s.title}
                  </h2>
                  <div className="mt-4 text-sm leading-7 text-[#5D6B7A] sm:text-[15px]">
                    <Body text={s.body} />
                  </div>
                </article>
              ))}

              {/* CONTACT CALLOUT */}
              <div className="mt-12 rounded-2xl border border-[#DEE5EC] bg-[#F5F7FA] p-6 sm:p-8">
                <FileText size={22} className="text-[#B99346]" />
                <h3 className="mt-3 text-lg font-bold text-[#10243A]">{ctaTitle}</h3>
                {ctaDesc && (
                  <p className="mt-2 text-sm leading-6 text-[#5D6B7A]">{ctaDesc}</p>
                )}
                <Link
                  href={ctaBtnLink}
                  className="mt-5 inline-flex h-11 items-center rounded-md bg-[#B99346] px-6 text-sm font-semibold text-white transition hover:bg-[#A47E36]"
                >
                  {ctaBtnText}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* RELATED LEGAL LINKS */}
      <section className="border-t border-[#DEE5EC] bg-[#F5F7FA] py-5">
        <Container>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  l.active
                    ? "font-semibold text-[#B99346]"
                    : "text-[#173652] transition-colors hover:text-[#B99346]"
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </Container>
      </section>
    </main>
  );
}

function TocList({ sections }: { sections: LegalSectionItem[] }) {
  return (
    <ol className="mt-3 space-y-1">
      {sections.map((s, i) => (
        <li key={i}>
          <a
            href={`#section-${i + 1}`}
            className="block rounded-md px-2 py-2 text-[13px] leading-snug text-[#173652] transition-colors hover:bg-white hover:text-[#B99346]"
          >
            {i + 1}. {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
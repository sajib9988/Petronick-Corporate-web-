"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";

import ContactForm from "@/components/admin/form/contact-form";
import { Container } from "@/components/Container";
import Reveal from "@/components/ui/motion/Reveal";
import { fadeUp, fadeSlide, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Content = Record<string, string | undefined>;

interface ContactContentProps {
  heroImage?: string | null;
  heroContent?: Content;
  contactContent?: Content;
  pathwayHeader?: Content;
  pathway1?: Content;
  pathway2?: Content;
  ctaImage?: string | null;
  ctaContent?: Content;
}

// ─── helpers ────────────────────────────────────────────────

// CMS value → trimmed string, or fallback when empty
const val = (v: string | undefined, fallback: string) =>
  v?.trim() ? v.trim() : fallback;

// Anchor (#...) / mailto / external links use <a>, internal use <Link>
function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const plain =
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    /^https?:\/\//.test(href);

  if (plain) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// ─── hero decorative network (used when no hero image uploaded) ──

function NetworkGraphic() {
  const circles = [0, 70, 140, 210, 280, 350, 420];
  const dots: [number, number][] = [
    [95, 40], [180, 120], [140, 250], [300, 90], [260, 330],
    [380, 180], [430, 300], [520, 120], [560, 260], [640, 200],
    [700, 340], [330, 410], [610, 60], [480, 400],
  ];
  const lines: [number, number, number, number][] = [
    [95, 40, 380, 180], [180, 120, 140, 250], [140, 250, 330, 410],
    [300, 90, 520, 120], [380, 180, 560, 260], [560, 260, 700, 340],
    [260, 330, 480, 400], [520, 120, 640, 200], [430, 300, 610, 60],
  ];

  return (
    <svg
      viewBox="0 0 800 470"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {circles.map((x) => (
        <ellipse
          key={x}
          cx={200 + x}
          cy={235}
          rx={170}
          ry={170}
          stroke="#B8934A"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
      ))}
      {lines.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#8FA3BD"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
      ))}
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={3} fill="#B8934A" />
      ))}
    </svg>
  );
}

// ─── component ──────────────────────────────────────────────

export default function ContactContent({
  heroImage,
  heroContent = {},
  contactContent = {},
  pathwayHeader = {},
  pathway1 = {},
  pathway2 = {},
  ctaImage,
  ctaContent = {},
}: ContactContentProps) {
  // ── HERO ──
  const heroBadge = val(heroContent.badge, "Contact");
  const heroTitle = val(
    heroContent.headline,
    "Let’s Start a Conversation",
  );
  const heroSub = val(
    heroContent.subheadline,
    "Whether you have a business inquiry, partnership question, or want to learn more about the PCH ecosystem, our team is ready to connect.",
  );
  const heroPrimary = val(heroContent.primaryBtn, "Send a Message");
  const heroPrimaryLink = val(heroContent.primaryBtnLink, "#contact-form");
  const heroSecondary = val(heroContent.secondaryBtn, "Explore Our Companies");
  const heroSecondaryLink = val(heroContent.secondaryBtnLink, "/companies");

  // ── CONTACT (Get in touch) ──
  const badge = val(contactContent.badge, "Get in Touch");
  const title = val(
    contactContent.title,
    "Connect With Petronick Corporate Holdings",
  );
  const subtitle = val(
    contactContent.subtitle,
    "Send us a message and our team will route your inquiry to the appropriate person or business unit.",
  );

  const infoTitle = val(contactContent.infoTitle, "Company Information");
  const infoDescription = val(
    contactContent.infoDescription,
    "Corporate contact information should remain easy to scan and consistent across the website.",
  );

  const companyName = val(
    contactContent.aboutLabel,
    "Petronick Corporate Holdings LLC",
  );
  const companyDesc = val(
    contactContent.aboutDescription,
    "Parent company for the connected PCH business portfolio.",
  );
  const location = val(contactContent.location, "Pittsburgh, Pennsylvania, USA");
  const website = val(contactContent.website, "petronickholdings.com");
  const email = val(contactContent.email, "info@petronick.com");
  const phone = contactContent.phone?.trim() || ""; // hidden when empty

  const formTitle = val(contactContent.formTitle, "Send Us a Message");
  const formDescription = val(
    contactContent.formDescription,
    "Tell us how we can help. Please provide a few details and our team will follow up.",
  );
  const formNote = val(
    contactContent.formNote,
    "By submitting this form, you agree that Petronick Corporate Holdings LLC may use the information provided to respond to your inquiry.",
  );

  const infoRows: {
    key: string;
    label: string;
    value: string;
    icon?: LucideIcon;
    letter?: string;
    href?: string;
  }[] = [
    { key: "company", label: companyName, value: companyDesc, letter: "P" },
    { key: "hq", label: "Headquarters", value: location, icon: MapPin },
    {
      key: "web",
      label: "Website",
      value: website,
      icon: Globe,
      href: /^https?:\/\//.test(website) ? website : `https://${website}`,
    },
    {
      key: "email",
      label: "Corporate Email",
      value: email,
      icon: Mail,
      href: `mailto:${email}`,
    },
    ...(phone
      ? [
          {
            key: "phone",
            label: "Corporate Phone",
            value: phone,
            icon: Phone,
            href: `tel:${phone.replace(/[^\d+]/g, "")}`,
          },
        ]
      : []),
  ];

  // ── PATHWAYS ──
  const pathEyebrow = val(pathwayHeader.eyebrow, "Explore the Ecosystem");
  const pathTitle = val(pathwayHeader.title, "Looking for Something Specific?");
  const pathDesc = val(
    pathwayHeader.description,
    "Choose the pathway that best matches what you are looking for.",
  );

  const pathways = [
    {
      title: val(pathway1.title, "Our Companies"),
      description: val(
        pathway1.description,
        "Explore the businesses operating under Petronick Corporate Holdings LLC.",
      ),
      btnText: val(pathway1.btnText, "View Our Companies"),
      btnLink: val(pathway1.btnLink, "/companies"),
      badge: pathway1.icon?.trim() || "",
      Icon: Building2,
      btnClass: "bg-[#10283f] text-white hover:bg-[#16365f]",
    },
    {
      title: val(pathway2.title, "Promotion Agent Opportunity"),
      description: val(
        pathway2.description,
        "Interested in representing one or more companies within the PCH ecosystem?",
      ),
      btnText: val(pathway2.btnText, "Become a Promotion Agent"),
      btnLink: val(pathway2.btnLink, "/promotion-agent"),
      badge: pathway2.icon?.trim() || "",
      Icon: Users,
      btnClass: "bg-[#B8934A] text-white hover:bg-[#a5823f]",
    },
  ];

  // ── CTA ──
  const ctaEyebrow = val(ctaContent.eyebrow, "Connected for Long Term Growth");
  const ctaTitle = val(ctaContent.title, "Explore the PCH Ecosystem");
  const ctaDescription = val(
    ctaContent.description,
    "Discover our companies, capabilities, and opportunities across a connected portfolio built to support long term growth.",
  );
  const ctaBtnText = val(ctaContent.btnText, "View Our Companies");
  const ctaBtnLink = val(ctaContent.btnLink, "/companies");

  return (
    <main className="min-h-screen bg-white">
      {/* ======================================================
          1. HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#10283f] text-white">
        {heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${heroImage}")` }}
            />
            <div className="absolute inset-0 bg-[#10283f]/85" />
          </>
        ) : (
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] opacity-90 md:block">
            <NetworkGraphic />
          </div>
        )}

        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.12, 0.1)}
            className="relative z-10 flex min-h-[420px] flex-col justify-center py-16 sm:min-h-[500px] lg:min-h-[560px]"
          >
            <motion.p
              variants={fadeUp(0, 0.6)}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8934A]"
            >
              {heroBadge}
            </motion.p>

            <motion.h1
              variants={fadeUp(0.05, 0.8)}
              className="mt-6 max-w-3xl font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {heroTitle}
            </motion.h1>

            <motion.p
              variants={fadeUp(0.1, 0.8)}
              className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg"
            >
              {heroSub}
            </motion.p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <motion.div variants={fadeSlide("left", 0, 60, 0.8)}>
                <SmartLink
                  href={heroPrimaryLink}
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-[#B8934A] px-7 text-sm font-semibold text-white transition hover:bg-[#a5823f]"
                >
                  {heroPrimary}
                </SmartLink>
              </motion.div>

              <motion.div variants={fadeSlide("right", 0, 60, 0.8)}>
                <SmartLink
                  href={heroSecondaryLink}
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-md border border-[#B8934A] px-7 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  {heroSecondary}
                </SmartLink>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ======================================================
          2. GET IN TOUCH (company info + form)
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8934A]">
              {badge}
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-3xl font-bold leading-tight text-[#10283f] sm:text-4xl lg:text-[42px]">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              {subtitle}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            {/* LEFT — Company information */}
            <Reveal>
              <div className="rounded-2xl border border-slate-200 bg-[#F5F7FB] p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-bold text-[#10283f]">
                  {infoTitle}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  {infoDescription}
                </p>

                <ul className="mt-6 divide-y divide-slate-200">
                  {infoRows.map((row) => {
                    const Icon = row.icon;
                    const valueClass =
                      "mt-0.5 break-words text-sm leading-6 text-slate-500";
                    return (
                      <li
                        key={row.key}
                        className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#B8934A]">
                          {Icon ? (
                            <Icon size={18} />
                          ) : (
                            <span className="font-serif text-base font-bold">
                              {row.letter}
                            </span>
                          )}
                        </span>

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#10283f]">
                            {row.label}
                          </p>
                          {row.href ? (
                            <a
                              href={row.href}
                              target={
                                row.href.startsWith("http") ? "_blank" : undefined
                              }
                              rel="noopener noreferrer"
                              className={cn(
                                valueClass,
                                "block transition-colors hover:text-[#B8934A]",
                              )}
                            >
                              {row.value}
                            </a>
                          ) : (
                            <p className={valueClass}>{row.value}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* RIGHT — Form */}
            <Reveal delay={0.1}>
              <div
                id="contact-form"
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="font-serif text-2xl font-bold text-[#10283f]">
                  {formTitle}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {formDescription}
                </p>

                <div className="mt-8">
                  <ContactForm />
                </div>

             
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ======================================================
          3. LOOKING FOR SOMETHING SPECIFIC? (2 pathways)
      ====================================================== */}
      <section className="bg-[#F5F7FB] py-10 sm:py-16 lg:py-12">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8934A]">
                {pathEyebrow}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#10283f] sm:text-4xl lg:text-[42px]">
                {pathTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-500">
                {pathDesc}
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {pathways.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F7FB] text-[#B8934A]">
                      {p.badge ? (
                        <span className="font-serif text-lg font-bold">
                          {p.badge}
                        </span>
                      ) : (
                        <p.Icon size={20} />
                      )}
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-serif text-xl font-bold text-[#10283f]">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-500">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <SmartLink
                      href={p.btnLink}
                      className={cn(
                        "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-sm font-semibold transition",
                        p.btnClass,
                      )}
                    >
                      {p.btnText}
                      <ArrowRight size={15} />
                    </SmartLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ======================================================
          4. CTA — Explore the PCH Ecosystem
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#16324f] text-white">
        {ctaImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${ctaImage}")` }}
            />
            <div className="absolute inset-0 bg-[#16324f]/88" />
          </>
        )}

        <Container>
          <Reveal>
            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 py-10 text-center sm:py-16 lg:py-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8934A]">
                {ctaEyebrow}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {ctaTitle}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {ctaDescription}
              </p>
              <SmartLink
                href={ctaBtnLink}
                className="mt-8 inline-flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-[#B8934A] px-8 text-sm font-semibold text-white transition hover:bg-[#a5823f]"
              >
                {ctaBtnText}
              </SmartLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
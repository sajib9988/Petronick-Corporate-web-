"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Users,
  Settings,
  BarChart3,
  Building2,
  MapPin,
  Layers,
  TrendingUp,
  LayoutGrid,
} from "lucide-react";

import { Container } from "@/components/Container";
import { fadeUp, fadeSlide, staggerContainer } from "@/lib/motion";
import { Button } from "../ui/button";

// ============================================================
// TRUST CARDS (static icon + label, shown beside the About text)
// ============================================================

const TRUST_CARDS = [
  {
    icon: Users,
    title: "Shared Strategy",
    description:
      "Portfolio level leadership helps align priorities, resources, and long term business direction.",
  },
  {
    icon: Settings,
    title: "Operational Support",
    description:
      "Marketing, technology, procurement, logistics, fulfillment, and advisory capabilities support execution.",
  },
  {
    icon: BarChart3,
    title: "Independent Growth",
    description:
      "Each company serves its own market while benefiting from shared infrastructure and expertise.",
  },
];

// ============================================================
// SNAPSHOT FACTS (icon is fixed per fact; label/value are dynamic)
// ============================================================

const SNAPSHOT_ICONS = [
  Building2,
  MapPin,
  Layers,
  TrendingUp,
  LayoutGrid,
] as const;

interface AboutContentProps {
  // ============================================================
  // HERO
  // ============================================================

  heroImage?: string | null;

  heroContent?: {
    badge?: string;
    headline?: string;
    subheadline?: string;
    primaryBtn?: string;
    primaryBtnLink?: string;
    secondaryBtn?: string;
    secondaryBtnLink?: string;
  };

  // ============================================================
  // ABOUT
  // ============================================================

  aboutContent?: {
    title?: string;
    subtitle?: string;
    body?: string;
    btnText?: string;
    btnLink?: string;
  };

  // ============================================================
  // SNAPSHOT
  // ============================================================

  snapshotContent?: {
    label?: string;
    title?: string;

    entityTypeLabel?: string;
    entityType?: string;

    headquartersLabel?: string;
    headquarters?: string;

    structureLabel?: string;
    structure?: string;

    businessModelLabel?: string;
    businessModel?: string;

    industryFocusLabel?: string;
    industryFocus?: string;
  };

  // ============================================================
  // CAPABILITIES
  // ============================================================

  capabilitiesContent?: {
    label?: string;
    title?: string;
    subtitle?: string;

    capability1Title?: string;
    capability1Description?: string;

    capability2Title?: string;
    capability2Description?: string;

    capability3Title?: string;
    capability3Description?: string;

    capability4Title?: string;
    capability4Description?: string;

    capability5Title?: string;
    capability5Description?: string;
  };

  // ============================================================
  // VALUES
  // ============================================================

  valuesContent?: {
    label?: string;
    title?: string;
    subtitle?: string;

    step1Title?: string;
    step1Description?: string;

    step2Title?: string;
    step2Description?: string;

    step3Title?: string;
    step3Description?: string;

    step4Title?: string;
    step4Description?: string;

    step5Title?: string;
    step5Description?: string;
  };

  // ============================================================
  // CTA
  // ============================================================

  ctaContent?: {
    title?: string;
    description?: string;
    btnText?: string;
    btnLink?: string;
    secondaryBtnText?: string;
    secondaryBtnLink?: string;
  };
}

export default function AboutContent({
  heroImage,
  heroContent = {},
  aboutContent = {},
  snapshotContent = {},
  capabilitiesContent = {},
  valuesContent = {},
  ctaContent = {},
}: AboutContentProps) {
  // ============================================================
  // HERO DATA
  // ============================================================

  const heroBadge = heroContent.badge ?? "About Petronick";

  const headline =
    heroContent.headline ??
    "Building Businesses Through Strategic Ownership and Operational Collaboration";

  const subheadline =
    heroContent.subheadline ??
    "Petronick Corporate Holdings LLC owns and supports a connected portfolio of companies designed to operate independently while benefiting from shared strategy, technology, marketing, logistics, fulfillment, procurement, and leadership.";

  const primaryBtn = heroContent.primaryBtn ?? "Explore Our Companies";
  const primaryBtnLink = heroContent.primaryBtnLink ?? "/companies";
  const secondaryBtn = heroContent.secondaryBtn ?? "Contact Us";
  const secondaryBtnLink = heroContent.secondaryBtnLink ?? "/contact";

  // ============================================================
  // ABOUT DATA
  // ============================================================

  const missionSubtitle =
    aboutContent.subtitle ?? "Our Story";

  const missionTitle =
    aboutContent.title ??
    "One Holding Company. Multiple Specialized Businesses.";

  const missionBody =
    aboutContent.body ??
    "Petronick Corporate Holdings LLC was established to organize, support, and scale multiple business ventures through shared resources and strategic leadership. Each business maintains its own market focus while benefiting from a connected operational ecosystem that helps accelerate launches, improve execution, and create long term growth opportunities.";

  const aboutBtnText =
    aboutContent.btnText ?? "Explore Our Companies";

  const aboutBtnLink =
    aboutContent.btnLink ?? "/companies";

  // ============================================================
  // SNAPSHOT DATA
  // ============================================================

  const snapshotLabel =
    snapshotContent.label ?? "Corporate Snapshot";

  const snapshotTitle =
    snapshotContent.title ?? "Petronick at a Glance";

  const snapshotFacts = [
    {
      label: snapshotContent.entityTypeLabel ?? "Entity Type",
      value:
        snapshotContent.entityType ?? "Limited Liability Company",
    },
    {
      label: snapshotContent.headquartersLabel ?? "Headquarters",
      value:
        snapshotContent.headquarters ??
        "Pittsburgh, Pennsylvania, USA",
    },
    {
      label: snapshotContent.structureLabel ?? "Structure",
      value:
        snapshotContent.structure ??
        "Vertically Integrated Holding Company",
    },
    {
      label: snapshotContent.businessModelLabel ?? "Business Model",
      value:
        snapshotContent.businessModel ??
        "Holding Company plus Promotion Agent Network",
    },
    {
      label: snapshotContent.industryFocusLabel ?? "Industry Focus",
      value:
        snapshotContent.industryFocus ??
        "Digital, Fulfillment, Ecommerce, Advisory, Specialty Commerce, Gifting, and Title Services",
    },
  ].map((fact, i) => ({
    ...fact,
    icon: SNAPSHOT_ICONS[i],
  }));

  // ============================================================
  // CAPABILITIES DATA
  // ============================================================

  const capabilitiesLabel =
    capabilitiesContent.label ?? "Core Strengths";

  const capabilitiesTitle =
    capabilitiesContent.title ??
    "Capabilities That Support the Portfolio";

  const capabilitiesSubtitle =
    capabilitiesContent.subtitle ??
    "The PCH ecosystem combines specialized business expertise with shared resources that help companies launch, operate, and grow more efficiently.";

  const capabilitiesList = [
    {
      title: capabilitiesContent.capability1Title ?? "Business Creation",
      desc:
        capabilitiesContent.capability1Description ??
        "Launching and scaling new ventures with practical structure, resources, and execution support.",
    },
    {
      title: capabilitiesContent.capability2Title ?? "Digital Growth",
      desc:
        capabilitiesContent.capability2Description ??
        "Marketing, websites, automation, branding, and customer acquisition capabilities.",
    },
    {
      title: capabilitiesContent.capability3Title ?? "Fulfillment Support",
      desc:
        capabilitiesContent.capability3Description ??
        "Packaging, logistics, shipping, and operational support for product based businesses.",
    },
    {
      title: capabilitiesContent.capability4Title ?? "Advisory Services",
      desc:
        capabilitiesContent.capability4Description ??
        "Business strategy, profitability, management, technology, and consulting support.",
    },
    {
      title: capabilitiesContent.capability5Title ?? "Specialty Commerce",
      desc:
        capabilitiesContent.capability5Description ??
        "Specialty product sourcing, development, gifting, restoration, and commerce opportunities.",
    },
  ].filter((c) => Boolean(c.title));

  // ============================================================
  // VALUES DATA (5-step "How We Operate" flow)
  // ============================================================

  const valuesLabel =
    valuesContent.label ?? "How We Operate";

  const valuesTitle =
    valuesContent.title ??
    "Independent Companies. Shared Capabilities.";

  const valuesSubtitle =
    valuesContent.subtitle ??
    "Each company contributes a distinct capability while benefiting from shared expertise and infrastructure across the PCH ecosystem.";

  const operateSteps = [
    {
      title: valuesContent.step1Title ?? "Own and Build",
      desc:
        valuesContent.step1Description ??
        "Create or acquire focused business opportunities.",
    },
    {
      title: valuesContent.step2Title ?? "Launch and Market",
      desc:
        valuesContent.step2Description ??
        "Use digital growth and customer acquisition resources.",
    },
    {
      title: valuesContent.step3Title ?? "Operate and Support",
      desc:
        valuesContent.step3Description ??
        "Apply shared procurement, systems, and operational expertise.",
    },
    {
      title: valuesContent.step4Title ?? "Fulfill and Deliver",
      desc:
        valuesContent.step4Description ??
        "Support logistics, packaging, shipping, and service execution.",
    },
    {
      title: valuesContent.step5Title ?? "Advise and Scale",
      desc:
        valuesContent.step5Description ??
        "Improve performance and expand value growth opportunities.",
    },
  ].filter((v) => Boolean(v.title));

  // ============================================================
  // CTA DATA
  // ============================================================

  const ctaTitle =
    ctaContent.title ?? "Ready to Partner With Us?";

  const ctaDescription =
    ctaContent.description ??
    "Qualified Promotion Agents can represent one or multiple Petronick business units. Join our growing ecosystem today.";

  const ctaBtnText =
    ctaContent.btnText ?? "Apply as Promotion Agent";

  const ctaBtnLink =
    ctaContent.btnLink ?? "/promotion-agent";

  const secondaryBtnText =
    ctaContent.secondaryBtnText ?? "Contact Us";

  const ctaSecondaryBtnLink =
    ctaContent.secondaryBtnLink ?? "/contact";

  return (
    <main className="min-h-screen ">
      <Container>

        {/* ======================================================
            PART 1 — HERO
        ====================================================== */}
   
<section className=" ">
  <div className="relative bg-gray-950 rounded-3xl overflow-hidden py-8 sm:py-10 lg:py-12">

    {heroImage && (
      <Image
        src={heroImage}
        alt="Petronick Corporate Holdings"
        fill
        priority
        className="object-cover opacity-30"
      />
    )}

    <div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-gray-950/70 to-gray-950" />

    <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

    <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />

    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.15, 0.1)}
      className="relative max-w-3xl mx-auto px-6 text-center"
    >

      <motion.p
        variants={fadeUp(0, 0.6)}
        className="text-amber-400 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-5"
      >
        — {heroBadge} —
      </motion.p>

      <motion.h1
        variants={fadeUp(0.05, 0.9)}
        className="font-serif text-2xl sm:text-5xl lg:text-[2.25rem] font-bold text-white tracking-tight leading-[1.05]"
      >
        {headline}
      </motion.h1>

      <motion.p
        variants={fadeUp(0.15, 0.9)}
        className="mt-6 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
      >
        {subheadline}
      </motion.p>

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

        <motion.div variants={fadeSlide("left", 0, 80, 0.9)}>
          <Button
            asChild
            size="lg"
            className="bg-amber-400 hover:bg-amber-300 text-gray-950! font-semibold border-0 rounded-md shadow-lg shadow-amber-900/30 hover:scale-[1.03] transition-all"
          >
            <Link href={primaryBtnLink}>
              {primaryBtn}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div variants={fadeSlide("right", 0, 80, 0.9)}>
          <Button
            asChild
            size="lg"
            className="bg-transparent text-white! font-semibold border border-white/50 rounded-md hover:bg-white/10 hover:border-white hover:scale-[1.03] transition-all"
          >
            <Link href={secondaryBtnLink}>
              {secondaryBtn}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </motion.div>
  </div>
</section>

        {/* ======================================================
            PART 2 — ABOUT + SNAPSHOT
        ====================================================== */}

        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* LEFT — ABOUT / MISSION */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              variants={fadeSlide(
                "left",
                0,
                70,
                0.7
              )}
            >
              <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-4">
                — {missionSubtitle}
              </p>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {missionTitle}
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 whitespace-pre-line">
                {missionBody}
              </p>

              <Link
                href={aboutBtnLink}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b-2 border-amber-500 pb-1 hover:gap-3 transition-all"
              >
                {aboutBtnText}

                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* RIGHT — TRUST CARDS */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              variants={staggerContainer(0.1, 0.1)}
              className="flex flex-col gap-4"
            >
              {TRUST_CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeSlide("right", 0, 60, 0.6)}
                  className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <card.icon size={20} />
                  </span>

                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {card.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ======================================================
            PART 3 — SNAPSHOT
        ====================================================== */}

        <section className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] bg-gray-950 py-16 sm:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-6">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="text-center mb-12"
            >
              <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
                — {snapshotLabel} —
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {snapshotTitle}
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={staggerContainer(0.08, 0)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            >
              {snapshotFacts.map((fact) => (
                <motion.div
                  key={fact.label}
                  variants={fadeUp(0, 0.5)}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-300"
                >
                  <fact.icon className="text-amber-400 mb-4" size={22} />

                  <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2">
                    {fact.label}
                  </p>

                  <p className="text-sm text-white leading-relaxed">
                    {fact.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ======================================================
            PART 4 — CAPABILITIES
        ====================================================== */}

      <section className="py-8 sm:py-12">
  {/* SECTION HEADER */}
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{
      once: true,
      amount: 0.3,
    }}
    className="mx-auto mb-12 max-w-2xl text-center"
  >
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-600">
      — {capabilitiesLabel} —
    </p>

    <h2 className="mb-4 font-serif text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
      {capabilitiesTitle}
    </h2>

    <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
      {capabilitiesSubtitle}
    </p>
  </motion.div>

  {/* CAPABILITIES */}
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{
      once: true,
      amount: 0.2,
    }}
    variants={staggerContainer(0.08, 0)}
  >
    {/* FIRST ROW — 3 CARDS */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {capabilitiesList.slice(0, 3).map((c, i) => (
        <motion.div
          key={c.title}
          variants={fadeUp(0, 0.5)}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-md"
        >
          <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-amber-100 text-sm font-bold text-amber-700">
            {String(i + 1).padStart(2, "0")}
          </span>

          <h3 className="mb-2 text-base font-bold text-gray-900">
            {c.title}
          </h3>

          {c.desc && (
            <p className="text-sm leading-relaxed text-gray-500">
              {c.desc}
            </p>
          )}
        </motion.div>
      ))}
    </div>

    {/* SECOND ROW — 2 CENTERED CARDS */}
    <div className="mt-5 flex justify-center gap-5">
      {capabilitiesList.slice(3, 5).map((c, i) => (
        <motion.div
          key={c.title}
          variants={fadeUp(0, 0.5)}
          className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-md sm:w-[calc(50%-0.625rem)] lg:w-[calc((100%-2.5rem)/3)]"
        >
          <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-amber-100 text-sm font-bold text-amber-700">
            {String(i + 4).padStart(2, "0")}
          </span>

          <h3 className="mb-2 text-base font-bold text-gray-900">
            {c.title}
          </h3>

          {c.desc && (
            <p className="text-sm leading-relaxed text-gray-500">
              {c.desc}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>

        {/* ======================================================
            PART 5 — VALUES (How We Operate — 5-step flow)
        ====================================================== */}

        <section className="py-8 w-full">
          <div className="rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden px-6 sm:px-10 lg:px-14 py-16 sm:py-20">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3">
                — {valuesLabel} —
              </p>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {valuesTitle}
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {valuesSubtitle}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={staggerContainer(0.08, 0)}
              className="flex flex-col gap-4 lg:flex-row lg:items-stretch"
            >
              {operateSteps.map((step, i) => (
                <Fragment key={step.title}>
                  <motion.div
                    variants={fadeUp(0, 0.5)}
                    className="flex-1 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300"
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white text-sm font-bold">
                      {i + 1}
                    </span>

                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {step.title}
                    </h3>

                    {step.desc && (
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    )}
                  </motion.div>

                  {i < operateSteps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center text-amber-500 flex-shrink-0">
                      <ChevronRight size={18} />
                    </div>
                  )}
                </Fragment>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ======================================================
            PART 6 — CTA
        ====================================================== */}

        <section className="py-8 pb-14">
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white py-16 sm:py-20 px-6 sm:px-10 text-center">

            <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />

            <div className="relative">

              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {ctaTitle}
              </h2>

              <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
                {ctaDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">

                <Link
                  href={ctaBtnLink}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:scale-[1.03] transition-all"
                >
                  {ctaBtnText}

                  <ArrowRight size={14} />
                </Link>

                <Link
                  href={ctaSecondaryBtnLink}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {secondaryBtnText}
                </Link>

              </div>

            </div>
          </div>
        </section>

      </Container>
    </main>
  );
}
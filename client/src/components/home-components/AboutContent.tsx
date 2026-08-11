"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/Container";
import { fadeUp, fadeSlide, staggerContainer } from "@/lib/motion";

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
    title?: string;
    entityType?: string;
    headquarters?: string;
    structure?: string;
    businessModel?: string;
    industryFocus?: string;
  };

  // ============================================================
  // VALUES
  // ============================================================

  valuesContent?: {
    label?: string;
    title?: string;

    value1Title?: string;
    value1Description?: string;

    value2Title?: string;
    value2Description?: string;

    value3Title?: string;
    value3Description?: string;

    value4Title?: string;
    value4Description?: string;
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
  valuesContent = {},
  ctaContent = {},
}: AboutContentProps) {
  // ============================================================
  // HERO DATA
  // ============================================================

  const headline =
    heroContent.headline ?? "Building What Comes Next";

  const subheadline =
    heroContent.subheadline ??
    "A vertically integrated holding company built to own, operate, and scale multiple revenue-generating business units under one strategic roof.";

  // ============================================================
  // ABOUT DATA
  // ============================================================

  const missionSubtitle =
    aboutContent.subtitle ?? "Our Mission";

  const missionTitle =
    aboutContent.title ??
    "Building and Scaling Revenue-Driven Businesses";

  const missionBody =
    aboutContent.body ??
    "Petronick Corporate Holdings LLC owns and operates multiple business units specifically designed to work together — accelerating market entry, scaling operations, and maximizing profitability across every subsidiary.";

  const aboutBtnText =
    aboutContent.btnText ?? "Explore Our Companies";

  const aboutBtnLink =
    aboutContent.btnLink ?? "/companies";

  // ============================================================
  // SNAPSHOT DATA
  // ============================================================

  const snapshotTitle =
    snapshotContent.title ?? "Corporate Snapshot";

  const quickFacts = [
    {
      label: "Entity Type",
      value: snapshotContent.entityType,
    },
    {
      label: "Headquarters",
      value: snapshotContent.headquarters,
    },
    {
      label: "Structure",
      value: snapshotContent.structure,
    },
    {
      label: "Business Model",
      value: snapshotContent.businessModel,
    },
    {
      label: "Industry Focus",
      value: snapshotContent.industryFocus,
    },
  ].filter((fact) => Boolean(fact.value));

  // ============================================================
  // VALUES DATA
  // ============================================================

  const coreValues = [
    {
      title: valuesContent.value1Title,
      desc: valuesContent.value1Description,
    },
    {
      title: valuesContent.value2Title,
      desc: valuesContent.value2Description,
    },
    {
      title: valuesContent.value3Title,
      desc: valuesContent.value3Description,
    },
    {
      title: valuesContent.value4Title,
      desc: valuesContent.value4Description,
    },
  ].filter((v) => Boolean(v.title));

  const valuesLabel =
    valuesContent.label ?? "Our DNA";

  const valuesTitle =
    valuesContent.title ?? "How We Operate as a Company";

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

  const secondaryBtnLink =
    ctaContent.secondaryBtnLink ?? "/contact";

  return (
    <main className="min-h-screen bg-[#4dd0e1]">
      <Container>

        {/* ======================================================
            PART 1 — HERO
        ====================================================== */}

        <section className="pt-8 sm:pt-10">
          <div className="relative bg-gray-950 rounded-3xl overflow-hidden py-24 sm:py-32">

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
              className="relative max-w-4xl mx-auto px-6 text-center"
            >
              <motion.div
                variants={fadeUp(0, 0.6)}
                className="inline-flex items-center gap-2 bg-white/5 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />

                {heroContent.badge ??
                  "Petronick Corporate Holdings LLC"}
              </motion.div>

              <motion.h1
                variants={fadeUp(0.05, 0.9)}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
              >
                {headline}
              </motion.h1>

              <motion.div
                variants={fadeUp(0.1, 0.7)}
                className="mx-auto mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
              />

              <motion.p
                variants={fadeUp(0.15, 0.9)}
                className="mt-7 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              >
                {subheadline}
              </motion.p>
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
                {missionSubtitle}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {missionTitle}
              </h2>

              <p className="text-gray-700 text-base leading-relaxed mb-8 whitespace-pre-line">
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

            {/* RIGHT — SNAPSHOT */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              variants={fadeSlide(
                "right",
                0.1,
                70,
                0.7
              )}
              className="rounded-2xl border border-amber-100 bg-amber-50/50 p-7"
            >
              <p className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-5">
                {snapshotTitle}
              </p>

              <dl className="divide-y divide-amber-100/80">
                {quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="py-3.5 flex items-start justify-between gap-4"
                  >
                    <dt className="text-xs text-amber-700/70 font-medium flex-shrink-0">
                      {fact.label}
                    </dt>

                    <dd className="text-xs font-semibold text-gray-800 text-right">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

          </div>
        </section>

        {/* ======================================================
            PART 3 — VALUES
        ====================================================== */}

        <section className="py-8">
          <div className="rounded-3xl bg-gray-950 overflow-hidden px-6 sm:px-10 lg:px-14 py-16 sm:py-20">

            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
                {valuesLabel}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {valuesTitle}
              </h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={staggerContainer(0.1, 0)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {coreValues.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp(0, 0.5)}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-300 flex gap-5"
                >
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-stone-900 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-bold text-white text-base mb-2">
                      {v.title}
                    </h3>

                    {v.desc && (
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {v.desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ======================================================
            PART 4 — CTA
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
                  href={secondaryBtnLink}
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
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  ExternalLink,
  Network,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/Container";
import {
  fadeUp,
  fadeSlide,
  staggerContainer,
} from "@/lib/motion";
import { getAllCompanies } from "@/service/company";

interface Company {
  id: string;
  name: string;
  description: string;
  website?: string | null;
  logo?: string | null;
  initial?: string | null;
  color?: string | null;
  revenueStage?: string | null;
}

interface CompaniesResponse {
  data?: Company[];
}

const stageColors: Record<string, string> = {
  Active:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",

  Launching:
    "bg-blue-50 text-blue-700 border border-blue-200",

  "Pre-launch":
    "bg-amber-50 text-amber-700 border border-amber-200",

  "Re-launching":
    "bg-purple-50 text-purple-700 border border-purple-200",
};

export default async function CompaniesPage() {
  let companies: Company[] = [];

  try {
    const result = (await getAllCompanies({
      isVisible: true,
      limit: 50,
    })) as CompaniesResponse;

    companies = result?.data ?? [];
  } catch {
    companies = [];
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate overflow-hidden bg-[#0a0f14] text-white">

        {/* Full-width background */}
        <div className="pointer-events-none absolute inset-0 -z-10">

          {/* Main glow */}
          <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

          {/* Secondary glow */}
          <div className="absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[110px]" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0f14] to-transparent" />
        </div>

        <Container>
          <div className="relative flex min-h-[620px] flex-col items-center justify-center px-0 py-24 text-center">

            {/* Badge */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              animate="visible"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Portfolio Overview
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp(0.1)}
              initial="hidden"
              animate="visible"
              className="mt-7 max-w-4xl text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                Companies
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="visible"
              className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
            >
              Explore the businesses operating under Petronick Corporate
              Holdings LLC — each with its own focus, capabilities, and role
              within a connected business ecosystem.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp(0.3)}
              initial="hidden"
              animate="visible"
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
            >
              <a
                href="#companies"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10"
              >
                Explore Portfolio

                <ArrowDown
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>

              <Link
                href="/promotion-agent"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                Become a Promotion Agent

                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
              href="#overview"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 0.8,
                },
              }}
              className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-white"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                Explore
              </span>

              <ArrowDown
                size={15}
                className="animate-bounce"
              />
            </motion.a>

          </div>
        </Container>
      </section>

      {/* =====================================================
          PORTFOLIO SNAPSHOT
      ====================================================== */}

      <section
        id="overview"
        className="border-b border-slate-200 bg-white"
      >
        <Container>
          <div className="grid grid-cols-1 divide-y divide-slate-200 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

            {/* Stat 1 */}
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-center justify-center gap-4 px-6 py-7 text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Building2 size={20} />
              </div>

              <div className="text-left">
                <p className="text-2xl font-bold tracking-tight text-slate-950">
                  {companies.length}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Business Units
                </p>
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-center justify-center gap-4 px-6 py-7 text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Network size={20} />
              </div>

              <div className="text-left">
                <p className="text-2xl font-bold tracking-tight text-slate-950">
                  1
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Connected Ecosystem
                </p>
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-center justify-center gap-4 px-6 py-7 text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Sparkles size={20} />
              </div>

              <div className="text-left">
                <p className="text-2xl font-bold tracking-tight text-slate-950">
                  Multi
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Market Opportunities
                </p>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* =====================================================
          ECOSYSTEM INTRO
      ====================================================== */}

      <section className="bg-slate-50 py-24 sm:py-28">
        <Container>

          <motion.div
            variants={fadeUp()}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
              Our Business Ecosystem
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Different capabilities.
              <br />
              One connected portfolio.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Petronick Corporate Holdings LLC brings together multiple
              companies that operate independently while supporting one
              another through shared expertise, marketing, logistics,
              fulfillment, technology, and growth strategies.
            </p>
          </motion.div>

        </Container>
      </section>

      {/* =====================================================
          COMPANY DIRECTORY
      ====================================================== */}

      <section
        id="companies"
        className="bg-white py-24 sm:py-28"
      >
        <Container>

          {/* Section heading */}
          <motion.div
            variants={fadeUp()}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
                Company Directory
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Explore Our Business Units
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
              Discover the specialized businesses that make up the Petronick
              Corporate Holdings ecosystem.
            </p>
          </motion.div>

          {/* Company cards */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {companies.map((company) => {

              const initial =
                company.initial ??
                company.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

              const color =
                company.color ?? "bg-slate-800";

              return (
                <motion.article
                  key={company.id}
                  variants={fadeUp()}
                  whileHover={{
                    y: -7,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/60"
                >

                  {/* Card header */}
                  <div className="flex items-start gap-5 p-7 pb-5">

                    {/* Logo */}
                    <div className="flex-shrink-0">

                      {company.logo ? (
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm transition-transform duration-300 group-hover:scale-105">
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                      ) : (
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105 ${color}`}
                        >
                          <span className="text-xl font-bold text-white">
                            {initial}
                          </span>
                        </div>
                      )}

                    </div>

                    {/* Name */}
                    <div className="min-w-0 flex-1 pt-1">

                      <h3 className="text-[17px] font-bold leading-tight tracking-tight text-slate-950">
                        {company.name}
                      </h3>

                      {company.revenueStage && (
                        <span
                          className={`mt-2 inline-block rounded-full px-3 py-1 text-[10px] font-semibold ${stageColors[company.revenueStage] ?? "bg-slate-100 text-slate-600"}`}
                        >
                          {company.revenueStage}
                        </span>
                      )}

                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 px-7 pb-7">
                    <p className="text-sm leading-7 text-slate-500">
                      {company.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto border-t border-slate-100 bg-slate-50/70 px-7 py-5">

                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-emerald-600"
                      >
                        Visit Website

                        <ExternalLink
                          size={15}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </a>
                    ) : (
                      <span className="text-xs italic text-slate-400">
                        Website coming soon
                      </span>
                    )}

                  </div>

                </motion.article>
              );
            })}
          </motion.div>

          {/* Empty state */}
          {companies.length === 0 && (
            <motion.div
              variants={fadeUp()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"
            >
              <Building2
                size={32}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No companies available
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Company information is currently unavailable. Please check
                back again later.
              </p>
            </motion.div>
          )}

        </Container>
      </section>

      {/* =====================================================
          PROMOTION AGENT CTA
      ====================================================== */}

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>

          <motion.div
            variants={fadeSlide("left")}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="relative isolate overflow-hidden rounded-3xl bg-[#0a0f14] px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-20 lg:px-16"
          >

            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 -z-10">

              <div className="absolute -right-32 -top-32 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-[100px]" />

              <div className="absolute -bottom-40 -left-20 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />

              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

            </div>

            <div className="relative mx-auto max-w-3xl text-center">

              <motion.p
                variants={fadeUp(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400"
              >
                Partnership Opportunity
              </motion.p>

              <motion.h2
                variants={fadeUp(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl"
              >
                Represent Our{" "}
                <span className="text-emerald-400">
                  Business Units
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp(0.26)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
              >
                Qualified Promotion Agents can represent one or multiple
                Petronick Corporate Holdings companies and help introduce our
                products, services, and opportunities to businesses and
                consumers.
              </motion.p>

              <motion.div
                variants={fadeUp(0.34)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
              >

                <Link
                  href="/promotion-agent"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10"
                >
                  Apply as Promotion Agent

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  Contact Us
                </Link>

              </motion.div>

            </div>
          </motion.div>

        </Container>
      </section>

    </main>
  );
}
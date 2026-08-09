import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { Container } from "../Container";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Petronick", href: "/about" },
      { label: "Our Companies", href: "/companies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Opportunities",
    links: [
      {
        label: "Become a Promotion Agent",
        href: "/promotion-agent",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: FaYoutube,
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: FaXTwitter,
  },
];

export default function Footer() {
  return (
    <footer
      className="text-white"
      style={{
        background: `linear-gradient(
          107.4deg,
          rgba(255,242,239,1) 11.1%,
          rgba(255,219,182,1) 37.5%,
          rgba(247,165,165,1) 54.3%,
          rgba(26,42,79,1) 84.3%
        )`,
      }}
    >
      {/* ================= Main Footer ================= */}
      <Container>
        <div className="py-12">
          {/* ================= Main Content ================= */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.4fr_1fr]">
            
            {/* ================= Brand ================= */}
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/Word Mark.png"
                  alt="Petronick Logo"
                  width={120}
                  height={120}
                  priority
                  className="h-auto w-[120px] object-contain"
                />
              </Link>

              <p className="mt-2 mb-6 max-w-sm text-[15px] leading-7 text-[#526174]">
                A vertically integrated holding company operating multiple
                revenue-generating business units across digital, fulfillment,
                advisory, and e-commerce sectors.
              </p>

              {/* Apply as Agent */}
              <Link
                href="/promotion-agent"
                className="
                  group
                  inline-flex items-center gap-2
                  rounded-full
                  border border-amber-300/50
                  bg-amber-400
                  px-5 py-2.5
                  text-[14px]
                  font-semibold
                  text-slate-900
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-amber-300
                  hover:shadow-lg
                  hover:shadow-amber-900/20
                "
              >
                Apply as Agent

                <ArrowRight
                  size={15}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>

            {/* ================= Company ================= */}
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[#26364A]">
                Company
              </h3>

              <ul className="space-y-3.5">
                {footerLinks[0].links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        text-[15px]
                        font-normal
                        text-[#526174]
                        transition-colors
                        duration-300
                        hover:text-[#26364A]
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= Opportunities ================= */}
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[#26364A]">
                Opportunities
              </h3>

              <ul className="space-y-3.5">
                {footerLinks[1].links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        text-[15px]
                        font-normal
                        text-[#526174]
                        transition-colors
                        duration-300
                        hover:text-[#26364A]
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= Legal ================= */}
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
                Legal
              </h3>

              <ul className="space-y-3.5">
                {footerLinks[2].links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        text-[15px]
                        font-normal
                        text-white/65
                        transition-colors
                        duration-300
                        hover:text-white/90
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= Center Social Links ================= */}
          <div className="mt-10 flex flex-col items-center justify-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#526174]">
              Follow Us
            </p>

            <div className="flex items-center justify-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      group
                      flex h-10 w-10 items-center justify-center
                      rounded-full
                      border border-white/40
                      bg-white/20
                      text-[#40556B]
                      backdrop-blur-sm
                      shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-white/60
                      hover:bg-white/40
                      hover:text-[#172B42]
                      hover:shadow-md
                    "
                  >
                    <Icon
                      size={17}
                      className="
                        transition-transform duration-300
                        group-hover:scale-110
                      "
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* ================= Bottom Bar ================= */}
      <div className="border-t border-white/20">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
            
            {/* Copyright */}
            <p className="text-sm font-normal text-[#64748B]">
              © {new Date().getFullYear()} Petronick Corporate Holdings LLC.
              All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm text-white/65">
              <Link
                href="/privacy"
                className="transition-colors duration-300 hover:text-white/90"
              >
                Privacy Policy
              </Link>

              <span className="text-white/40">·</span>

              <Link
                href="/terms"
                className="transition-colors duration-300 hover:text-white/90"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
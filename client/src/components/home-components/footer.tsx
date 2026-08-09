import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
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
      { label: "Become a Promotion Agent", href: "/promotion-agent" },
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
  <Container>
    {/* Main Footer */}
    <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">

      {/* Brand - Light Background */}
      <div>
        <Image
          src="/Word Mark.png"
          alt="Petronick Logo"
          width={120}
          height={120}
          className="h-auto w-[120px] object-contain"
        />

        <p className="mt-2 mb-6 max-w-sm text-[15px] leading-7 text-[#17324D]">
          A vertically integrated holding company operating multiple
          revenue-generating business units across digital, fulfillment,
          advisory, and e-commerce sectors.
        </p>

        <Link
          href="/promotion-agent"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#123B5D] transition-colors hover:text-[#071D32]"
        >
          Apply as Agent
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Company - Light/Mid Background */}
      <div>
        <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
          Company
        </h3>

        <ul className="space-y-3.5">
          {footerLinks[0].links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-medium text-[#243B53] transition-colors hover:text-[#000000]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Opportunities - Mid Background */}
      <div>
        <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]">
          Opportunities
        </h3>

        <ul className="space-y-3.5">
          {footerLinks[1].links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-medium text-[#243B53] transition-colors hover:text-[#000000]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal - Dark Background */}
      <div>
        <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-white">
          Legal
        </h3>

        <ul className="space-y-3.5">
          {footerLinks[2].links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Container>

  {/* Bottom Bar */}
  <div className="border-t border-white/20">
    <Container>
      <div className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">

        {/* Left side - light background */}
        <p className="text-sm font-medium text-[#243B53]">
          © {new Date().getFullYear()} Petronick Corporate Holdings LLC.
          All rights reserved.
        </p>

        {/* Right side - dark background */}
        <div className="flex items-center gap-4 text-sm font-medium text-white/80">
          <Link
            href="/privacy"
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>

          <span className="text-white/50">·</span>

          <Link
            href="/terms"
            className="transition-colors hover:text-white"
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

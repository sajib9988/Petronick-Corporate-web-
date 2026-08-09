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

      {/* Brand */}
      <div>
        <Image
          src="/Word Mark.png"
          alt="Petronick Logo"
          width={120}
          height={120}
          className="h-auto w-[120px] object-contain"
        />

        <p className="mt-2 mb-6 max-w-sm text-[15px] leading-7 text-[#334155]">
          A vertically integrated holding company operating multiple
          revenue-generating business units across digital, fulfillment,
          advisory, and e-commerce sectors.
        </p>

        <Link
          href="/promotion-agent"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#1E3A5F] transition-colors hover:text-[#0F172A]"
        >
          Apply as Agent
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Links */}
      {footerLinks.map((group) => (
        <div key={group.title}>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[#1E293B]">
            {group.title}
          </h3>

          <ul className="space-y-3.5">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] text-[#475569] transition-colors hover:text-[#0F172A]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Container>

  {/* Bottom Bar */}
  <div className="border-t border-[#1A2A4F]/20">
    <Container>
      <div className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">

        <p className="text-sm text-[#475569]">
          © {new Date().getFullYear()} Petronick Corporate Holdings LLC.
          All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-sm text-[#475569]">
          <Link
            href="/privacy"
            className="transition-colors hover:text-[#0F172A]"
          >
            Privacy Policy
          </Link>

          <span className="text-[#64748B]">·</span>

          <Link
            href="/terms"
            className="transition-colors hover:text-[#0F172A]"
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

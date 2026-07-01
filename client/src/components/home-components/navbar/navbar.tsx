"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { AuthSection } from "./AuthSection";
import { navLinks } from "./nav-links";

import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="w-full bg-[#001F3F] shadow-lg shadow-black/20 border-b border-amber-400/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Petronick"
              width={220}
              height={80}
              priority
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 font-sans">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative h-20 flex items-center text-[15px] font-medium tracking-wide transition-colors duration-200",

                  isActive(link.href)
                    ? "text-amber-400 border-b-[3px] border-amber-400 font-semibold"
                    : "text-gray-300 border-b-[3px] border-transparent hover:text-amber-300 hover:border-amber-300/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-2">
            <AuthSection />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-amber-400/20 bg-[#001529]/98 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all",
                  isActive(link.href)
                    ? "bg-amber-400/10 text-amber-400 font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 pb-1 space-y-2 border-t border-white/10 mt-2">
              <AuthSection isMobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
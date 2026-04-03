"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Better Auth client
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Petronick", href: "/about" },
  { label: "Our Companies", href: "/companies" },
  { label: "Become a Promotion Agent", href: "/promotion-agent" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // ✅ Correct Better Auth session hook
  const { data: session, isPending, error } = authClient.useSession();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // You can use the client method instead of manual fetch (recommended)
      await authClient.signOut();

      // Fallback manual logout if you prefer
      // await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
      //   method: "POST",
      //   credentials: "include",
      // });

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isAdmin = session?.user?.role === "ADMIN";
  const isLoggedIn = !!session?.user;

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="text-base font-bold text-gray-900 tracking-tight">
              Petronick
            </span>
            <span className="text-base font-light text-gray-400 hidden sm:block">
              Corporate
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 text-sm rounded-full transition-all duration-200 font-medium",
                    active
                      ? "text-gray-900 bg-gray-900/8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_0_12px_rgba(0,0,0,0.06)]"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full opacity-60" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-2">
            {isPending ? (
              <div className="w-24 h-7 bg-gray-100 rounded-lg animate-pulse" />
            ) : isLoggedIn ? (
              <>
                {isAdmin && (
                  <Button asChild size="sm" variant="outline">
                    <Link href="/admin">
                      <LayoutDashboard size={13} className="mr-1.5" />
                      Dashboard
                    </Link>
                  </Button>
                )}

                <div className="flex items-center gap-2 pl-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">
                        {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium max-w-[100px] truncate">
                      {session?.user?.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Button asChild size="sm" variant="outline">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/promotion-agent">Apply Now</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all",
                    active
                      ? "bg-gray-900/8 text-gray-900 font-medium shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)]"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-900 opacity-70 flex-shrink-0" />
                  )}
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile bottom actions */}
            <div className="pt-2 pb-1 space-y-2 border-t border-gray-100 mt-2">
              {isPending ? (
                <div className="h-8 bg-gray-100 rounded-lg animate-pulse" />
              ) : isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>

                  {isAdmin && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                      >
                        <LayoutDashboard size={13} className="mr-1.5" />
                        Dashboard
                      </Link>
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-red-500 border-red-100 hover:bg-red-50"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    disabled={isLoggingOut}
                  >
                    <LogOut size={13} className="mr-1.5" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="w-full">
                    <Link
                      href="/promotion-agent"
                      onClick={() => setIsOpen(false)}
                    >
                      Apply Now
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
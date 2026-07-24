"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { logoutUser, getMe } from "@/service/auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center ring-1 ring-amber-300/30 flex-shrink-0"
      style={{
        boxShadow:
          "inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.4)",
      }}
    >
      <span
        className="text-stone-900 text-xs font-bold tracking-wide"
        style={{ textShadow: "0 1px 0 rgba(255,255,255,0.2)" }}
      >
        {initials}
      </span>
    </div>
  );
}

export const AuthSection = ({ isMobile = false }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res?.data || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await logoutUser();
      if (res?.success) {
        toast.success("Logged out successfully");
        setUser(null);
        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const carvedOutline =
    "border border-amber-600/30 bg-stone-800/40 text-amber-300 hover:text-amber-200 hover:bg-stone-700/60 transition-all";
  const carvedOutlineStyle = {
    boxShadow:
      "inset 0 1px 2px rgba(0,0,0,0.5), inset 0 -1px 1px rgba(255,255,255,0.04), 0 1px 1px rgba(255,255,255,0.05)",
    textShadow: "0 1px 1px rgba(0,0,0,0.6)",
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-stone-700/50 animate-pulse" />
        {!isMobile && <div className="h-4 w-20 bg-stone-700/50 animate-pulse rounded-md" />}
      </div>
    );
  }

  if (user) {
    // ── Mobile: stacked, no dropdown needed (space is not an issue) ──
    if (isMobile) {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-1 py-2 border-b border-amber-700/20 mb-1">
            <UserAvatar name={user.name} />
            <div className="flex flex-col">
              <span
                className="text-stone-200 text-sm font-semibold"
                style={{ textShadow: "0 1px 1px rgba(0,0,0,0.6)" }}
              >
                {user.name}
              </span>
              <span className="text-stone-500 text-xs">{user.role}</span>
            </div>
          </div>

          {isAdmin && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className={cn("w-full", carvedOutline)}
              style={carvedOutlineStyle}
            >
              <Link href="/admin">
                <LayoutDashboard size={13} className="mr-1.5" />
                Dashboard
              </Link>
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            className="w-full text-red-400 hover:text-red-300 hover:bg-red-950/30 text-sm font-medium"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <LogOut size={13} className="mr-1.5" />
            {loggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      );
    }

    // ── Desktop: dropdown — crowding fix ──
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-2 rounded-full pl-1 pr-2.5 py-1 border border-amber-600/20 bg-stone-800/40 hover:bg-stone-700/60 transition-all outline-none"
            style={{
              boxShadow:
                "inset 0 1px 2px rgba(0,0,0,0.5), inset 0 -1px 1px rgba(255,255,255,0.04)",
            }}
          >
            <UserAvatar name={user.name} />
            <span
              className="text-stone-300 text-[14px] font-semibold max-w-[110px] truncate"
              style={{ textShadow: "0 1px 1px rgba(0,0,0,0.6)" }}
            >
              {user.name}
            </span>
            <ChevronDown size={14} className="text-stone-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="bg-[#1a1d23] border border-amber-700/20 text-stone-200 min-w-52 shadow-xl"
        >
          <DropdownMenuLabel className="font-normal">
            <span className="text-stone-200 text-sm font-semibold block">
              {user.name}
            </span>
            <span className="text-xs text-stone-500">{user.role}</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-amber-700/20" />

          {isAdmin && (
            <DropdownMenuItem
              asChild
              className="text-stone-300 focus:bg-stone-800 focus:text-amber-300 cursor-pointer"
            >
              <Link href="/admin">
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-red-400 focus:bg-red-950/40 focus:text-red-300 cursor-pointer"
          >
            <LogOut size={14} />
            {loggingOut ? "Logging out..." : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // ── Not logged in ──
  return (
    <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-3"}`}>
      <Button
        asChild
        size="sm"
        variant="outline"
        className={cn(isMobile ? "w-full" : "h-10 text-[15px] px-4 font-semibold", carvedOutline)}
        style={carvedOutlineStyle}
      >
        <Link href="/login">Log in</Link>
      </Button>

      <Button
        asChild
        size="sm"
        className={cn(
          isMobile ? "w-full text-sm font-semibold" : "h-10 text-[15px] px-4 font-semibold",
          "bg-gradient-to-b from-amber-400 to-amber-700 text-stone-900 border-none"
        )}
        style={{
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.4)",
        }}
      >
        <Link href="/promotion-agent">Apply Now</Link>
      </Button>
    </div>
  );
};
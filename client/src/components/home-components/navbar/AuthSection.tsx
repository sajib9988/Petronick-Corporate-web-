"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { logoutUser, getMe } from "@/service/auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
        const userData = res?.data || null;
        setUser(userData);
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

  // Reusable "carved into stone" button style
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
    return (
      <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-3"}`}>

        {/* Avatar + Name */}
        {isMobile ? (
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
        ) : (
          <div className="flex items-center gap-2">
            <UserAvatar name={user.name} />
            <span
              className="text-stone-300 text-[16px] font-semibold"   // ← Matched with navbar
              style={{ textShadow: "0 1px 1px rgba(0,0,0,0.6)" }}
            >
              {user.name}
            </span>
          </div>
        )}

        {/* Admin Dashboard Button */}
        {isAdmin && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className={cn(
              isMobile ? "w-full" : "h-10 text-[15px] px-3 font-semibold",
              carvedOutline
            )}
            style={carvedOutlineStyle}
          >
            <Link href="/admin">
              <LayoutDashboard size={13} className="mr-1.5" />
              Dashboard
            </Link>
          </Button>
        )}

        {/* Logout */}
        <Button
          size="sm"
          variant="ghost"
          className={
            isMobile
              ? "w-full text-red-400 hover:text-red-300 hover:bg-red-950/30 text-sm font-medium"
              : "h-10 text-[15px] font-semibold text-stone-400 hover:text-red-400 hover:bg-red-950/30 px-3 transition-colors"
          }
          style={{ textShadow: "0 1px 1px rgba(0,0,0,0.6)" }}
          onClick={handleLogout}
          disabled={loggingOut}
        >
          <LogOut size={13} className="mr-1.5" />
          {loggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    );
  }

  // Not logged in
  return (
    <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-3"}`}>
      <Button
        asChild
        size="sm"
        variant="outline"
        className={cn(
          isMobile ? "w-full" : "h-10 text-[15px] px-4 font-semibold",
          carvedOutline
        )}
        style={carvedOutlineStyle}
      >
        <Link href="/login">Log in</Link>
      </Button>

      <Button
        asChild
        size="sm"
        className={cn(
          isMobile
            ? "w-full text-sm font-semibold"
            : "h-10 text-[15px] px-4 font-semibold",
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
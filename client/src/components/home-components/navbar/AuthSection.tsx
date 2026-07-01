"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { logoutUser, getMe } from "@/service/auth";
import { useRouter } from "next/navigation";

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center ring-2 ring-amber-300/40 shadow-md shadow-black/20 flex-shrink-0">
      <span className="text-white text-xs font-bold tracking-wide">{initials}</span>
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

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        {!isMobile && <div className="h-4 w-20 bg-white/10 animate-pulse rounded-md" />}
      </div>
    );
  }

  if (user) {
    return (
      <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-3"}`}>

        {/* Avatar + Name */}
        {isMobile ? (
          <div className="flex items-center gap-3 px-1 py-2 border-b border-white/10 mb-1">
            <UserAvatar name={user.name} />
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold">{user.name}</span>
              <span className="text-gray-400 text-xs">{user.role}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UserAvatar name={user.name} />
            <span className="text-gray-200 text-sm font-medium">{user.name}</span>
          </div>
        )}

        {/* Admin Dashboard Button */}
        {isAdmin && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className={
              isMobile
                ? "w-full border-amber-400/40 text-amber-400 hover:bg-amber-400/10 bg-transparent"
                : "h-9 border-amber-400/40 text-amber-400 hover:bg-amber-400/10 bg-transparent text-xs px-3"
            }
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
              ? "w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
              : "h-9 text-gray-300 font-medium hover:text-red-400 hover:bg-red-500/10 px-3 text-xs transition-colors"
          }
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
        className={
          isMobile
            ? "w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
            : "h-9 border-white/20 text-gray-200 hover:text-white hover:bg-white/10 bg-transparent text-xs px-4"
        }
      >
        <Link href="/login">Log in</Link>
      </Button>

      <Button
        asChild
        size="sm"
        className={
          isMobile
            ? "w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white border-none"
            : "h-9 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white border-none text-xs px-4 shadow-md shadow-amber-900/30"
        }
      >
        <Link href="/promotion-agent">Apply Now</Link>
      </Button>
    </div>
  );
};
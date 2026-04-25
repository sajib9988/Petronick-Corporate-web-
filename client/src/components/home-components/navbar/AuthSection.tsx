"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { logoutUser, getMe } from "@/service/auth"; // 👈 add this

export const AuthSection = ({ isMobile = false }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // 🔥 get user on load
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

  // 🔥 logout
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const res = await logoutUser();

      if (res?.success) {
        toast.success("Logged out successfully");
        window.location.reload();
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  const isAdmin = user?.role === "ADMIN";

  if (loading) {
    return <div className="h-8 w-24 bg-gray-100/10 animate-pulse rounded-lg" />;
  }

  if (user) {
    return (
      <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-4"}`}>
        {!isMobile && (
          <span className="text-white font-medium text-sm">
            {user.name}
          </span>
        )}

        {isAdmin && (
          <Button asChild size="sm" variant="outline" className={`${isMobile ? "w-full" : "h-9 border-white/20 text-white hover:bg-white/10 bg-transparent"}`}>
            <Link href="/admin">
              <LayoutDashboard size={14} className="mr-2" />
              Dashboard
            </Link>
          </Button>
        )}

        {isMobile && (
          <span className="text-white/70 text-sm px-1 py-2">
            Logged in as: <b>{user.name}</b>
          </span>
        )}

        <Button
          size="sm"
          variant="ghost"
          className={`${isMobile ? "w-full text-red-400" : "text-white/60 hover:text-white hover:bg-white/5 h-9"}`}
          onClick={handleLogout}
          disabled={loggingOut}
        >
          <LogOut size={14} className="mr-2" />
          {loggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-2"}`}>
      <Button asChild size="sm" variant="outline" className={isMobile ? "w-full" : "h-9 border-white/20 text-white hover:bg-white/10 bg-transparent"}>
        <Link href="/login">log in</Link>
      </Button>
      <Button asChild size="sm" className={isMobile ? "w-full" : "h-9 bg-blue-600 hover:bg-blue-500 text-white border-none"}>
        <Link href="/promotion-agent">Apply Now</Link>
      </Button>
    </div>
  );
};
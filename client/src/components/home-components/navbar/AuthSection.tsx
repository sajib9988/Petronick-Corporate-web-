"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { getMe, logoutUser } from "@/service/auth";


export const AuthSection = ({ isMobile = false }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getMe();
        setSession(data.user || null);
      } catch (err) {
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutUser();
    setSession(null);
    setLoggingOut(false);
  };

  const isAdmin = session?.role === "ADMIN";

  if (loading) return <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg" />;

  if (session) {
    return (
      <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-2"}`}>
        {isAdmin && (
          <Button asChild size="sm" variant="outline" className={isMobile ? "w-full" : ""}>
            <Link href="/admin">
              <LayoutDashboard size={13} className="mr-1.5" />
              Dashboard
            </Link>
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          className={isMobile ? "w-full text-red-500 border-red-100 hover:bg-red-50" : ""}
          onClick={handleLogout}
          disabled={loggingOut}
        >
          <LogOut size={13} className="mr-1.5" />
          {loggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex ${isMobile ? "flex-col gap-2" : "items-center gap-2"}`}>
      <Button asChild size="sm" variant="outline" className={isMobile ? "w-full" : ""}>
        <Link href="/login">log in</Link>
      </Button>
      <Button asChild size="sm" className={isMobile ? "w-full" : ""}>
        <Link href="/promotion-agent">Apply Now</Link>
      </Button>
    </div>
  );
};
export const dynamic = 'force-dynamic';
import {
  Building2,
  Users,
  Mail,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

import StatsCard from "@/components/admin/stats-card";
import { getAllCompanies } from "@/service/company";
import { getAllAgents } from "@/service/agent";
import { getAllContacts } from "@/service/contact";

export default async function AdminDashboardPage() {
  const [companies, contacts, agents] = await Promise.all([
    getAllCompanies({ revalidate: false }),
    getAllContacts(),
    getAllAgents(),
  ]);

  const stats = [
    {
      label: "Total Companies",
      value: companies?.meta?.total ?? 0,
      icon: <Building2 size={18} className="text-white" />,
      gradient: "from-blue-500 to-blue-700",
      href: "/admin/companies",
      trend: "Business units",
      delay: 0,
    },
    {
      label: "Promotion Agents",
      value: agents?.meta?.total ?? 0,
      icon: <Users size={18} className="text-white" />,
      gradient: "from-emerald-500 to-emerald-700",
      href: "/admin/agents",
      trend: "Applications",
      delay: 0.1,
    },
    {
      label: "Contact Messages",
      value: contacts?.meta?.total ?? 0,
      icon: <Mail size={18} className="text-white" />,
      gradient: "from-purple-500 to-purple-700",
      href: "/admin/contact",
      trend: "Total messages",
      delay: 0.2,
    },
    {
      label: "Active Units",
      value: 7,
      icon: <TrendingUp size={18} className="text-white" />,
      gradient: "from-amber-500 to-orange-600",
      href: "/admin/companies",
      trend: "Revenue ready",
      delay: 0.3,
    },
  ];

  const agentStatusColor: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800 border border-amber-200",
    REVIEWED: "bg-blue-100 text-blue-800 border border-blue-200",
    APPROVED: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    REJECTED: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Good morning, Admin 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Here&apos;s what&apos;s happening with Petronick today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-stone-900 bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2 rounded-full shadow-sm">
          <Clock size={14} />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Agents */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm tracking-wide">
              Recent Agent Applications
            </h3>
            <Link
              href="/admin/agents"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors bg-amber-400/10 px-3 py-1 rounded-full hover:bg-amber-400/20"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {agents?.data?.length > 0 ? (
              agents.data
                .slice(0, 5)
                .map((agent: {
                  id: string;
                  fullName: string;
                  email: string;
                  status: string;
                  focus: string;
                }) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="min-w-0 flex-1 mr-3">
                      <p className="text-sm font-semibold text-white truncate">
                        {agent.fullName}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {agent.focus} · {agent.email}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${agentStatusColor[agent.status] ?? "bg-slate-800 text-slate-300 border border-slate-700"}`}
                    >
                      {agent.status}
                    </span>
                  </div>
                ))
            ) : (
              <div className="px-6 py-10 text-center">
                <Users size={28} className="text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-white font-medium">No applications yet</p>
                <p className="text-xs text-slate-400 mt-1">Agents will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm tracking-wide">
              Recent Contact Messages
            </h3>
            <Link
              href="/admin/contact"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors bg-amber-400/10 px-3 py-1 rounded-full hover:bg-amber-400/20"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {contacts?.data?.length > 0 ? (
              contacts.data
                .slice(0, 5)
                .map((contact: {
                  id: string;
                  name: string;
                  email: string;
                  message: string;
                }) => (
                  <div
                    key={contact.id}
                    className="px-6 py-3.5 hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-white">
                        {contact.name}
                      </p>
                      <p className="text-xs text-slate-400">{contact.email}</p>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {contact.message}
                    </p>
                  </div>
                ))
            ) : (
              <div className="px-6 py-10 text-center">
                <Mail size={28} className="text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-white font-medium">No messages yet</p>
                <p className="text-xs text-slate-400 mt-1">Contacts will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
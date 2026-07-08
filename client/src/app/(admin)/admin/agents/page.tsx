"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Loader2, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from "@/table/data-table";
import { agentsColumns, Agent } from "@/table/agentsColumns";
import {
  getAllAgents,
  updateAgentStatus,
  deleteAgent,
  exportAgentsCSV,
} from "@/service/agent";

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Reviewed", value: "REVIEWED" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [viewAgent, setViewAgent] = useState<Agent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fetchAgents = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllAgents({ search, status: status || undefined, limit: 100 });
      setAgents(result?.data ?? []);
    } catch {
      setAgents([]);
    } finally {
      setIsLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timer = setTimeout(() => fetchAgents(), 300);
    return () => clearTimeout(timer);
  }, [fetchAgents]);

  const handleStatusChange = async (id: string, newStatus: Agent["status"]) => {
    setUpdatingId(id);
    try {
      const res = await updateAgentStatus(id, newStatus);
      if (res?.success) {
        setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteAgent(deleteTarget.id);
      setDeleteTarget(null);
      fetchAgents();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await exportAgentsCSV();
      if (!res?.success || !res.csv) return;
      const blob = new Blob([res.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "promotion-agents.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const columns = agentsColumns({
    onView: setViewAgent,
    onDelete: (id, name) => setDeleteTarget({ id, name }),
    onStatusChange: handleStatusChange,
    updatingId,
  });

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Promotion Agents</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Review and manage promotion agent applications
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
          {isExporting ? (
            <Loader2 size={13} className="mr-1.5 animate-spin" />
          ) : (
            <Download size={13} className="mr-1.5" />
          )}
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatus(tab.value)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                status === tab.value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={agents}
        isLoading={isLoading}
        emptyMessage="No promotion agent applications found."
        pageSize={10}
      />

      {/* View Details Dialog */}
      <Dialog open={!!viewAgent} onOpenChange={(open) => !open && setViewAgent(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewAgent?.fullName}</DialogTitle>
            <DialogDescription>{viewAgent?.email}</DialogDescription>
          </DialogHeader>
          {viewAgent && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                  <p className="text-gray-800 font-medium">{viewAgent.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Location</p>
                  <p className="text-gray-800 font-medium">{viewAgent.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Experience</p>
                  <p className="text-gray-800 font-medium">{viewAgent.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Focus</p>
                  <p className="text-gray-800 font-medium">
                    {viewAgent.focus} {viewAgent.focusType && `(${viewAgent.focusType})`}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1.5">Business Units</p>
                <div className="flex flex-wrap gap-1.5">
                  {viewAgent.businessUnits?.map((u) => (
                    <span
                      key={u.id}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700"
                    >
                      {u.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1.5">Statement of Interest</p>
                <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">
                  {viewAgent.message}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-0.5">Applied On</p>
                <p className="text-gray-800 font-medium">
                  {new Date(viewAgent.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewAgent(null)}>
              <X size={13} className="mr-1.5" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !isDeleting && !open && setDeleteTarget(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
            <DialogDescription>
              Delete the application from{" "}
              <span className="font-semibold text-gray-900">{deleteTarget?.name}</span>? This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting && <Loader2 size={13} className="mr-1.5 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
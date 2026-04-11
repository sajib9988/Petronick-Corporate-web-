"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Building2,
  Loader2,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
} from "lucide-react";
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
import {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/service/company";
import CompanyForm, { CompanyFormValues, defaultCompanyValues } from "@/components/admin/form/company-form";
// import CompanyForm, {
//   CompanyFormValues,
//   defaultCompanyValues,
// } from "@/components/admin/company-form";

// ─── Type ─────────────────────────────────────────────────
type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string | null;
  order: number;
  isVisible: boolean;
  revenueStage: string | null;
  createdAt: string;
};

// ─── Page ─────────────────────────────────────────────────
export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Create
  const [showCreate, setShowCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Edit
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ─── Fetch ──────────────────────────────────────────────
  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllCompanies({ search, limit: 100 });
      setCompanies(result?.data ?? []);
    } catch {
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => fetchCompanies(), 300);
    return () => clearTimeout(timer);
  }, [fetchCompanies]);

  // ─── Create ─────────────────────────────────────────────
  const handleCreate = async (values: CompanyFormValues, logoFile: File | null) => {
    if (!logoFile) {
      setCreateError("Logo is required");
      return;
    }
    setIsCreating(true);
    setCreateError("");
    try {
      const fd = new FormData();
      fd.append("logo", logoFile);
      fd.append(
        "data",
        JSON.stringify({
          name: values.name,
          description: values.description,
          website: values.website || undefined,
          order: values.order,
          isVisible: values.isVisible,
          revenueStage: values.revenueStage || undefined,
        }),
      );
      const result = await createCompany(fd);
      if (!result?.success) {
        setCreateError(result?.message || "Failed to create company");
        return;
      }
      setShowCreate(false);
      fetchCompanies();
    } catch {
      setCreateError("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  // ─── Edit ───────────────────────────────────────────────
  const handleEdit = async (values: CompanyFormValues, logoFile: File | null) => {
    if (!editCompany) return;
    setIsEditing(true);
    setEditError("");
    try {
      const fd = new FormData();
      if (logoFile) fd.append("logo", logoFile);
      fd.append(
        "data",
        JSON.stringify({
          name: values.name,
          description: values.description,
          website: values.website || undefined,
          order: values.order,
          isVisible: values.isVisible,
          revenueStage: values.revenueStage || undefined,
        }),
      );
      const result = await updateCompany(editCompany.id, fd);
      if (!result?.success) {
        setEditError(result?.message || "Failed to update company");
        return;
      }
      setEditCompany(null);
      fetchCompanies();
    } catch {
      setEditError("Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  // ─── Delete ─────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteCompany(deleteId);
      setDeleteId(null);
      fetchCompanies();
    } finally {
      setIsDeleting(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────
  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Companies</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage your business units
          </p>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={14} className="mr-1" />
          New Company
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <Input
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-white rounded-xl border border-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : companies.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 px-6 py-16 text-center">
          <Building2 size={28} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">
            {search ? "No companies found." : "No companies yet."}
          </p>
          {!search && (
            <Button size="sm" className="mt-4" onClick={() => setShowCreate(true)}>
              <Plus size={13} className="mr-1" />
              Add Company
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className={`bg-white rounded-xl border transition-all group hover:shadow-sm ${
                company.isVisible
                  ? "border-gray-100 hover:border-gray-200"
                  : "border-dashed border-gray-200 opacity-60"
              }`}
            >
              {/* Logo + actions */}
              <div className="flex items-start justify-between p-4 pb-3">
                <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden flex-shrink-0">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                  <button
                    onClick={() => setEditCompany(company)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteId(company.id)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {company.name}
                  </h3>
                  {company.isVisible ? (
                    <Eye size={12} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <EyeOff size={12} className="text-gray-300 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  {company.description}
                </p>
                <div className="flex items-center justify-between">
                  {company.revenueStage && (
                    <span className="text-[10px] bg-amber-50 text-amber-700 font-medium px-2 py-0.5 rounded-full">
                      {company.revenueStage}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400 ml-auto">
                    Order: {company.order}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create Dialog ── */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Company</DialogTitle>
            <DialogDescription>
              Add a new business unit to your portfolio.
            </DialogDescription>
          </DialogHeader>
          <CompanyForm
            defaultValues={defaultCompanyValues}
            onSubmit={handleCreate}
            onCancel={() => {
              setShowCreate(false);
              setCreateError("");
            }}
            submitLabel="Create Company"
            isLoading={isCreating}
            error={createError}
          />
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog
        open={!!editCompany}
        onOpenChange={(open) => !open && setEditCompany(null)}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Update the company information.
            </DialogDescription>
          </DialogHeader>
          {editCompany && (
            <CompanyForm
              defaultValues={{
                name: editCompany.name,
                description: editCompany.description,
                website: editCompany.website ?? "",
                order: editCompany.order,
                isVisible: editCompany.isVisible,
                revenueStage: editCompany.revenueStage ?? "",
              }}
              existingLogo={editCompany.logo}
              onSubmit={handleEdit}
              onCancel={() => {
                setEditCompany(null);
                setEditError("");
              }}
              submitLabel="Save Changes"
              isLoading={isEditing}
              error={editError}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ── Delete Dialog ── */}
      <Dialog
        open={!!deleteId}
        onOpenChange={(open) => !isDeleting && !open && setDeleteId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              This will permanently delete the company and its logo. This cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting && (
                <Loader2 size={13} className="mr-1.5 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
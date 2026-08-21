"use client";

export const dynamic = 'force-dynamic';
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
  LayoutGrid,
  MoreVertical,
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
import { Badge } from "@/components/ui/badge"; // Ensure you have Badge component in shadcn
import {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/service/company";
import CompanyForm, { CompanyFormValues, defaultCompanyValues } from "@/components/admin/form/company-form";

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

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllCompanies({ search, limit: 100, revalidate: false });
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
      fd.append("data", JSON.stringify({ ...values }));
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

  const handleEdit = async (values: CompanyFormValues, logoFile: File | null) => {
    if (!editCompany) return;
    setIsEditing(true);
    setEditError("");
    try {
      const fd = new FormData();
      if (logoFile) fd.append("logo", logoFile);
      fd.append("data", JSON.stringify({ ...values }));
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 lg:p-0">
      
      {/* --- Morden Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Portfolio Companies</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor your business units across the ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
            />
          </div>
          <Button onClick={() => setShowCreate(true)} className="shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Company
          </Button>
        </div>
      </div>

      {/* --- List Content --- */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse shadow-sm" />
          ))}
        </div>
      ) : companies.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed py-24 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
             <Building2 size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No companies found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
            {search ? `We couldn't find any results for "${search}"` : "Get started by adding your first business unit to the portfolio."}
          </p>
          {!search && (
            <Button variant="outline" className="mt-6" onClick={() => setShowCreate(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                !company.isVisible && "opacity-75 grayscale-[0.5] border-dashed"
              }`}
            >
              {/* Top Banner/Action Row */}
              <div className="flex items-center justify-between p-5 pb-0">
              <div className="w-20 h-16 flex items-start justify-start overflow-hidden transition-transform group-hover:scale-110">
  <img
    src={company.logo}
    alt={company.name}
    className="w-full h-full object-contain object-left-top"
  />
</div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {company.website && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                      <a href={company.website} target="_blank" rel="noreferrer">
                        <ExternalLink size={14} className="text-muted-foreground hover:text-primary" />
                      </a>
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-amber-50 hover:text-amber-600"
                    onClick={() => setEditCompany(company)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600"
                    onClick={() => setDeleteId(company.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Company Body */}
              <div className="p-5 pt-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                    {company.name}
                  </h3>
                  {company.isVisible ? (
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 text-[10px] py-0 px-2 h-5">
                      <Eye className="w-3 h-3 mr-1" /> Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-400 border-gray-200 text-[10px] py-0 px-2 h-5">
                      <EyeOff className="w-3 h-3 mr-1" /> Hidden
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 min-h-[45px]">
                  {company.description}
                </p>

                <div className="pt-3 border-t flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {company.revenueStage || "N/A"}
                  </div>
                  <div className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    Order: {company.order}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Dialogs (Create, Edit, Delete) --- */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-primary p-6 text-white">
            <DialogTitle className="text-xl">New Company</DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              Add a new business unit to your portfolio.
            </DialogDescription>
          </div>
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            <CompanyForm
              onSubmit={handleCreate}
              onCancel={() => setShowCreate(false)}
              submitLabel="Create Business Unit"
              isLoading={isCreating}
              error={createError}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editCompany} onOpenChange={(open) => !open && setEditCompany(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl">
           <div className="bg-gray-900 p-6 text-white">
            <DialogTitle className="text-xl">Edit {editCompany?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update company profile and business details.
            </DialogDescription>
          </div>
          <div className="p-6 overflow-y-auto max-h-[80vh]">
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
                onCancel={() => setEditCompany(null)}
                submitLabel="Save Changes"
                isLoading={isEditing}
                error={editError}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={(open) => !isDeleting && !open && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Company?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All data related to this company will be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setDeleteId(null)} disabled={isDeleting}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? <Loader2 size={14} className="animate-spin mr-2" /> : <Trash2 size={14} className="mr-2" />}
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
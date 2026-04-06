"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Layers, Loader2, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { createPage, deletePage, getAllPages } from "@/service/cms";

type Page = {
  id: string;
  slug: string;
  title: string;
  sections: { id: string }[];
  createdAt: string;
};

export default function PagesPage() {
  const [data, setData] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    slug: string;
    title: string;
  }>({ open: false, slug: "", title: "" });
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ title: "", slug: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const fetchPages = useCallback(async () => {
    setIsLoading(true);
    try {
   
      const res= await getAllPages()
      
      const result = await res.json();
      setData(result.data ?? []);
    } catch {
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleTitleChange = (value: string) => {
    setCreateForm({
      title: value,
      slug: value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    });
  };

  const handleCreate = async () => {
    if (!createForm.title || !createForm.slug) {
      setCreateError("Title and slug are required");
      return;
    }
    setIsCreating(true);
    setCreateError("");
    try {
    
      const res = await createPage(createForm);
      const result = await res.json();
      if (!result.success) {
        setCreateError(result.message || "Failed to create page");
        return;
      }
      setShowCreate(false);
      setCreateForm({ title: "", slug: "" });
      fetchPages();
    } catch {
      setCreateError("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePage(deleteDialog.slug);
      setDeleteDialog({ open: false, slug: "", title: "" });
      fetchPages();
    } catch {
      console.error("Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Pages</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage website pages and their sections
          </p>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={14} className="mr-1" />
          New Page
        </Button>
      </div>

      {/* Pages Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 bg-white rounded-xl border border-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 px-6 py-16 text-center">
          <Layers size={28} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">
            No pages yet. Create your first page.
          </p>
          <Button
            size="sm"
            className="mt-4"
            onClick={() => setShowCreate(true)}
          >
            <Plus size={13} className="mr-1" />
            Create Page
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.map((page) => (
            <div
              key={page.id}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all group"
            >
              {/* Title + slug */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {page.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    /{page.slug}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                    title="View page"
                  >
                    <ExternalLink size={13} />
                  </a>
                  <button
                    onClick={() =>
                      setDeleteDialog({
                        open: true,
                        slug: page.slug,
                        title: page.title,
                      })
                    }
                    className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete page"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Sections count */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                  <Layers size={11} />
                  {page.sections.length} section
                  {page.sections.length !== 1 ? "s" : ""}
                </span>

                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/pages/${page.slug}`}>
                    Manage Sections →
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Page Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Add a new page to manage its sections.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-1">
            {createError && (
              <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                {createError}
              </p>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Page Title *
              </label>
              <input
                className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
                placeholder="Home Page"
                value={createForm.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Slug *
              </label>
              <input
                className="w-full h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
                placeholder="home-page"
                value={createForm.slug}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, slug: e.target.value }))
                }
              />
              <p className="text-xs text-gray-400">
                Auto-generated from title
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreate(false);
                setCreateError("");
                setCreateForm({ title: "", slug: "" });
              }}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating && (
                <Loader2 size={13} className="mr-1.5 animate-spin" />
              )}
              Create Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          !isDeleting && setDeleteDialog((d) => ({ ...d, open }))
        }
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Delete{" "}
              <span className="font-semibold text-gray-900">
                {deleteDialog.title}
              </span>
              ? All sections will also be deleted. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog((d) => ({ ...d, open: false }))}
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
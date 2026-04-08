"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Plus, Layers, Loader2, Trash2, Pencil,
  Eye, EyeOff, ChevronDown, ChevronUp,
  ArrowLeft, Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  getPageBySlug, getSectionsByPage,
  createSection, updateSection, deleteSection,
} from "@/service/cms";
import SectionForm, {
  SectionFormValues, defaultSectionValues,
} from "@/components/admin/section-form";

// ─── Types ────────────────────────────────────────────────
type Section = {
  id: string;
  pageId: string;
  sectionType: string;
  content: Record<string, string>;
  image: string | null;
  sortOrder: number;
  isVisible: boolean;
};

type Page = {
  id: string;
  slug: string;
  title: string;
};

const TYPE_COLOR: Record<string, string> = {
  HERO: "bg-blue-50 text-blue-700",
  ABOUT: "bg-emerald-50 text-emerald-700",
  CTA: "bg-amber-50 text-amber-700",
  FEATURE: "bg-purple-50 text-purple-700",
  TESTIMONIALS: "bg-pink-50 text-pink-700",
  GALLERY: "bg-orange-50 text-orange-700",
  CONTACT: "bg-teal-50 text-teal-700",
};

// ─── Page ─────────────────────────────────────────────────
export default function PageSectionsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // dialogs
  const [showCreate, setShowCreate] = useState(false);
  const [createError, setCreateError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [editSection, setEditSection] = useState<Section | null>(null);
  const [editError, setEditError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ─── Fetch ──────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    if (!slug) return;
    setIsLoading(true);
    try {
      const pageRes = await getPageBySlug(slug);
      if (!pageRes?.data) { router.push("/admin/pages"); return; }
      setPage(pageRes.data);

      const secRes = await getSectionsByPage(pageRes.data.id);
      setSections(
        (secRes?.data ?? []).sort((a: Section, b: Section) => a.sortOrder - b.sortOrder)
      );
    } catch {
      router.push("/admin/pages");
    } finally {
      setIsLoading(false);
    }
  }, [slug, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Create ──────────────────────────────────────────────
  const handleCreate = async (values: SectionFormValues, imageFile: File | null) => {
    if (!page) return;
    setIsCreating(true);
    setCreateError("");
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify({ pageId: page.id, type: values.type, content: values.content, order: values.order, isVisible: values.isVisible }));
      if (imageFile) fd.append("image", imageFile);

      const result = await createSection(fd);
      if (!result?.success) { setCreateError(result?.message || "Failed"); return; }
      setShowCreate(false);
      fetchData();
    } catch {
      setCreateError("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  // ─── Edit ────────────────────────────────────────────────
  const handleEdit = async (values: SectionFormValues, imageFile: File | null) => {
    if (!editSection) return;
    setIsEditing(true);
    setEditError("");
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify({ type: values.type, content: values.content, order: values.order, isVisible: values.isVisible }));
      if (imageFile) fd.append("image", imageFile);

      const result = await updateSection(editSection.id, fd);
      if (!result?.success) { setEditError(result?.message || "Failed"); return; }
      setEditSection(null);
      fetchData();
    } catch {
      setEditError("Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  // ─── Toggle Visibility ───────────────────────────────────
  const handleToggle = async (section: Section) => {
    const fd = new FormData();
    fd.append("data", JSON.stringify({ isVisible: !section.isVisible }));
    await updateSection(section.id, fd);
    setSections((prev) =>
      prev.map((s) => s.id === section.id ? { ...s, isVisible: !s.isVisible } : s)
    );
  };

  // ─── Reorder ─────────────────────────────────────────────
  const handleMove = async (index: number, dir: "up" | "down") => {
    const next = [...sections];
    const target = dir === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    const updated = next.map((s, i) => ({ ...s, sortOrder: i }));
    setSections(updated);
    try {
      const a = updated[index], b = updated[target];
      const fdA = new FormData(); fdA.append("data", JSON.stringify({ order: a.sortOrder }));
      const fdB = new FormData(); fdB.append("data", JSON.stringify({ order: b.sortOrder }));
      await Promise.all([updateSection(a.id, fdA), updateSection(b.id, fdB)]);
    } catch { fetchData(); }
  };

  // ─── Delete ──────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteSection(deleteId);
      setDeleteId(null);
      fetchData();
    } finally {
      setIsDeleting(false);
    }
  };

  // ─── Loading skeleton ────────────────────────────────────
  if (isLoading) return (
    <div className="space-y-4 max-w-3xl">
      <div className="h-8 w-48 bg-gray-100 animate-pulse rounded-lg" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-white rounded-xl border border-gray-100 animate-pulse" />
      ))}
    </div>
  );

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="space-y-4 max-w-3xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/pages"><ArrowLeft size={16} /></Link>
          </Button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{page?.title}</h2>
            <p className="text-xs text-gray-400 font-mono">/{page?.slug}</p>
          </div>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={14} className="mr-1" /> Add Section
        </Button>
      </div>

      {/* Section list */}
      {sections.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 px-6 py-16 text-center">
          <Layers size={28} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No sections yet.</p>
          <Button size="sm" className="mt-4" onClick={() => setShowCreate(true)}>
            <Plus size={13} className="mr-1" /> Add Section
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {sections.map((sec, i) => (
            <div key={sec.id} className={`bg-white rounded-xl border transition-all group ${sec.isVisible ? "border-gray-100 hover:border-gray-200" : "border-dashed border-gray-200 opacity-60"}`}>
              <div className="flex items-center gap-3 p-4">

                {/* Up/Down */}
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => handleMove(i, "up")} disabled={i === 0}
                    className="p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors">
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => handleMove(i, "down")} disabled={i === sections.length - 1}
                    className="p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors">
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* Image thumb */}
                {sec.image ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={sec.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={16} className="text-gray-300" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TYPE_COLOR[sec.sectionType] ?? "bg-gray-50 text-gray-600"}`}>
                      {sec.sectionType}
                    </span>
                    <span className="text-[10px] text-gray-400">#{sec.sortOrder}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {Object.values(sec.content ?? {}).filter(Boolean).slice(0, 2).join(" · ") || "No content"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleToggle(sec)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                    {sec.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => setEditSection(sec)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setDeleteId(sec.id)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 size={13} />
                  </button>
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
            <DialogTitle>Add Section</DialogTitle>
            <DialogDescription>Choose a type and fill content.</DialogDescription>
          </DialogHeader>
          <SectionForm
            defaultValues={defaultSectionValues}
            onSubmit={handleCreate}
            onCancel={() => { setShowCreate(false); setCreateError(""); }}
            submitLabel="Add Section"
            isLoading={isCreating}
            error={createError}
          />
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog open={!!editSection} onOpenChange={(open) => !open && setEditSection(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Update the section content.</DialogDescription>
          </DialogHeader>
          {editSection && (
            <SectionForm
              defaultValues={{
                type: editSection.sectionType as any,
                content: editSection.content ?? {},
                order: editSection.sortOrder,
                isVisible: editSection.isVisible,
              }}
              existingImage={editSection.image}
              onSubmit={handleEdit}
              onCancel={() => { setEditSection(null); setEditError(""); }}
              submitLabel="Save Changes"
              isLoading={isEditing}
              error={editError}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ── Delete Dialog ── */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !isDeleting && !open && setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
            <DialogDescription>
              This will permanently delete the section. Cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
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
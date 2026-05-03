"use client";

import { use, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SectionForm, { SectionFormValues } from "@/components/admin/section-form";
import { getPageBySlug, createSection, getSectionsByPage, updateSection, deleteSection } from "@/service/cms";
import { is } from "zod/v4/locales";
import { set } from "zod";
import { toast } from "react-hot-toast";
import { TYPE_COLORS, TYPE_LABELS } from "@/lib/type";
import { Eye, EyeOff, ImageIcon, Layers, Loader2, Pencil, Plus, Trash2 } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [page, setPage] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);  
  const [isLoading, setIsLoading] = useState(false);

  // create
   const [showCreate, setShowCreate] = useState(false);
   const [isCreating, setIsCreating] = useState(false);
   const [createError, setCreateError] = useState<string | null>(null);

   // update
   const [editSection, setEditSection] = useState<any>(null);
   const [isEditing, setIsEditing] = useState(false);
   const [editError, setEditError] = useState<string | null>(null);

   const [deleteId, setDeleteId] = useState<string | null>(null);
   const  [isDeleting, setIsDeleting] = useState(false);

  // 🔹 Load page details by slug
  useEffect(() => {
    const loadPage = async () => {
      try {
        const res = await getPageBySlug(slug);
        if (res?.data) setPage(res.data);
      } catch (err) {
        console.error("Error loading page:", err);
      }
    };
    loadPage();
  }, [slug]);

const loadSections = useCallback(async () => {
  if(!page?.id) return;

  try{
    const res = await getSectionsByPage(page.id);
    if(res?.data) 
    setSections(res?.data ?? []);
  }
  catch{
    setSections([]);
  }
  finally{
    setIsLoading(false);
  }
}, [page?.id]);

useEffect (() =>{
  if(page?.id) loadSections();
  else setIsLoading(false);


}, [loadSections])

const handleCreate = async (
  values: SectionFormValues,
  imageFile: File | null
) => {
  if (!page?.id) return;
  setIsCreating(true);
  setCreateError("");

  try {
    const fd = new FormData();
    fd.append("data", JSON.stringify({
      type: values.type,
      content: values.content,
      pageId: page.id,
      order: values.order,
      isVisible: values.isVisible,
    }));
    if (imageFile) fd.append("image", imageFile);

    const res = await createSection(fd);

    if (res?.success) {
      toast.success("Section created successfully ✅");
      setShowCreate(false);
      loadSections();
    } else {
      toast.error("Failed to create section ❌");
    }

  } catch {                                              // ✅ try এর বাইরে
    setCreateError("Error creating section.");
    toast.error("Error creating section ❌");
  } finally {                                            // ✅ try এর বাইরে
    setIsCreating(false);
  }
};

const handleEditSection = async (
  values: SectionFormValues,
  imageFile: File | null
) => {
  if (!editSection) return;
  setIsEditing(true);
  setEditError("");

  try {
    const fd = new FormData();
    fd.append("data", JSON.stringify({
      type: values.type,
      content: values.content,
      pageId: page.id,
      order: values.order,
      isVisible: values.isVisible,
    }));
    if (imageFile) fd.append("image", imageFile);

    const res = await updateSection(editSection.id, fd);

    if (res?.success) {
      toast.success("Section updated successfully ✅");
      setEditSection(null);
      loadSections();
    } else {
      toast.error("Failed to update section ❌");
    }

  } catch {                                              // ✅ try এর বাইরে
    setEditError("Error updating section.");
    toast.error("Error updating section ❌");
  } finally {                                            // ✅ try এর বাইরে
    setIsEditing(false);
  }
};






























  // 🔹 Create new section
  const handleCreateSection = async (values: SectionFormValues, imageFile: File | null) => {
    if (!page?.id) {
      alert("Page not loaded yet!");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append(
        "data",
   
          JSON.stringify({
      type: values.type,
      content: values.content,
      pageId: page.id,
      order: values.order,
      isVisible: values.isVisible,
        })
      );

      if (imageFile) formData.append("image", imageFile);

      const res = await createSection(formData);
      console.log("Section created:", res);

      alert("Section created successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error creating section ❌");
    } finally {
      setIsLoading(false);
    }
  };

const handleDelete =async () =>{
  if (!deleteId) return;
  setIsDeleting(true);

  const res = await deleteSection(deleteId);

  if(res?.success){
    toast.success("Section deleted successfully ✅");
    setDeleteId(null);
    loadSections();
  }
  else{
    toast.error("Failed to delete section ❌");
  }
}









  if (!page) return <p>Loading page...</p>;
return (
    <div className="space-y-5 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{page.title}</h2>
          <p className="text-sm text-gray-400 mt-0.5 font-mono">/{page.slug}</p>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={14} className="mr-1" />
          Add Section
        </Button>
      </div>

      {/* Sections List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-white rounded-xl border border-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : sections.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 px-6 py-16 text-center">
          <Layers size={28} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No sections yet.</p>
          <Button size="sm" className="mt-4" onClick={() => setShowCreate(true)}>
            <Plus size={13} className="mr-1" />
            Add First Section
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`bg-white rounded-xl border p-4 flex items-center justify-between group hover:shadow-sm transition-all ${
                section.isVisible
                  ? "border-gray-100 hover:border-gray-200"
                  : "border-dashed border-gray-200 opacity-60"
              }`}
            >
              {/* Left Info */}
              <div className="flex items-center gap-3">
                {/* Image preview */}
                {section.image ? (
                  <div className="w-10 h-10 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={section.image}
                      alt="section"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={14} className="text-gray-300" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        TYPE_COLORS[section.sectionType] ?? "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {TYPE_LABELS[section.sectionType] ?? section.sectionType}
                    </span>
                    {section.isVisible ? (
                      <Eye size={12} className="text-emerald-500" />
                    ) : (
                      <EyeOff size={12} className="text-gray-300" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Order: {section.sortOrder}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditSection(section)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => setDeleteId(section.id)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create Dialog ── */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogDescription>
              Add a section to <span className="font-semibold">{page.title}</span>.
            </DialogDescription>
          </DialogHeader>
          <SectionForm
            onSubmit={handleCreate}
            onCancel={() => {
              setShowCreate(false);
              setCreateError("");
            }}
            submitLabel="Create Section"
            isLoading={isCreating}
           error={createError ?? undefined}
          />
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog
        open={!!editSection}
        onOpenChange={(open) => !open && setEditSection(null)}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Update this section's content.</DialogDescription>
          </DialogHeader>
          {editSection && (
            <SectionForm
              defaultValues={{
                type: editSection.sectionType as SectionFormValues["type"],
                content: editSection.content as Record<string, string>,
                order: editSection.sortOrder,
                isVisible: editSection.isVisible,
              }}
              existingImage={editSection.image}
              onSubmit={handleEditSection}
              onCancel={() => {
                setEditSection(null);
                setEditError("");
              }}
              submitLabel="Save Changes"
              isLoading={isEditing}
              error={editError ?? undefined}
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
            <DialogTitle>Delete Section</DialogTitle>
            <DialogDescription>
              This section will be permanently deleted. This cannot be undone.
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
              {isDeleting && <Loader2 size={13} className="mr-1.5 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
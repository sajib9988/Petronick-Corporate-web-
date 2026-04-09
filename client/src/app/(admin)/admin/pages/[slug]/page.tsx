"use client";

import { type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { SECTION_TYPES, SectionType, FIELDS } from "@/components/admin/section/section.constant";
import { sectionSchema } from "@/components/admin/section/section.schema";

type SectionFormValues = z.infer<typeof sectionSchema>;

const defaultSectionValues: SectionFormValues = {
  type: "HERO",
  content: {},
  order: 0,
  isVisible: true,
};
interface SectionFormProps {
  defaultValues?: SectionFormValues;
  existingImage?: string | null;
  onSubmit: (values: SectionFormValues, imageFile: File | null) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string;
}

// ─── Component ────────────────────────────────────────────
export default function SectionForm({
  defaultValues = defaultSectionValues,
  existingImage,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isLoading = false,
  error,
}: SectionFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(existingImage ?? null);

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema) as Resolver<SectionFormValues>,
    defaultValues,
  });

  const selectedType = form.watch("type");
  const fields = FIELDS[selectedType] ?? [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleTypeChange = (val: SectionType, fieldOnChange: (v: SectionType) => void) => {
    fieldOnChange(val);
    form.setValue("content", {});
  };

  const handleSubmit = async (values: SectionFormValues) => {
    await onSubmit(values, imageFile);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

      {error && (
        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Section Type */}
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Section Type</FormLabel>
            <Select
              value={field.value as SectionType}
              onValueChange={(v) => handleTypeChange(v as SectionType, field.onChange)}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SECTION_TYPES.map((t: SectionType) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Dynamic Content Fields — watch + setValue দিয়ে */}
      {fields.length > 0 && (
        <div className="space-y-3 border border-gray-100 rounded-xl p-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Content
          </p>
          {fields.map(({ key, label, multiline }: { key: string; label: string; multiline?: boolean }) => {
            const contentValues = form.watch("content") as Record<string, string> | undefined;
            const value = contentValues?.[key] ?? "";
            return (
              <div key={key} className="space-y-1">
                <label className="text-xs font-medium text-gray-600">
                  {label}
                </label>
                {multiline ? (
                  <Textarea
                    placeholder={label}
                    className="min-h-[64px] resize-none text-sm"
                    value={value}
                    onChange={(e) =>
                      form.setValue("content", {
                        ...form.getValues("content"),
                        [key]: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Input
                    placeholder={label}
                    value={value}
                    onChange={(e) =>
                      form.setValue("content", {
                        ...form.getValues("content"),
                        [key]: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Image Upload */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">
          Background Image{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </p>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-28 object-cover rounded-lg"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-xs text-gray-500 w-full
            file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0
            file:text-xs file:bg-gray-100 file:text-gray-700
            hover:file:bg-gray-200 cursor-pointer"
        />
      </div>

      {/* Order + Visibility */}
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort Order</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value as string | number | undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isVisible"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel>Visible</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 h-8">
                  <Switch
                    checked={Boolean(field.value)}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                  <span className="text-xs text-gray-500">
                    {field.value ? "Visible" : "Hidden"}
                  </span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 size={13} className="mr-1.5 animate-spin" />}
          {submitLabel}
        </Button>
      </div>

    </form>
  );
}
"use client";

import { type Resolver, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, X, Upload, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { SECTION_TYPES, SectionType, FIELDS } from "./section/section.constant";
import { sectionSchema } from "./section/section.schema";

type SectionFormValues = z.infer<typeof sectionSchema>;

export type { SectionFormValues };

const defaultSectionValues: SectionFormValues = {
  type: "HERO" as const,
  content: {},
  order: 0,
  isVisible: true,
};

interface SectionFormProps {
  defaultValues?: SectionFormValues;
  existingImage?: string | null;
  onSubmit: (values: SectionFormValues, imageFile: File | null) => Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string;
}

export default function SectionForm({
  defaultValues = defaultSectionValues,
  existingImage,
  onSubmit,
  onCancel,
  onClose,
  submitLabel = "Update",
  isLoading = false,
  error,
}: SectionFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingImage ?? null
  );

  const form = useForm<SectionFormValues>({
    defaultValues,
    resolver: zodResolver(sectionSchema) as Resolver<SectionFormValues>,
  });

  const selectedType = form.watch("type");
  const fields = FIELDS[selectedType] ?? [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleTypeChange = (val: SectionType) => {
    form.setValue("type", val);
    form.setValue("content", {});
  };

  return (
    <div className="relative bg-white rounded-xl shadow-xl w-full max-w-5xl mx-auto">
      {/* Header with Close Icon */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">Edit Section</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values, imageFile))}
          className="p-6"
        >
          {error && (
            <p className="mb-6 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          {/* Main 2-column layout: content (left, wider) + image/visibility (right sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── LEFT: Type, Order, Dynamic Fields ── */}
            <div className="lg:col-span-2 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Controller
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Section Type
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(v) => handleTypeChange(v as SectionType)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="w-[--radix-select-trigger-width]"
                        >
                          {SECTION_TYPES.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <Controller
                  name="order"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Order
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Dynamic Fields — 2 columns within the left area */}
              {fields.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border border-gray-100 bg-gray-50/50 p-5 rounded-xl">
                  {fields.map(
                    ({ key, label, multiline }: { key: string; label: string; multiline?: boolean }) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={`content.${key}` as `content.${string}`}
                        render={({ field }) => (
                          <FormItem className={multiline ? "sm:col-span-2" : ""}>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              {label}
                            </FormLabel>
                            <FormControl>
                              {multiline ? (
                                <Textarea
                                  {...field}
                                  value={(field.value as string) || ""}
                                  className="min-h-[80px] resize-y"
                                  placeholder={`Enter ${label.toLowerCase()}`}
                                />
                              ) : (
                                <Input
                                  {...field}
                                  value={(field.value as string) || ""}
                                  placeholder={`Enter ${label.toLowerCase()}`}
                                />
                              )}
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            {/* ── RIGHT: Sticky sidebar — Image + Visibility ── */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-4 space-y-5">
                {/* Image Upload Card */}
                <div className="space-y-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Background Image
                  </FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-gray-400 transition-colors text-center bg-white">
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      {imagePreview ? (
                        <div className="relative w-full">
                          <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow border border-gray-100">
                            <Upload size={13} className="text-gray-500" />
                          </div>
                        </div>
                      ) : (
                        <div className="py-8">
                          <ImageIcon size={28} className="mx-auto text-gray-300" />
                          <p className="mt-2 text-sm font-medium text-gray-600">
                            Click to upload
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                  {existingImage && !imageFile && (
                    <p className="text-xs text-gray-500">
                      Current image will be kept unless replaced.
                    </p>
                  )}
                </div>

                {/* Visibility Toggle */}
                <Controller
                  name="isVisible"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Visibility
                      </FormLabel>
                      <FormControl>
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className={`w-full h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors ${
                            field.value
                              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                              : "border-gray-300 bg-gray-50 text-gray-500"
                          }`}
                        >
                          <span className="text-sm font-semibold">
                            {field.value ? "Visible" : "Hidden"}
                          </span>
                          <span className="text-xs">Tap to toggle</span>
                        </button>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 mt-6 border-t">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="animate-spin mr-2" size={16} />}
              {submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
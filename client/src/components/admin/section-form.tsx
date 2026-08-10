"use client";

import { type Resolver, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, X, Upload } from "lucide-react";

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

import {
  SECTION_TYPES,
  SECTION_TYPE_LABELS,
  type SectionType,
  FIELDS,
} from "./section/section.constant";

import { sectionSchema } from "./section/section.schema";

// ============================================================
// FORM TYPE
// ============================================================

type SectionFormValues = z.infer<typeof sectionSchema>;

export type { SectionFormValues };

// ============================================================
// DEFAULT VALUES
// ============================================================

const defaultSectionValues: SectionFormValues = {
  type: "HERO",
  content: {},
  order: 0,
  isVisible: true,
};

// ============================================================
// PROPS
// ============================================================

interface SectionFormProps {
  defaultValues?: SectionFormValues;

  existingImage?: string | null;

  onSubmit: (
    values: SectionFormValues,
    imageFile: File | null
  ) => Promise<void>;

  onCancel?: () => void;

  onClose?: () => void;

  submitLabel?: string;

  isLoading?: boolean;

  error?: string;
}

// ============================================================
// COMPONENT
// ============================================================

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
  // ==========================================================
  // IMAGE STATE
  // ==========================================================

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    existingImage ?? null
  );

  // ==========================================================
  // FORM
  // ==========================================================

  const form = useForm<SectionFormValues>({
    defaultValues,
    resolver: zodResolver(sectionSchema) as Resolver<SectionFormValues>,
  });

  // ==========================================================
  // SELECTED SECTION TYPE
  // ==========================================================

  const selectedType = form.watch("type");

  const fields = FIELDS[selectedType] ?? [];

  // ==========================================================
  // IMAGE CHANGE
  // ==========================================================

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Optional size validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // ==========================================================
  // SECTION TYPE CHANGE
  // ==========================================================

  const handleTypeChange = (value: SectionType) => {
    form.setValue("type", value);

    // Previous section content clear
    form.setValue("content", {});
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (values: SectionFormValues) => {
    await onSubmit(values, imageFile);
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="w-full bg-white rounded-2xl">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Edit Section
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Configure your website section content.
          </p>
        </div>

        {onClose && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </Button>
        )}
      </div>

      {/* ======================================================
          FORM
      ====================================================== */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 p-6"
        >
          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* ==================================================
              SECTION TYPE
          ================================================== */}

          <Controller
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Section Type
                </FormLabel>

                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    handleTypeChange(value as SectionType)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select section type" />
                  </SelectTrigger>

                  <SelectContent>
                    {SECTION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {SECTION_TYPE_LABELS[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* ==================================================
              DYNAMIC CONTENT FIELDS
          ================================================== */}

          {fields.length > 0 && (
            <div className="space-y-5 rounded-xl border border-gray-100 bg-gray-50/50 p-5">
              {/* Section heading */}

              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-sm font-semibold text-gray-800">
                  {SECTION_TYPE_LABELS[selectedType]}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Enter the content for this section.
                </p>
              </div>

              {/* Dynamic fields */}

              {fields.map(
                ({
                  key,
                  label,
                  multiline,
                }: {
                  key: string;
                  label: string;
                  multiline?: boolean;
                }) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`content.${key}` as `content.${string}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {label}
                        </FormLabel>

                        <FormControl>
                          {multiline ? (
                            <Textarea
                              {...field}
                              value={(field.value as string) || ""}
                              className="min-h-[90px] resize-y bg-white"
                              placeholder={`Enter ${label.toLowerCase()}`}
                            />
                          ) : (
                            <Input
                              {...field}
                              value={(field.value as string) || ""}
                              className="bg-white"
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

          {/* ==================================================
              IMAGE UPLOAD
          ================================================== */}

          <div className="space-y-2">
            <FormLabel className="text-sm font-medium text-gray-700">
              Background Image
            </FormLabel>

            <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400">
              <input
                type="file"
                accept="image/*"
                id="section-image-upload"
                onChange={handleImageChange}
                className="hidden"
              />

              <label
                htmlFor="section-image-upload"
                className="flex cursor-pointer flex-col items-center gap-3"
              >
                {imagePreview ? (
                  <div className="relative mx-auto w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Section preview"
                      className="mx-auto max-h-52 rounded-lg object-cover shadow-sm"
                    />

                    <div className="absolute -right-2 -top-2 rounded-full bg-white p-1.5 shadow">
                      <Upload
                        size={16}
                        className="text-gray-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload
                      size={40}
                      className="mx-auto text-gray-400"
                    />

                    <p className="mt-3 text-sm text-gray-600">
                      Click to upload image
                    </p>

                    <p className="text-xs text-gray-400">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                )}
              </label>
            </div>

            {existingImage && !imageFile && (
              <p className="text-xs text-gray-500">
                Current image will be kept unless you upload a new
                image.
              </p>
            )}
          </div>

          {/* ==================================================
              VISIBILITY
          ================================================== */}

          <Controller
            name="isVisible"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div>
                  <FormLabel className="text-sm font-medium text-gray-800">
                    Section Visibility
                  </FormLabel>

                  <p className="mt-1 text-xs text-gray-500">
                    Control whether this section appears on the
                    website.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    field.value
                      ? "bg-emerald-500"
                      : "bg-gray-300"
                  }`}
                  aria-label="Toggle section visibility"
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      field.value
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </FormItem>
            )}
          />

          {/* ==================================================
              ORDER
          ================================================== */}

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Display Order
                </FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(event) =>
                      field.onChange(
                        Number(event.target.value)
                      )
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* ==================================================
              ACTION BUTTONS
          ================================================== */}

          <div className="flex gap-3 border-t pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading && (
                <Loader2
                  className="mr-2 animate-spin"
                  size={16}
                />
              )}

              {submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
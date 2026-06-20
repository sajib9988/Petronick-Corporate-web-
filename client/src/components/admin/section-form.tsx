"use client";

import { type Resolver, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";

// ✅ import from external files
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

// ─── Props ─────────────────────────
interface SectionFormProps {
  defaultValues?: SectionFormValues;
  existingImage?: string | null;
  onSubmit: (values: SectionFormValues, imageFile: File | null) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string;
}

// ─── Component ─────────────────────
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, imageFile))}
        className="space-y-4"
      >
        {error && <p className="text-xs text-red-500 bg-red-50 p-2 rounded">{error}</p>}

        {/* Section Type */}
        <Controller
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Type</FormLabel>
              <Select value={field.value} onValueChange={(v) => handleTypeChange(v as SectionType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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

        {/* Dynamic Fields */}
        {fields.length > 0 && (
          <div className="space-y-3 border p-3 rounded-lg">
          {fields.map(({ key, label, multiline }: { key: string; label: string; multiline?: boolean }) => (
              <FormField
                key={key}
                control={form.control}
                name={`content.${key}` as `content.${string}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {multiline ? (
                        <Textarea {...field} value={(field.value as string) || ""} />
                      ) : (
                        <Input {...field} value={(field.value as string) || ""} />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        )}

        {/* Image */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Buttons */}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin mr-1" size={14} />}
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
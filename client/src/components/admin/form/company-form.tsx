"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// ─── Schema ───────────────────────────────────────────────
const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
  isVisible: z.boolean().default(true),
  revenueStage: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;

export const defaultCompanyValues: CompanyFormValues = {
  name: "",
  description: "",
  website: "",
  order: 0,
  isVisible: true,
  revenueStage: "",
};

// ─── Props ────────────────────────────────────────────────
interface CompanyFormProps {
  defaultValues?: CompanyFormValues;
  existingLogo?: string | null;
  onSubmit: (values: CompanyFormValues, logoFile: File | null) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string;
}

// ─── Component ────────────────────────────────────────────
export default function CompanyForm({
  defaultValues = defaultCompanyValues,
  existingLogo,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isLoading = false,
  error,
}: CompanyFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(existingLogo ?? null);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues,
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (values: CompanyFormValues) => {
    await onSubmit(values, logoFile);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      {error && (
        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name *</FormLabel>
            <FormControl>
              <Input placeholder="Petronick Media" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief description of the company..."
                className="min-h-[80px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Logo Upload */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">
          Logo *{" "}
          {existingLogo && (
            <span className="text-gray-400 font-normal">(leave empty to keep current)</span>
          )}
        </p>
        {logoPreview && (
          <div className="w-16 h-16 rounded-xl border border-gray-100 overflow-hidden bg-gray-50">
            <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-1" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="text-xs text-gray-500 w-full
            file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0
            file:text-xs file:bg-gray-100 file:text-gray-700
            hover:file:bg-gray-200 cursor-pointer"
        />
      </div>

      {/* Website */}
      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Revenue Stage */}
      <FormField
        control={form.control}
        name="revenueStage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Revenue Stage</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Pre-revenue, Growth..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Order + Visibility */}
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort Order</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
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
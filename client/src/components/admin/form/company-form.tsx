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

// ─── Schema ─────────────────────────────
const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  order: z.number().int(),
  isVisible: z.boolean(),
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

// ─── Props ─────────────────────────────
interface CompanyFormProps {
  defaultValues?: CompanyFormValues;
  existingLogo?: string | null;
  onSubmit: (values: CompanyFormValues, logoFile: File | null) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string;
}

// ─── Component ─────────────────────────
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
  const [logoPreview, setLogoPreview] = useState<string | null>(
    existingLogo ?? null
  );

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultValues as any,
  });

  // ─── Logo Change ─────────────────────
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // ─── Submit ─────────────────────────
  const handleSubmit = async (values: CompanyFormValues) => {
    await onSubmit(values, logoFile);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
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
                  placeholder="Brief description..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Logo Upload */}
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Logo{" "}
            {existingLogo && (
              <span className="text-gray-400 text-xs">
                (leave empty to keep current)
              </span>
            )}
          </p>

          {logoPreview && (
            <div className="w-16 h-16 border rounded-lg overflow-hidden">
              <img
                src={logoPreview}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <input type="file" accept="image/*" onChange={handleLogoChange} />
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

        {/* Revenue */}
        <FormField
          control={form.control}
          name="revenueStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Revenue Stage</FormLabel>
              <FormControl>
                <Input placeholder="Growth / Pre-revenue" {...field} />
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
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
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
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="text-xs">
                      {field.value ? "Visible" : "Hidden"}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Loader2 size={14} className="mr-1 animate-spin" />
            )}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
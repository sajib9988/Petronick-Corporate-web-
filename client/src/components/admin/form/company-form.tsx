"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Building2, Globe, BarChart3, ImagePlus, AlertCircle, Layers } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

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

interface CompanyFormProps {
  defaultValues?: CompanyFormValues;
  existingLogo?: string | null;
  onSubmit: (values: CompanyFormValues, logoFile: File | null) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  error?: string;
}

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultValues,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
          </Alert>
        )}

        {/* --- Section 1: General Info --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">General Information</h3>
          </div>
          <Separator className="opacity-50" />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold">Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Petronick Media" className="bg-gray-50/50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold">Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe the business unit..."
                    className="min-h-25 bg-gray-50/50 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* --- Section 2: Branding --- */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <ImagePlus className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Branding</h3>
          </div>
          <Separator className="opacity-50" />

          <div className="flex items-center gap-4 p-4 border-2 border-dashed rounded-xl bg-gray-50/30">
            <div className="relative w-20 h-20 rounded-lg border bg-white flex items-center justify-center overflow-hidden shadow-sm">
              {logoPreview ? (
                <img src={logoPreview} alt="Preview" className="w-full h-full object-contain p-2" />
              ) : (
                <Building2 className="w-8 h-8 text-gray-200" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Company Logo</p>
              <p className="text-[11px] text-muted-foreground leading-tight">
                Recommended: Square PNG/SVG <br/> Max size 2MB.
              </p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2 h-8 text-xs"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleLogoChange}
                aria-label="Company logo"
                title="Company logo"
              />
            </div>
          </div>
        </div>

        {/* --- Section 3: Business Details --- */}
        <div className="space-y-4 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Business Details</h3>
          </div>
          <Separator className="opacity-50" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold">Website</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="https://..." className="pl-9 bg-gray-50/50" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="revenueStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold">Revenue Stage</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BarChart3 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Growth / Pre-revenue" className="pl-9 bg-gray-50/50" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Display Order
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-gray-50/50"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isVisible"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel className="text-xs font-bold mb-3">Visibility</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-md border h-10 px-3">
                      <Switch checked={field.value} onCheckedChange={field.onChange} aria-label="Toggle visibility" />
                      <span className="text-xs font-medium">
                        {field.value ? "Publicly Visible" : "Hidden"}
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="ghost" onClick={onCancel} className="text-xs h-9 px-6">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="text-xs h-9 px-8 shadow-md">
            {isLoading && <Loader2 size={14} className="mr-2 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
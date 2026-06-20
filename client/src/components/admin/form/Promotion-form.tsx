"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// ─── Schema ─────────────────────────────
const agentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  focus: z.string().min(1, "Focus area is required"),
 focusType: z
  .enum(["B2B", "B2C", "Both"])
  .refine(Boolean, {
    message: "Please select B2B, B2C, or Both",
  }),
  message: z.string().min(10, "Please write at least 10 characters"),
  businessUnits: z.array(z.string()).min(1, "Select at least one business unit"),
});

type AgentFormValues = z.infer<typeof agentSchema>;

// ─── Static companies (API call না করে) ──
const COMPANIES = [
  "Fusion DigiWeb",
  "Germ Solutions Shop",
  "Germ Shooters Co",
  "Petron Fulfillment",
  "Treaded Brands",
  "Celebrations Are Sweet LLC",
  "Profit Pioneers",
];

// ─── Component ───────────────────────────
export default function PromotionAgentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      experience: "",
      focus: "",
      focusType: undefined,
      message: "",
      businessUnits: [],
    },
  });

  // ─── Toggle business unit ──────────────
  const toggleUnit = (name: string, current: string[]) => {
    if (current.includes(name)) return current.filter((u) => u !== name);
    return [...current, name];
  };

  // ─── Submit ───────────────────────────
  const handleSubmit = async (values: AgentFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1"}/agents`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            location: values.location,
            experience: values.experience,
            focus: `${values.focus} (${values.focusType})`,
            message: values.message,
            businessUnits: values.businessUnits,
          }),
        }
      );

      const result = await res.json();

      if (!result?.success) {
        setError(result?.message || "Submission failed. Please try again.");
        return;
      }

      setIsSuccess(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Success UI ───────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Application Submitted!
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            Thank you for applying. We'll review your application and contact
            you within 5 business days.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSuccess(false)}
        >
          Submit another application
        </Button>
      </div>
    );
  }

  // ─── Form UI ─────────────────────────
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5"
      >
        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
            {error}
          </p>
        )}

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone *</FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 8900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location *</FormLabel>
                <FormControl>
                  <Input placeholder="Pittsburgh, PA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Experience *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 3 years in B2B sales, retail management..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Focus Area + B2B/B2C */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="focus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Focus Area *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Marketing, Sales, Digital..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* B2B / B2C */}
          <FormField
            control={form.control}
            name="focusType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>B2B or B2C Focus *</FormLabel>
                <FormControl>
                  <div className="flex gap-2 mt-0.5">
                    {(["B2B", "B2C", "Both"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => field.onChange(type)}
                        className={`flex-1 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                          field.value === type
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Business Units */}
        <FormField
          control={form.control}
          name="businessUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Business Units *</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2 mt-1">
                  {COMPANIES.map((company) => {
                    const selected = field.value.includes(company);
                    return (
                      <button
                        key={company}
                        type="button"
                        onClick={() =>
                          field.onChange(
                            toggleUnit(company, field.value as string[])
                          )
                        }
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selected
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {selected && <CheckCircle2 size={12} />}
                        {company}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statement of Interest *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us why you want to become a Promotion Agent and what value you bring..."
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11"
          disabled={isLoading}
        >
          {isLoading && <Loader2 size={16} className="mr-2 animate-spin" />}
          Submit Application
        </Button>
      </form>
    </Form>
  );
}

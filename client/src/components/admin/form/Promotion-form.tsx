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
  Form, // ✅ IMPORTANT
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createAgent } from "@/service/agent";
import { getAllCompanies } from "@/service/company";

// ─── Schema ─────────────────────────────
const agentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  focus: z.string().min(1, "Focus area is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  businessUnits: z.array(z.string()).min(1, "Select at least one business unit"),
});

type AgentFormValues = z.infer<typeof agentSchema>;

// ─── Component ───────────────────────────
export default function PromotionAgentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);

  // ─── Fetch companies ───────────────────
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const result = await getAllCompanies({ isVisible: true, limit: 100 });
        setCompanies(result?.data ?? []);
      } catch {
        setCompanies([]);
      } finally {
        setCompaniesLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      experience: "",
      focus: "",
      message: "",
      businessUnits: [],
    },
  });

  // ─── Toggle checkbox logic ─────────────
  const toggleUnit = (name: string, current: string[]) => {
    if (current.includes(name)) return current.filter((u) => u !== name);
    return [...current, name];
  };

  // ─── Submit ───────────────────────────
  const handleSubmit = async (values: AgentFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await createAgent(values);

      if (!result?.success) {
        setError(result?.message || "Submission failed.");
        return;
      }

      setIsSuccess(true);
      form.reset();
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Success UI ───────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-emerald-600" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Application Submitted!
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            Thank you. We’ll contact you soon.
          </p>
        </div>
      </div>
    );
  }

  // ─── Form UI ─────────────────────────
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">

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
                  <Input placeholder="+880..." {...field} />
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
                  <Input placeholder="Dhaka, Bangladesh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Experience + Focus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2 years sales" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="focus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Focus Area *</FormLabel>
                <FormControl>
                  <Input placeholder="Marketing, Sales..." {...field} />
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
              <FormLabel>Business Units *</FormLabel>

              {companiesLoading ? (
                <p className="text-sm text-gray-400">Loading...</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {companies.map((company) => {
                    const selected = field.value.includes(company.name);

                    return (
                      <button
                        key={company.id}
                        type="button"
                        onClick={() =>
                          field.onChange(
                            toggleUnit(company.name, field.value as string[])
                          )
                        }
                        className={`px-3 py-1 rounded-full text-xs border ${
                          selected
                            ? "bg-black text-white"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {company.name}
                      </button>
                    );
                  })}
                </div>
              )}

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
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[120px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 animate-spin" />}
          Submit Application
        </Button>

      </form>
    </Form>
  );
}
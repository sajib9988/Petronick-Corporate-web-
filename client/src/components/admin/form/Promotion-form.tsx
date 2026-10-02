"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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

import { createAgent } from "@/service/agent";
import { getAllCompanies } from "@/service/company";
import Turnstile from "@/components/ui/turnstile";
import { formatUsPhone, isCompleteUsPhone } from "@/lib/phone";

const agentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(isCompleteUsPhone, {
      message: "Enter a valid US phone number: (XXX) XXX-XXXX",
    }),

  location: z.string().min(1, "Location is required"),

  experience: z.string().min(1, "Experience is required"),

  focus: z.string().min(1, "Focus area is required"),

  focusType: z
    .enum(["B2B", "B2C", "BOTH"])
    .refine(Boolean, {
      message: "Please select B2B, B2C, or BOTH",
    }),

    
  message: z
    .string()
    .min(10, "Please write at least 10 characters"),

  businessUnits: z
    .array(z.string())
    .min(1, "Select at least one business unit"),
});

type AgentFormValues = z.infer<typeof agentSchema>;

type CompanyOption = { id: string; name: string };

export default function PromotionAgentForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState("");

  const [turnstileToken, setTurnstileToken] = useState("");

  const [companies, setCompanies] = useState<CompanyOption[]>([]);

  const [companiesLoading, setCompaniesLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res = await getAllCompanies({ isVisible: true, limit: 100 });

        if (active && res?.success && Array.isArray(res.data)) {
          setCompanies(
            (res.data as CompanyOption[]).map((c) => ({
              id: c.id,
              name: c.name,
            })),
          );
        }
      } finally {
        if (active) setCompaniesLoading(false);
      }
    })();

    return () => {
      active = false;
    };
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
      focusType: undefined,
      message: "",
      businessUnits: [],
    },
  });

  const toggleUnit = (
    name: string,
    current: string[],
  ) => {
    if (current.includes(name)) {
      return current.filter(
        (unit) => unit !== name,
      );
    }

    return [...current, name];
  };

  const handleSubmit = async (
    values: AgentFormValues,
  ) => {
    setIsLoading(true);

    setError("");

    try {
      const result = await createAgent({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        location: values.location,
        experience: values.experience,
        focus: values.focus,
        focusType: values.focusType,
        message: values.message,
        businessUnits: values.businessUnits,
        turnstileToken,
      });

      if (!result?.success) {
        const msg =
          result?.message ||
          "Submission failed. Please try again.";

        setError(msg);

        toast.error(msg);

        return;
      }

      toast.success(
        "Application submitted successfully!",
      );

      setIsSuccess(true);

      form.reset();

      setTurnstileToken("");
    } catch (err) {
      console.error("Submit error:", err);

      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setError(msg);

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center px-4 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2
            size={38}
            className="text-emerald-600"
          />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-950">
          Application Submitted!
        </h3>

        <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
          Thank you for applying. We&apos;ll review your
          application and contact you within 5 business
          days.
        </p>
      </div>
    );
  }

return (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-4"
    >
      {error && (
        <div className="rounded-md border border-red-300/30 bg-red-500/10 px-3 py-2 text-[11px] text-red-200">
          {error}
        </div>
      )}

      {/* NAME AND EMAIL */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[10px] font-semibold text-white">
                Full Name
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  className="h-10 rounded-md border border-white/15 bg-white px-3 text-[12px] text-slate-900 placeholder:text-slate-400 focus:border-[#c99a3c] focus:ring-[#c99a3c]/20"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px] text-red-300" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[10px] font-semibold text-white">
                Email Address
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-10 rounded-md border border-white/15 bg-white px-3 text-[12px] text-slate-900 placeholder:text-slate-400 focus:border-[#c99a3c] focus:ring-[#c99a3c]/20"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px] text-red-300" />
            </FormItem>
          )}
        />
      </div>

      {/* PHONE AND LOCATION */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[10px] font-semibold text-white">
                Phone Number
              </FormLabel>

              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  className="h-10 rounded-md border border-white/15 bg-white px-3 text-[12px] text-slate-900 placeholder:text-slate-400 focus:border-[#c99a3c] focus:ring-[#c99a3c]/20"
                  name={field.name}
                  ref={field.ref}
                  value={field.value ?? ""}
                  onBlur={field.onBlur}
                  onChange={(e) =>
                    field.onChange(
                      formatUsPhone(e.target.value),
                    )
                  }
                />
              </FormControl>

              <FormMessage className="text-[10px] text-red-300" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[10px] font-semibold text-white">
                City and State or Location
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your location"
                  className="h-10 rounded-md border border-white/15 bg-white px-3 text-[12px] text-slate-900 placeholder:text-slate-400 focus:border-[#c99a3c] focus:ring-[#c99a3c]/20"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px] text-red-300" />
            </FormItem>
          )}
        />
      </div>

      {/* EXPERIENCE AND FOCUS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[10px] font-semibold text-white">
                Business Experience
              </FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Briefly describe your business, sales, marketing, or professional experience"
                  className="min-h-[68px] resize-none rounded-md border border-white/15 bg-white px-3 py-2 text-[12px] text-slate-900 placeholder:text-slate-400 focus:border-[#c99a3c] focus:ring-[#c99a3c]/20"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px] text-red-300" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="focus"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[10px] font-semibold text-white">
                Primary Focus Area
              </FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Tell us your primary industry or professional focus"
                  className="min-h-[68px] resize-none rounded-md border border-white/15 bg-white px-3 py-2 text-[12px] text-slate-900 placeholder:text-slate-400 focus:border-[#c99a3c] focus:ring-[#c99a3c]/20"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px] text-red-300" />
            </FormItem>
          )}
        />
      </div>

      {/* COMPANIES */}

      <FormField
        control={form.control}
        name="businessUnits"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-[10px] font-semibold text-white">
              Companies You Would Like to Represent
            </FormLabel>

            <p className="text-[9px] text-slate-300">
              Select one or multiple companies.
            </p>

            <FormControl>
              <div>
                {companiesLoading ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {Array.from({
                      length: 10,
                    }).map((_, index) => (
                      <div
                        key={index}
                        className="h-9 animate-pulse rounded-md bg-white/10"
                      />
                    ))}
                  </div>
                ) : companies.length === 0 ? (
                  <p className="text-[10px] text-slate-300">
                    No companies are available right now.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {companies.map(
                      (company, index) => {
                        const selected =
                          field.value.includes(
                            company.name,
                          );

                        return (
                          <button
                            key={company.id}
                            type="button"
                            onClick={() =>
                              field.onChange(
                                toggleUnit(
                                  company.name,
                                  field.value,
                                ),
                              )
                            }
                            className={`min-h-9 rounded-md border px-2 py-2 text-[9px] font-semibold transition ${
                              selected
                                ? "border-[#c99a3c] bg-[#c99a3c] text-white"
                                : "border-white/20 bg-white text-[#10283f] hover:border-[#c99a3c] hover:bg-[#f8f3e8]"
                            }`}
                          >
                            <span className="line-clamp-1">
                              {index + 1}.{" "}
                              {company.name}
                            </span>
                          </button>
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            </FormControl>

            <FormMessage className="text-[10px] text-red-300" />
          </FormItem>
        )}
      />

      {/* MARKET FOCUS AND STATEMENT */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="focusType"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[10px] font-semibold text-white">
                Market Focus
              </FormLabel>

              <FormControl>
                <select
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value)
                  }
                  className="h-10 w-full rounded-md border border-white/15 bg-white px-3 text-[12px] text-slate-600 outline-none transition focus:border-[#c99a3c] focus:ring-2 focus:ring-[#c99a3c]/20"
                >
                  <option value="" disabled>
                    B2B B2C Both
                  </option>

                  <option value="B2B">
                    B2B
                  </option>

                  <option value="B2C">
                    B2C
                  </option>

                  <option value="BOTH">
                    Both
                  </option>
                </select>
              </FormControl>

              <FormMessage className="text-[10px] text-red-300" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[10px] font-semibold text-white">
                Statement of Interest
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Tell us why you are interested in the Promotion Agent opportunity"
                  className="h-10 rounded-md border border-white/15 bg-white px-3 text-[12px] text-slate-900 placeholder:text-slate-400 focus:border-[#c99a3c] focus:ring-[#c99a3c]/20"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px] text-red-300" />
            </FormItem>
          )}
        />
      </div>

      {/* TURNSTILE */}

      <div className="flex justify-center py-1">
        <Turnstile
          onVerify={setTurnstileToken}
          onExpire={() =>
            setTurnstileToken("")
          }
        />
      </div>

      {/* SUBMIT */}

      <Button
        type="submit"
        disabled={
          isLoading ||
          !turnstileToken
        }
        className="group h-11 w-full rounded-md bg-[#c99a3c] text-[11px] font-semibold text-white shadow-none transition hover:bg-[#b78b32] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2
              size={15}
              className="mr-2 animate-spin"
            />

            Submitting Application...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>

      <p className="text-center text-[9px] leading-4 text-slate-300">
        Your information will be reviewed by the Petronick
        Corporate Holdings team and used to evaluate your
        Promotion Agent application.
      </p>
    </form>
  </Form>
);
}
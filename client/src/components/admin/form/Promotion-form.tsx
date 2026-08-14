"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
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
import Turnstile from "@/components/ui/turnstile";

const agentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(1, "Phone number is required"),

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

  turnstileToken: z
    .string()
    .min(1, "Please complete the verification"),
});

type AgentFormValues = z.infer<typeof agentSchema>;

/**
 * Keep this list synchronized with your backend/database.
 * Your PDF lists 8 business units, including Coffee Bean Furniture.
 */
const COMPANIES = [
  "Fusion DigiWeb",
  "Germ Solutions Shop",
  "Germ Shooters Co",
  "Petron Fulfillment",
  "Treaded Brands",
  "Celebrations Kits",
  "Profit Pioneers",
  "Coffee Bean Furniture",
];

export default function PromotionAgentForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState("");

  const [turnstileToken, setTurnstileToken] = useState("");

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
      turnstileToken: "",
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
        className="space-y-7"
      >
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
            {error}
          </div>
        )}

        {/* =================================================
            NAME + EMAIL
        ================================================== */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-800">
                  Full Name *
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="mt-1 h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                    {...field}
                  />
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
                <FormLabel className="text-sm font-semibold text-slate-800">
                  Email *
                </FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1 h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* =================================================
            PHONE + LOCATION
        ================================================== */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-800">
                  Phone *
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="+1 234 567 8900"
                    className="mt-1 h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                    {...field}
                  />
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
                <FormLabel className="text-sm font-semibold text-slate-800">
                  Location *
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Pittsburgh, PA"
                    className="mt-1 h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* =================================================
            EXPERIENCE
        ================================================== */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-slate-800">
                Business Experience *
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. 3 years in B2B sales, retail management..."
                  className="mt-1 h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* =================================================
            FOCUS + B2B / B2C
        ================================================== */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="focus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-800">
                  Focus Area *
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Marketing, Sales, Digital..."
                    className="mt-1 h-11 rounded-xl border-slate-200 bg-slate-50/50 px-4 transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="focusType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-800">
                  B2B or B2C Focus *
                </FormLabel>

                <FormControl>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    {(
                      ["B2B", "B2C", "BOTH"] as const
                    ).map((type) => {
                      const selected =
                        field.value === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            field.onChange(type)
                          }
                          className={`h-11 rounded-xl border text-sm font-semibold transition-all ${
                            selected
                              ? "border-slate-950 bg-slate-950 text-white shadow-md"
                              : "border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-400 hover:bg-white"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* =================================================
            BUSINESS UNITS
        ================================================== */}
        <FormField
          control={form.control}
          name="businessUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-slate-800">
                Companies You&apos;d Like to Represent *
              </FormLabel>

              <p className="mb-3 mt-1 text-xs text-slate-500">
                Select one or multiple business units.
              </p>

              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {COMPANIES.map((company) => {
                    const selected =
                      field.value.includes(company);

                    return (
                      <button
                        key={company}
                        type="button"
                        onClick={() =>
                          field.onChange(
                            toggleUnit(
                              company,
                              field.value,
                            ),
                          )
                        }
                        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all ${
                          selected
                            ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-sm"
                        }`}
                      >
                        {selected && (
                          <CheckCircle2 size={14} />
                        )}

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

        {/* =================================================
            MESSAGE
        ================================================== */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-slate-800">
                Statement of Interest *
              </FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Tell us why you want to become a Promotion Agent and what value you bring..."
                  className="mt-1 min-h-[150px] resize-none rounded-xl border-slate-200 bg-slate-50/50 p-4 transition-all focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* =================================================
            TURNSTILE
        ================================================== */}
        <div className="pt-1">
          <Turnstile
            onVerify={setTurnstileToken}
            onExpire={() => setTurnstileToken("")}
          />
        </div>

        {/* =================================================
            SUBMIT
        ================================================== */}
        <Button
          type="submit"
          className="group h-12 w-full rounded-xl bg-slate-950 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/10 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading || !turnstileToken}
        >
          {isLoading ? (
            <>
              <Loader2
                size={18}
                className="mr-2 animate-spin"
              />

              Submitting Application...
            </>
          ) : (
            <>
              Submit Application

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </Button>

        <p className="text-center text-xs leading-5 text-slate-400">
          Your information will be reviewed by the
          Petronick team and used to evaluate your
          Promotion Agent application.
        </p>
      </form>
    </Form>
  );
}
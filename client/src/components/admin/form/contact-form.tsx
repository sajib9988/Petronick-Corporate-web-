"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

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

import { createContact } from "@/service/contact";
import Turnstile from "@/components/ui/turnstile";
import { formatUsPhone, isCompleteUsPhone } from "@/lib/phone";
import Link from "next/link";


// ─────────────────────────────────────────────
// Validation Schema
// ─────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .optional()
    .refine((v) => !v || isCompleteUsPhone(v), {
      message: "Enter a valid US phone number: (XXX) XXX-XXXX",
    }),

  subject: z.string().min(1, "Subject is required"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
});

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  className?: string;
  note?: string;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function ContactForm({
  className,
  note,
}: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState("");

  const [turnstileToken, setTurnstileToken] =
    useState("");

  // ───────────────────────────────────────────
  // React Hook Form
  // ───────────────────────────────────────────

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
     
    },
  });

  // ───────────────────────────────────────────
  // Submit Handler
  // ───────────────────────────────────────────

  const handleSubmit = async (
    values: ContactFormValues
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await createContact({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        subject: values.subject,
        message: values.message,
        turnstileToken,
      });

      // ────────────────────────────────────────
      // API Error
      // ────────────────────────────────────────

      if (!result?.success) {
        setError(
          result?.message ||
            "Failed to send message."
        );

        return;
      }

      // ────────────────────────────────────────
      // Success
      // ────────────────────────────────────────

      setIsSuccess(true);

      setTurnstileToken("");

      form.reset();
    } catch (err) {
      console.error(
        "Contact form error:",
        err
      );

      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // ───────────────────────────────────────────
  // Success UI
  // ───────────────────────────────────────────

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        {/* Success Icon */}

        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2
            size={28}
            className="text-emerald-600"
          />
        </div>

        {/* Message */}

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Message Sent!
          </h3>

          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Thank you for reaching out. We'll get
            back soon.
          </p>
        </div>

        {/* Send Another Message */}

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsSuccess(false);
            setTurnstileToken("");
            setError("");
            form.reset();
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  // ───────────────────────────────────────────
  // Main Form
  // ───────────────────────────────────────────

return (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={`space-y-[10px] ${className ?? ""}`}
    >
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-[11px] text-red-500">
          {error}
        </p>
      )}

      {/* Name and Email */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[11px] font-bold text-[#10283f]">
                Name *
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Your full name"
                  className="h-9 rounded-md border-slate-200 px-3 text-[11px]"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[11px] font-bold text-[#10283f]">
                Email *
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="h-9 rounded-md border-slate-200 px-3 text-[11px]"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </div>

      {/* Phone and Subject */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[11px] font-bold text-[#10283f]">
                Phone
              </FormLabel>

              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Your phone number"
                  className="h-9 rounded-md border-slate-200 px-3 text-[11px]"
                  name={field.name}
                  ref={field.ref}
                  value={field.value ?? ""}
                  onBlur={field.onBlur}
                  onChange={(e) =>
                    field.onChange(
                      formatUsPhone(e.target.value)
                    )
                  }
                />
              </FormControl>

              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-[11px] font-bold text-[#10283f]">
                Subject *
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Inquiry subject"
                  className="h-9 rounded-md border-slate-200 px-3 text-[11px]"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </div>

      {/* Message */}
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-[11px] font-bold text-[#10283f]">
              Message *
            </FormLabel>

            <FormControl>
              <Textarea
                placeholder="Tell us how we can help"
                className="h-[66px] min-h-[66px] resize-none rounded-md border-slate-200 px-3 py-2 text-[11px]"
                {...field}
              />
            </FormControl>

            <FormMessage className="text-[10px]" />
          </FormItem>
        )}
      />

      {/* Turnstile */}
      <Turnstile
        onVerify={(token: string) =>
          setTurnstileToken(token)
        }
        onExpire={() =>
          setTurnstileToken("")
        }
      />

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading || !turnstileToken}
        className="h-9 w-full rounded-md bg-[#B8934A] text-[11px] font-bold text-white hover:bg-[#a5823f]"
      >
        {isLoading && (
          <Loader2
            size={14}
            className="mr-2 animate-spin"
          />
        )}

        Submit Inquiry
      </Button>

      <p className="text-[9px] leading-[1.3] text-slate-500">
        {note ||
          "By submitting this form, you agree that Petronick Corporate Holdings LLC may use the information provided to respond to your inquiry."}{" "}
        <Link
          href="/privacy"
          className="transition-colors hover:text-[#B8934A]"
        >
          See Privacy Policy.
        </Link>
      </p>
    </form>
  </Form>
);
}
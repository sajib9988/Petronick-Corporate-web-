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
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function ContactForm({
  className,
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
      className={`space-y-3 ${className ?? ""}`}
    >
      {error && (
        <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-semibold">
                Name *
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Your full name"
                  className="h-9 text-sm"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-semibold">
                Email *
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="h-9 text-sm"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      {/* Phone + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-semibold">
                Phone
                <span className="ml-1 text-gray-400 font-normal">
                  optional
                </span>
              </FormLabel>

              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Your phone number"
                  className="h-9 text-sm"
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

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-semibold">
                Subject *
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Inquiry subject"
                  className="h-9 text-sm"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-xs" />
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
            <FormLabel className="text-xs font-semibold">
              Message *
            </FormLabel>

            <FormControl>
              <Textarea
                placeholder="Tell us how we can help"
                className="min-h-[68px] h-[68px] resize-none text-sm"
                {...field}
              />
            </FormControl>

            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      {/* Cloudflare Turnstile */}
      <div className="pt-1">
        <Turnstile
          onVerify={(token: string) =>
            setTurnstileToken(token)
          }
          onExpire={() =>
            setTurnstileToken("")
          }
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-9 text-sm font-semibold"
        disabled={
          isLoading ||
          !turnstileToken
        }
      >
        {isLoading && (
          <Loader2
            size={15}
            className="mr-2 animate-spin"
          />
        )}

        Submit Inquiry
      </Button>

      <p className="text-[10px] leading-4 text-gray-500">
        By submitting this form, you agree that Petronick
        Corporate Holdings LLC may use the information provided
        to respond to your inquiry. See Privacy Policy.
      </p>
    </form>
  </Form>
);
}
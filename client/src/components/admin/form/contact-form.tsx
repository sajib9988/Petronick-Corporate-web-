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


// ─────────────────────────────────────────────
// Validation Schema
// ─────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().email("Invalid email address"),

  phone: z.string().optional(),

  subject: z.string().min(1, "Subject is required"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),

  turnstileToken: z
    .string()
    .min(1, "Please complete the verification"),
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
      message: "",
      turnstileToken: "",
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
        className={`space-y-4 ${className ?? ""}`}
      >
        {/* Error Message */}

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
            {error}
          </p>
        )}

        {/* ────────────────────────────────────
            Name + Email
        ───────────────────────────────────── */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>

                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ────────────────────────────────────
            Phone
        ───────────────────────────────────── */}

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone{" "}
                <span className="text-gray-400">
                  (optional)
                </span>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="+1 234 567 8900"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* ────────────────────────────────────
            Subject
        ───────────────────────────────────── */}

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject *</FormLabel>

              <FormControl>
                <Input
                  placeholder="Project inquiry"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* ────────────────────────────────────
            Message
        ───────────────────────────────────── */}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="How can we help you?"
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* ────────────────────────────────────
            Cloudflare Turnstile
        ───────────────────────────────────── */}

        <Turnstile
          onVerify={(token: string) => {
            setTurnstileToken(token);

            form.setValue(
              "turnstileToken",
              token,
              {
                shouldValidate: true,
              }
            );
          }}
          onExpire={() => {
            setTurnstileToken("");

            form.setValue(
              "turnstileToken",
              "",
              {
                shouldValidate: true,
              }
            );
          }}
        />

        {/* Turnstile Validation Message */}

        {form.formState.errors.turnstileToken && (
          <p className="text-sm text-red-500">
            {
              form.formState.errors
                .turnstileToken.message
            }
          </p>
        )}

        {/* ────────────────────────────────────
            Submit Button
        ───────────────────────────────────── */}

        <Button
          type="submit"
          className="w-full h-11"
          disabled={
            isLoading ||
            !turnstileToken
          }
        >
          {isLoading && (
            <Loader2
              size={16}
              className="mr-2 animate-spin"
            />
          )}

          Send Message
        </Button>
      </form>
    </Form>
  );
}
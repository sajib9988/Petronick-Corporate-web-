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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createContact } from "@/service/contact";

// ─── Schema ───────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ─── Props ────────────────────────────────────────────────
interface ContactFormProps {
  className?: string;
}

// ─── Component ────────────────────────────────────────────
export default function ContactForm({ className }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await createContact({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        message: values.message,
      });
      if (!result?.success) {
        setError(result?.message || "Failed to send message. Please try again.");
        return;
      }
      setIsSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Success State ────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Message Sent!</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Thank you for reaching out. We&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsSuccess(false);
            form.reset();
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  // ─── Form ─────────────────────────────────────────────
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={`space-y-4 ${className ?? ""}`}
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
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

      {/* Phone */}
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Phone{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="+1 234 567 8900" {...field} />
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

      <Button type="submit" className="w-full h-11" disabled={isLoading}>
        {isLoading && <Loader2 size={16} className="mr-2 animate-spin" />}
        Send Message
      </Button>
    </form>
  );
}
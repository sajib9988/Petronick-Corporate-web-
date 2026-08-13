"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, KeyRound } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  forgotPasswordSchema,
  resetPasswordSchema,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from "@/lib/validation";

import { forgetPassword, resetPassword } from "@/service/auth";
import Turnstile from "@/components/ui/turnstile";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      turnstileToken: "",
    },
  });

  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleRequestOtp = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      const res = await forgetPassword(
        data.email,
        data.turnstileToken
      );

      if (!res?.success) {
        toast.error(res?.message || "Failed to send reset code");
        return;
      }

      toast.success("Reset code sent to your email");

      setEmail(data.email);
      setStep("reset");

      setTurnstileToken("");
      emailForm.setValue("turnstileToken", "");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (
    data: ResetPasswordFormData
  ) => {
    setIsLoading(true);

    try {
      const res = await resetPassword({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });

      if (!res?.success) {
        toast.error(res?.message || "Failed to reset password");
        return;
      }

      toast.success(
        "Password reset successful! Please login."
      );

      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:rounded-[40px] sm:p-8 lg:p-10">

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg">
            {step === "email" ? (
              <Mail className="h-5 w-5 text-white" />
            ) : (
              <KeyRound className="h-5 w-5 text-white" />
            )}
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {step === "email"
              ? "Forgot Password"
              : "Reset Password"}
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/60">
            {step === "email"
              ? "Enter your email to receive a reset code"
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {/* EMAIL STEP */}
        {step === "email" ? (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(
                handleRequestOtp
              )}
              className="space-y-5"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="group relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 transition-colors group-focus-within:text-black/70" />

                        <Input
                          className="h-12 rounded-xl border border-white/20 bg-white px-11 text-sm text-black shadow-sm outline-none transition-all placeholder:text-black/40 hover:border-white/40 focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/20"
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="px-1 text-xs" />
                  </FormItem>
                )}
              />

              {/* Turnstile */}
              <div className="flex justify-center rounded-xl border border-white/10 bg-white/5 p-3">
                <Turnstile
                  onVerify={(token: string) => {
                    setTurnstileToken(token);

                    emailForm.setValue(
                      "turnstileToken",
                      token,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                  onExpire={() => {
                    setTurnstileToken("");

                    emailForm.setValue(
                      "turnstileToken",
                      "",
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                />
              </div>

              {emailForm.formState.errors.turnstileToken && (
                <p className="text-center text-xs text-red-400">
                  {
                    emailForm.formState.errors
                      .turnstileToken.message
                  }
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading || !turnstileToken}
                className="h-12 w-full rounded-xl bg-white font-semibold text-black shadow-lg shadow-black/10 transition-all duration-200 hover:bg-white/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading
                  ? "Sending..."
                  : "Send Reset Code"}
              </Button>
            </form>
          </Form>
        ) : (
          /* RESET STEP */
          <Form {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(
                handleResetPassword
              )}
              className="space-y-5"
            >
              {/* OTP */}
              <FormField
                control={resetForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="group relative">
                        <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 transition-colors group-focus-within:text-black/70" />

                        <Input
                          className="h-12 rounded-xl border border-white/20 bg-white px-11 text-center text-base font-semibold tracking-[0.35em] text-black shadow-sm transition-all placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-black/40 hover:border-white/40 focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/20"
                          placeholder="6-digit code"
                          maxLength={6}
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="px-1 text-xs" />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={resetForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="group relative">
                        <Input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="New Password"
                          className="h-12 rounded-xl border border-white/20 bg-white px-4 pr-12 text-sm text-black shadow-sm transition-all placeholder:text-black/40 hover:border-white/40 focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/20"
                          {...field}
                        />

                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-black/40 transition-colors hover:bg-black/5 hover:text-black/80"
                          onClick={() =>
                            setShowPassword(
                              (p) => !p
                            )
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>

                    <FormMessage className="px-1 text-xs" />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={resetForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm New Password"
                        className="h-12 rounded-xl border border-white/20 bg-white px-4 text-sm text-black shadow-sm transition-all placeholder:text-black/40 hover:border-white/40 focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/20"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="px-1 text-xs" />
                  </FormItem>
                )}
              />

              {/* Reset Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-xl bg-white font-semibold text-black shadow-lg shadow-black/10 transition-all duration-200 hover:bg-white/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading
                  ? "Resetting..."
                  : "Reset Password"}
              </Button>

              {/* Back */}
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full pt-1 text-center text-xs text-white/50 transition-colors hover:text-white"
              >
                Didn&apos;t get the code?{" "}
                <span className="font-medium underline underline-offset-2">
                  Try again
                </span>
              </button>
            </form>
          </Form>
        )}

        {/* Login */}
        <p className="mt-7 text-center text-sm text-white/60">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
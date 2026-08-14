"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  KeyRound,
} from "lucide-react";
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

import {
  forgetPassword,
  resetPassword,
} from "@/service/auth";

import Turnstile from "@/components/ui/turnstile";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  // =====================================================
  // EMAIL FORM
  // =====================================================

  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      turnstileToken: "",
    },
  });

  // =====================================================
  // RESET PASSWORD FORM
  // =====================================================

  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // =====================================================
  // REQUEST OTP
  // =====================================================

  const handleRequestOtp = async (
    data: ForgotPasswordFormData
  ) => {
    setIsLoading(true);

    try {
      const res = await forgetPassword(
        data.email,
        data.turnstileToken
      );

      if (!res?.success) {
        toast.error(
          res?.message || "Failed to send reset code"
        );
        return;
      }

      toast.success(
        "Reset code sent to your email"
      );

      setEmail(data.email);
      setStep("reset");

      // Reset Turnstile token
      setTurnstileToken("");

      emailForm.setValue(
        "turnstileToken",
        ""
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // RESET PASSWORD
  // =====================================================

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
        toast.error(
          res?.message ||
            "Failed to reset password"
        );
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
    <div className="mx-auto w-full max-w-md px-4">

      {/* =================================================
          MAIN CARD
      ================================================= */}

      <div
        className="
          relative
          w-full
          rounded-[32px]
          border
          border-black/5
          bg-white/90
          px-6
          py-8
          shadow-[0_20px_60px_rgba(0,0,0,0.10)]
          backdrop-blur-xl
          sm:px-10
          sm:py-10
        "
      >

        {/* =================================================
            ICON
        ================================================= */}

        <div className="mb-5 flex justify-center">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-black/5
              bg-white
              text-black/70
              shadow-[0_8px_25px_rgba(0,0,0,0.08)]
            "
          >
            {step === "email" ? (
              <Mail className="h-5 w-5" />
            ) : (
              <KeyRound className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h2
          className="
            text-center
            text-2xl
            font-bold
            tracking-tight
            text-black
            sm:text-3xl
          "
        >
          {step === "email"
            ? "Forgot Password"
            : "Reset Password"}
        </h2>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-2
            text-center
            text-sm
            leading-6
            text-black/55
          "
        >
          {step === "email"
            ? "Enter your email to receive a reset code"
            : `Enter the 6-digit code sent to ${email}`}
        </p>

        {/* =================================================
            EMAIL STEP
        ================================================= */}

        {step === "email" ? (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(
                handleRequestOtp
              )}
              className="mt-8 space-y-5"
            >

              {/* EMAIL */}

              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">

                        <Mail
                          className="
                            absolute
                            left-4
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-black/35
                          "
                        />

                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="Enter your email"
                          {...field}
                          className="
                            h-12
                            rounded-xl
                            border
                            border-black/10
                            bg-white
                            pl-11
                            pr-4
                            text-sm
                            !text-black
                            placeholder:text-black/40
                            shadow-sm
                            transition-all
                            duration-200

                            hover:border-black/20

                            focus-visible:border-black/30
                            focus-visible:ring-2
                            focus-visible:ring-black/10
                          "
                        />

                      </div>
                    </FormControl>

                    <FormMessage className="px-1 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* TURNSTILE */}

              <div className="flex justify-center">
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

              {emailForm.formState.errors
                .turnstileToken && (
                <p className="text-center text-xs text-red-500">
                  {
                    emailForm.formState.errors
                      .turnstileToken.message
                  }
                </p>
              )}

              {/* SEND BUTTON */}

              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !turnstileToken
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  bg-black
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                  transition-all
                  duration-200

                  hover:bg-black/90
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.20)]

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isLoading
                  ? "Sending..."
                  : "Send Reset Code"}
              </Button>
            </form>
          </Form>
        ) : (

          /* =================================================
             RESET PASSWORD STEP
          ================================================= */

          <Form {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(
                handleResetPassword
              )}
              className="mt-8 space-y-4"
            >

              {/* =================================================
                  OTP
              ================================================= */}

<FormField
  control={resetForm.control}
  name="otp"
  render={({ field: { onChange, value, ...fieldRest } }) => (
    <FormItem>
      <FormControl>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-black/40" />
          <Input
            {...fieldRest}
            value={value || ""}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
              onChange(digitsOnly);
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="6-digit code"
            className="h-12 w-full rounded-xl border border-black/10 bg-white pl-11 pr-4 text-center text-base font-medium text-black caret-black placeholder:text-black/50 shadow-sm transition-all duration-200 hover:border-black/20 focus-visible:border-black/30 focus-visible:ring-2 focus-visible:ring-black/10"
          />
        </div>
      </FormControl>
      <FormMessage className="px-1 text-xs text-red-500" />
    </FormItem>
  )}
/>


              {/* =================================================
                  NEW PASSWORD
              ================================================= */}

              <FormField
                control={resetForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">

                        <Input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          autoComplete="new-password"
                          placeholder="New Password"
                          {...field}
                          className="
                            h-12
                            rounded-xl
                            border
                            border-black/10
                            bg-white
                            px-4
                            pr-12
                            text-sm
                            !text-black
                            placeholder:text-black/40

                            shadow-sm
                            transition-all
                            duration-200

                            hover:border-black/20

                            focus-visible:border-black/30
                            focus-visible:ring-2
                            focus-visible:ring-black/10
                          "
                        />

                        {/* EYE BUTTON */}

                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          onClick={() =>
                            setShowPassword(
                              (prev) => !prev
                            )
                          }
                          className="
                            absolute
                            right-3
                            top-1/2
                            flex
                            h-8
                            w-8
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-lg
                            text-black/40
                            transition-all

                            hover:bg-black/5
                            hover:text-black/80
                          "
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>

                      </div>
                    </FormControl>

                    <FormMessage className="px-1 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================= */}

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
                        autoComplete="new-password"
                        placeholder="Confirm New Password"
                        {...field}
                        className="
                          h-12
                          rounded-xl
                          border
                          border-black/10
                          bg-white
                          px-4
                          text-sm
                          !text-black
                          placeholder:text-black/40

                          shadow-sm
                          transition-all
                          duration-200

                          hover:border-black/20

                          focus-visible:border-black/30
                          focus-visible:ring-2
                          focus-visible:ring-black/10
                        "
                      />

                    </FormControl>

                    <FormMessage className="px-1 text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* =================================================
                  RESET BUTTON
              ================================================= */}

              <Button
                type="submit"
                disabled={isLoading}
                className="
                  mt-2
                  h-12
                  w-full
                  rounded-xl
                  bg-black
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_8px_25px_rgba(0,0,0,0.15)]
                  transition-all
                  duration-200

                  hover:bg-black/90
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.20)]

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isLoading
                  ? "Resetting..."
                  : "Reset Password"}
              </Button>

              {/* =================================================
                  TRY AGAIN
              ================================================= */}

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  resetForm.reset();
                }}
                className="
                  w-full
                  pt-2
                  text-center
                  text-xs
                  text-black/50
                  transition-colors
                  hover:text-black
                "
              >
                Didn&apos;t get the code?{" "}
                <span className="font-medium underline underline-offset-2">
                  Try again
                </span>
              </button>
            </form>
          </Form>
        )}

        {/* =================================================
            LOGIN LINK
        ================================================= */}

        <p
          className="
            mt-7
            text-center
            text-sm
            text-black/50
          "
        >
          Remembered your password?{" "}

          <Link
            href="/login"
            className="
              font-medium
              text-black
              underline
              underline-offset-2
              transition-opacity
              hover:opacity-70
            "
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
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

import Turnstile from "@/components/ui/turnstile";

import {
  registerSchema,
  verifyEmailSchema,
  RegisterFormData,
  VerifyEmailFormData,
} from "@/lib/validation";

import {
  registerUser,
  verifyEmail,
  resendVerification,
} from "@/service/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [step, setStep] = useState<"register" | "verify">(
    "register"
  );

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState("");

  // =====================================================
  // REGISTER FORM
  // =====================================================

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // =====================================================
  // VERIFY EMAIL FORM
  // =====================================================

  const verifyForm = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),

    defaultValues: {
      email: "",
      otp: "",
    },
  });

  // =====================================================
  // REGISTER
  // =====================================================

  const handleRegister = async (
    data: RegisterFormData
  ) => {
    setIsLoading(true);

    try {
      const { confirmPassword, ...rest } = data;

      const result = await registerUser({
        ...rest,
        turnstileToken,
      });

      if (!result.ok) {
        toast.error(
          result.data?.message || "Registration failed"
        );

        return;
      }

      toast.success(
        "Verification code sent to your email!"
      );

      setEmail(data.email);

      verifyForm.setValue(
        "email",
        data.email
      );

      setStep("verify");

      setTurnstileToken("");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // VERIFY EMAIL
  // =====================================================

  const handleVerify = async (
    data: VerifyEmailFormData
  ) => {
    setIsLoading(true);

    try {
      const result = await verifyEmail({
        email: data.email,
        otp: data.otp,
      });

      if (!result?.success) {
        toast.error(
          result?.message || "Verification failed"
        );

        return;
      }

      toast.success(
        "Email verified! Please login."
      );

      router.push("/login");
    } catch (err: any) {
      toast.error(
        err?.message || "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResend = async () => {
    setIsLoading(true);

    try {
      const result = await resendVerification(email);

      if (result?.success) {
        toast.success("New code sent!");

        // পুরনো OTP clear
        verifyForm.setValue("otp", "");
      } else {
        toast.error(
          result?.message || "Failed to resend"
        );
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        relative
        mx-auto
        max-w-md
        rounded-[40px]
        border
        border-white/20
        bg-white/10
        p-8
        backdrop-blur-2xl
        sm:p-10
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
            border-white/20
            bg-white/10
            text-white/70
            shadow-[0_8px_25px_rgba(0,0,0,0.3)]
          "
        >
          {step === "register" ? (
            <Mail className="h-5 w-5" />
          ) : (
            <KeyRound className="h-5 w-5" />
          )}
        </div>
      </div>

      {/* =================================================
          TITLE
      ================================================= */}

      <h2 className="mb-2 text-center text-3xl font-bold text-white">
        {step === "register"
          ? "Create Account"
          : "Verify Email"}
      </h2>

      {/* =================================================
          DESCRIPTION
      ================================================= */}

      <p className="mb-6 text-center text-sm text-white/55">
        {step === "register"
          ? "Enter your details to create an account"
          : `Enter the 6-digit code sent to ${email}`}
      </p>

      {/* =================================================
          REGISTER STEP
      ================================================= */}

      {step === "register" ? (
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(
              handleRegister
            )}
            className="space-y-5"
          >
            {/* =================================================
                NAME
            ================================================= */}

            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Full Name"
                      className="
                        border-white/20
                        text-white
                        placeholder:text-white/40
                        focus-visible:ring-white
                      "
                    />
                  </FormControl>

                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* =================================================
                EMAIL
            ================================================= */}

            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className="
                        border-white/20
                        text-white
                        placeholder:text-white/40
                        focus-visible:ring-white
                      "
                    />
                  </FormControl>

                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* =================================================
                PASSWORD
            ================================================= */}

            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Password (min 6 characters)"
                        className="
                          border-white/20
                          pr-10
                          text-white
                          placeholder:text-white/40
                          focus-visible:ring-white
                        "
                      />

                      <button
                        type="button"
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-white/40
                          hover:text-white/80
                        "
                        onClick={() =>
                          setShowPassword(
                            (p) => !p
                          )
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <p className="ml-1 mt-1 text-xs text-white/40">
                    Must be at least 6 characters long
                  </p>

                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={
                          showConfirm
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm Password"
                        className="
                          border-white/20
                          pr-10
                          text-white
                          placeholder:text-white/40
                          focus-visible:ring-white
                        "
                      />

                      <button
                        type="button"
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-white/40
                          hover:text-white/80
                        "
                        onClick={() =>
                          setShowConfirm(
                            (p) => !p
                          )
                        }
                      >
                        {showConfirm ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* =================================================
                TURNSTILE
            ================================================= */}

            <Turnstile
              onVerify={setTurnstileToken}
              onExpire={() =>
                setTurnstileToken("")
              }
            />

            {/* =================================================
                REGISTER BUTTON
            ================================================= */}

            <Button
              type="submit"
              disabled={
                isLoading ||
                !turnstileToken
              }
              className="
                w-full
                bg-white
                font-semibold
                text-black
                hover:bg-white/90
              "
            >
              {isLoading
                ? "Creating..."
                : "Register"}
            </Button>
          </form>
        </Form>
      ) : (
        /* =================================================
           VERIFY STEP
        ================================================= */

        <Form {...verifyForm}>
          <form
            onSubmit={verifyForm.handleSubmit(
              handleVerify
            )}
            className="space-y-5"
          >
            {/* =================================================
                OTP
                Native input + register()
                এখানে Shadcn FormField ব্যবহার করছি না
            ================================================= */}

            <div className="space-y-1.5">
              <div className="relative">
                <KeyRound
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    z-10
                    h-4
                    w-4
                    -translate-y-1/2
                    text-white/40
                  "
                />

                <input
                  {...verifyForm.register("otp")}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="one-time-code"
                  placeholder="6-digit code"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-white/20
                    bg-white/5
                    pl-11
                    pr-4
                    text-center
                    text-base
                    font-medium
                    text-white
                    caret-white
                    placeholder:text-white/50
                    outline-none
                    transition-all
                    duration-200
                    focus:border-white/40
                    focus:ring-2
                    focus:ring-white/20
                  "
                />
              </div>

              {verifyForm.formState.errors.otp && (
                <p className="text-xs text-red-400">
                  {
                    verifyForm.formState.errors
                      .otp.message
                  }
                </p>
              )}
            </div>

            {/* =================================================
                VERIFY BUTTON
            ================================================= */}

            <Button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                bg-white
                font-semibold
                text-black
                hover:bg-white/90
              "
            >
              {isLoading
                ? "Verifying..."
                : "Verify Email"}
            </Button>

            {/* =================================================
                RESEND + GO BACK
            ================================================= */}

            <div className="flex flex-col gap-2 pt-2">
              {/* RESEND */}

              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="
                  w-full
                  text-center
                  text-xs
                  text-white/50
                  transition-colors
                  hover:text-white
                  disabled:opacity-50
                "
              >
                Didn&apos;t get the code?{" "}
                <span className="font-medium underline underline-offset-2">
                  Resend
                </span>
              </button>

              {/* GO BACK */}

              <button
                type="button"
                onClick={() => {
                  setStep("register");

                  verifyForm.reset();

                  registerForm.reset();

                  setEmail("");
                }}
                className="
                  w-full
                  text-center
                  text-xs
                  text-white/50
                  transition-colors
                  hover:text-white
                "
              >
                Wrong email?{" "}
                <span className="font-medium underline underline-offset-2">
                  Go back
                </span>
              </button>
            </div>
          </form>
        </Form>
      )}

      {/* =================================================
          LOGIN LINK
      ================================================= */}

      {step === "register" && (
        <p className="mt-6 text-center text-sm text-white/70">
          Already have account?{" "}

          <Link
            href="/login"
            className="
              font-medium
              text-white
              underline
              underline-offset-2
              hover:opacity-70
            "
          >
            Login
          </Link>
        </p>
      )}
    </div>
  );
}
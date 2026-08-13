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
import { registerUser, verifyEmail, resendVerification } from "@/service/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "verify">("register");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const verifyForm = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email: "", otp: "" },
  });

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...rest } = data;
      const result = await registerUser({ ...rest, turnstileToken });

      if (!result.ok) {
        toast.error(result.data?.message || "Registration failed");
        return;
      }

      toast.success("Verification code sent to your email!");
      setEmail(data.email);
      verifyForm.setValue("email", data.email);
      setStep("verify");
      setTurnstileToken("");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (data: VerifyEmailFormData) => {
    setIsLoading(true);
    try {
      const result = await verifyEmail({ email: data.email, otp: data.otp });

      if (!result?.success) {
        toast.error(result?.message || "Verification failed");
        return;
      }

      toast.success("Email verified! Please login.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const result = await resendVerification(email);
      if (result?.success) {
        toast.success("New code sent!");
      } else {
        toast.error(result?.message || "Failed to resend");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-8 sm:p-10 rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 max-w-md mx-auto">
      {/* Icon */}
      <div className="mb-5 flex justify-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white/70 shadow-[0_8px_25px_rgba(0,0,0,0.3)]">
          {step === "register" ? (
            <Mail className="h-5 w-5" />
          ) : (
            <KeyRound className="h-5 w-5" />
          )}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white text-center mb-2">
        {step === "register" ? "Create Account" : "Verify Email"}
      </h2>
      <p className="text-center text-sm text-white/55 mb-6">
        {step === "register"
          ? "Enter your details to create an account"
          : `Enter the 6-digit code sent to ${email}`}
      </p>

      {step === "register" ? (
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(handleRegister)}
            className="space-y-5"
          >
            {/* Name */}
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white"
                      placeholder="Full Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white"
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white pr-10"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (min 6 characters)"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
                        onClick={() => setShowPassword((p) => !p)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <p className="text-xs text-white/40 mt-1 ml-1">
                    Must be at least 6 characters long
                  </p>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white pr-10"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
                        onClick={() => setShowConfirm((p) => !p)}
                      >
                        {showConfirm ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            <Turnstile
              onVerify={setTurnstileToken}
              onExpire={() => setTurnstileToken("")}
            />

            <Button
              type="submit"
              disabled={isLoading || !turnstileToken}
              className="w-full bg-white text-black hover:bg-white/90 font-semibold"
            >
              {isLoading ? "Creating..." : "Register"}
            </Button>
          </form>
        </Form>
      ) : (
        /* ========== VERIFY STEP ========== */
        <Form {...verifyForm}>
          <form
            onSubmit={verifyForm.handleSubmit(handleVerify)}
            className="space-y-5"
          >
            <FormField
              control={verifyForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/40" />
                      <Input
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const digitsOnly = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);
                          field.onChange(digitsOnly);
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        autoComplete="one-time-code"
                        placeholder="6-digit code"
                        className="h-12 w-full rounded-xl border border-white/20 bg-white/5 pl-11 pr-4 text-center text-base font-medium text-white caret-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-2 focus-visible:ring-white/20"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black hover:bg-white/90 font-semibold"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="w-full text-center text-xs text-white/50 transition-colors hover:text-white disabled:opacity-50"
              >
                Didn&apos;t get the code?{" "}
                <span className="font-medium underline underline-offset-2">
                  Resend
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("register");
                  verifyForm.reset();
                  registerForm.reset();
                }}
                className="w-full text-center text-xs text-white/50 transition-colors hover:text-white"
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

      {step === "register" && (
        <p className="text-center text-sm text-white/70 mt-6">
          Already have account?{" "}
          <Link
            href="/login"
            className="text-white font-medium underline underline-offset-2 hover:opacity-70"
          >
            Login
          </Link>
        </p>
      )}
    </div>
  );
}
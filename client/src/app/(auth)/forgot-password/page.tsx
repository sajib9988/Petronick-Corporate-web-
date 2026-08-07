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

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
  });

  const handleRequestOtp = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const res = await forgetPassword(data.email);
      if (!res?.success) {
        toast.error(res?.message || "Failed to send reset code");
        return;
      }
      toast.success("Reset code sent to your email");
      setEmail(data.email);
      setStep("reset");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
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
      toast.success("Password reset successful! Please login.");
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-8 sm:p-10 rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 max-w-md mx-auto w-full">
      <h2 className="text-3xl font-bold text-white text-center mb-2">
        {step === "email" ? "Forgot Password" : "Reset Password"}
      </h2>
      <p className="text-white/50 text-center text-sm mb-8">
        {step === "email"
          ? "Enter your email to receive a reset code"
          : `Enter the 6-digit code sent to ${email}`}
      </p>

      {step === "email" ? (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(handleRequestOtp)} className="space-y-5">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3 text-white/40" />
                      <Input
                        className="pl-9 text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white"
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...resetForm}>
          <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-5">
            <FormField
              control={resetForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <KeyRound size={16} className="absolute left-3 top-3 text-white/40" />
                      <Input
                        className="pl-9 text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white tracking-[0.3em]"
                        placeholder="6-digit code"
                        maxLength={6}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={resetForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5"
                        onClick={() => setShowPassword((p) => !p)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={resetForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-center text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Didn&apos;t get the code? Try again
            </button>
          </form>
        </Form>
      )}

      <p className="text-center text-sm text-white mt-6">
        Remembered your password?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
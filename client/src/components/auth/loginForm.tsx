"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  KeyRound,
  Mail,
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
  LoginFormData,
  loginSchema,
  verifyEmailSchema,
  VerifyEmailFormData,
} from "@/lib/validation";

import {
  loginUser,
  verifyEmail,
  resendVerification,
} from "@/service/auth";

export default function LoginForm() {
  const router = useRouter();

  // =====================================================
  // STEP
  // =====================================================

  const [step, setStep] = useState<"login" | "verify">(
    "login"
  );

  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // LOGIN FORM
  // =====================================================

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
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
  // LOGIN
  // =====================================================

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginUser(data);

      // =================================================
      // LOGIN FAILED
      // =================================================

      if (!result.ok) {
        const errorMessage =
          result.data?.message || "Login failed";

        const normalizedMessage =
          errorMessage.toLowerCase();

        /*
         * Backend should return an error when
         * email is not verified.
         *
         * We detect that response here and
         * switch the same card to Verify Email.
         */

        const isEmailUnverified =
          normalizedMessage.includes("not verified") ||
          normalizedMessage.includes("verify your email") ||
          normalizedMessage.includes("email not verified") ||
          normalizedMessage.includes("email is not verified");

        if (isEmailUnverified) {
          setEmail(data.email);

          verifyForm.setValue(
            "email",
            data.email
          );

          verifyForm.setValue(
            "otp",
            ""
          );

          setStep("verify");

          toast.error(
            "Please verify your email first."
          );

          return;
        }

        setError(errorMessage);

        toast.error(errorMessage);

        return;
      }

      // =================================================
      // LOGIN SUCCESS
      // =================================================

      toast.success("Login successful");

      const userRole =
        result.data?.user?.role;

      console.log(
        "User role:",
        userRole
      );

      // Redirect after 2 seconds
      setTimeout(() => {
        if (userRole === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 2000);
    } catch (error) {
      setError(
        "Something went wrong."
      );

      toast.error(
        "Something went wrong. Please try again."
      );
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

      // =================================================
      // VERIFY FAILED
      // =================================================

      if (!result?.success) {
        toast.error(
          result?.message ||
            "Verification failed"
        );

        return;
      }

      // =================================================
      // VERIFY SUCCESS
      // =================================================

      toast.success(
        "Email verified! Please login."
      );

      // Back to login step
      setStep("login");

      setError(null);

      // Keep verified email
      setEmail(data.email);

      // Put verified email into login form
      loginForm.setValue(
        "email",
        data.email
      );

      // Password must be entered again
      loginForm.setValue(
        "password",
        ""
      );

      // Clear OTP
      verifyForm.reset({
        email: data.email,
        otp: "",
      });
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResend = async () => {
    if (!email) {
      toast.error(
        "Email address is required."
      );

      return;
    }

    setIsLoading(true);

    try {
      const result =
        await resendVerification(email);

      if (result?.success) {
        toast.success(
          "New verification code sent!"
        );

        // Clear old OTP
        verifyForm.setValue(
          "otp",
          ""
        );
      } else {
        toast.error(
          result?.message ||
            "Failed to resend verification code."
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // BACK TO LOGIN
  // =====================================================

  const handleBackToLogin = () => {
    setStep("login");

    setError(null);

    // Keep email
    verifyForm.reset({
      email,
      otp: "",
    });

    // Put email back into login form
    loginForm.setValue(
      "email",
      email
    );

    // Always clear password
    loginForm.setValue(
      "password",
      ""
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        relative
        rounded-[40px]
        border
        border-white/20
        bg-white/10
        p-8
        backdrop-blur-2xl
        shadow-[20px_20px_50px_rgba(0,0,0,0.5),inset_5px_5px_15px_rgba(255,255,255,0.1)]
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
          {step === "login" ? (
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
          mb-2
          text-center
          text-3xl
          font-bold
          text-white
        "
      >
        {step === "login"
          ? "Welcome"
          : "Verify Email"}
      </h2>

      {/* =================================================
          DESCRIPTION
      ================================================= */}

      <p
        className="
          mb-6
          text-center
          text-sm
          text-white/55
        "
      >
        {step === "login"
          ? "Sign in to your Petronick account"
          : `Enter the 6-digit code sent to ${email}`}
      </p>

      {/* =================================================
          LOGIN STEP
      ================================================= */}

      {step === "login" ? (
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(
              handleLogin
            )}
            className="space-y-5"
          >
            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div
                className="
                  rounded-xl
                  border
                  border-red-500/40
                  bg-red-500/20
                  p-2.5
                  text-center
                  text-[11px]
                  text-red-200
                "
              >
                {error}
              </div>
            )}

            {/* =================================================
                EMAIL
            ================================================= */}

            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email Address"
                      className="
                        h-12
                        rounded-2xl
                        border-none
                        bg-white/5
                        text-white
                        placeholder:text-white/20
                        shadow-inner
                        ring-1
                        ring-white/10
                        transition-all
                        focus:bg-white/10
                        focus:border-blue-400/50
                      "
                    />
                  </FormControl>

                  <FormMessage
                    className="
                      ml-2
                      text-[10px]
                      text-red-400
                    "
                  />
                </FormItem>
              )}
            />

            {/* =================================================
                PASSWORD
            ================================================= */}

            <FormField
              control={loginForm.control}
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
                        placeholder="Password"
                        className="
                          h-12
                          rounded-2xl
                          border-none
                          bg-white/5
                          pr-12
                          text-white
                          placeholder:text-white/20
                          shadow-inner
                          ring-1
                          ring-white/10
                          transition-all
                          focus:bg-white/10
                          focus:border-blue-400/50
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (p) => !p
                          )
                        }
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-white/40
                          transition-colors
                          hover:text-white/70
                        "
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage
                    className="
                      ml-2
                      text-[10px]
                      text-red-400
                    "
                  />
                </FormItem>
              )}
            />

            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            <div className="-mt-2 text-right">
              <Link
                href="/forgot-password"
                className="
                  text-xs
                  text-blue-300/70
                  transition-colors
                  hover:text-blue-200
                "
              >
                Forgot password?
              </Link>
            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <Button
              type="submit"
              disabled={isLoading}
              className="
                h-12
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                font-bold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition-all
                hover:from-blue-500
                hover:to-indigo-500
                active:scale-[0.98]
              "
            >
              {isLoading
                ? "Signing in..."
                : "Login"}
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
                EMAIL
            ================================================= */}

            <FormField
              control={verifyForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email Address"
                      className="
                        h-12
                        rounded-2xl
                        border-white/20
                        bg-white/5
                        text-white
                        placeholder:text-white/40
                        focus-visible:ring-white
                      "
                    />
                  </FormControl>

                  <FormMessage
                    className="
                      text-xs
                      text-red-400
                    "
                  />
                </FormItem>
              )}
            />

            {/* =================================================
                OTP
                Native input — NOT Shadcn Input
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
                h-12
                w-full
                rounded-2xl
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
                RESEND OTP
            ================================================= */}

            <button
              type="button"
              onClick={handleResend}
              disabled={
                isLoading || !email
              }
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
              <span
                className="
                  font-medium
                  underline
                  underline-offset-2
                "
              >
                Resend
              </span>
            </button>

            {/* =================================================
                BACK TO LOGIN
            ================================================= */}

            <button
              type="button"
              onClick={handleBackToLogin}
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
              Back to Login
            </button>
          </form>
        </Form>
      )}

      {/* =================================================
          REGISTER LINK
      ================================================= */}

      {step === "login" && (
        <div className="mt-6 text-center">
          <p
            className="
              text-[12px]
              text-white/40
            "
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="
                font-bold
                text-blue-400
                transition-colors
                hover:text-blue-300
              "
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
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

import { registerSchema, RegisterFormData } from "@/lib/validation";
import { signUp } from "@/lib/auth-client";
import { registerUser } from "@/service/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",

    },
  });

// RegisterForm.tsx - onSubmit পরিবর্তন করো
// তোমার server action

// RegisterForm.tsx

const onSubmit = async (data: RegisterFormData) => {
  setIsLoading(true);
  setError(null);
  try {
    const { confirmPassword, ...rest } = data; // ✅ বাদ দিলাম
    const result = await registerUser(rest);   // শুধু name, email, password যাবে

    if (!result.ok) {
      const msg = result.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("Registration successful! Please login.");
    router.push("/login");
  } catch (err) {
    toast.error("Something went wrong.");
  } finally {
    setIsLoading(false);
  }
};

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/callback/google";
  };

  return (
    <div className="relative p-8 sm:p-10 rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Create Account
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <div className="text-red-400 text-sm   text-center">
              {error}
            </div>
          )}

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white"  placeholder="Full Name" {...field} />
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
                <FormControl>
                  <Input className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white"  type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative  text-white ">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password (min 8 characters)"
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

                {/* helper text */}
                <p className="text-xs text-white/40 mt-1 ml-1">
                  Must be at least 8 characters long
                </p>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input className="text-white placeholder:text-white/40 border-white/20 focus-visible:ring-white" 
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5"
                      onClick={() => setShowConfirm((p) => !p)}
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Register"}
          </Button>
        </form>
      </Form>

      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full mt-4"
      >
        Continue with Google
      </Button>

      <p className="text-center text-sm text-white mt-4">
        Already have account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { LoginFormData, loginSchema } from "@/lib/validation";
import { authClient, signIn } from "@/lib/auth-client";
import { loginUser } from "@/service/auth";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginUser(data);
      if (!res.ok) {
        const result = await res.json();
        setError(result.message || "Login failed");
        return;
      }
      router.push("/");
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google login failed", err);
      setError("Google login failed");
    }
  };

  return (
    <div className="relative p-8 sm:p-10 rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[20px_20px_50px_rgba(0,0,0,0.5),inset_5px_5px_15px_rgba(255,255,255,0.1)]">
      
      {/* Top Glossy Reflection */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[40px]" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white text-center mb-1 tracking-tight">Welcome</h2>
        <p className="text-blue-200/50 text-center text-xs mb-8 uppercase tracking-widest">Petronick Login</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-[11px] p-2.5 rounded-xl text-center animate-pulse">
                {error}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      className="h-12 bg-white/5 border-white/10 focus:bg-white/10 focus:border-blue-400/50 text-white placeholder:text-white/20 rounded-2xl transition-all shadow-inner border-none ring-1 ring-white/10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-[10px] ml-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="h-12 bg-white/5 border-white/10 focus:bg-white/10 focus:border-blue-400/50 text-white placeholder:text-white/20 rounded-2xl transition-all shadow-inner border-none ring-1 ring-white/10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-[10px] ml-2" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>
        </Form>

        {/* Divider - "Or continue with" */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-tighter">
            <span className="bg-[#1a2c38] px-3 text-white/40 rounded-full py-0.5 border border-white/5">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <Button
          variant="outline"
          className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 transition-all border-none ring-1 ring-white/20"
          onClick={handleGoogleLogin}
          type="button"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="font-medium">Google</span>
        </Button>

        <div className="mt-8 text-center">
          <p className="text-[12px] text-white/40">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
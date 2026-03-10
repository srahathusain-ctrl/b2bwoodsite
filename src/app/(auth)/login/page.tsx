"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function LoginContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [email,    setEmail]    = useState("danish@steelwood.ae");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");

  useEffect(() => {
    if (searchParams.get("registered") === "1") {
      setSuccess("Account created! You can now sign in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      const res     = await fetch("/api/auth/session");
      const session = await res.json();
      const role    = (session?.user as { role?: string })?.role;
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  const features = [
    ["📋", "Live Order & Delivery Tracking",  "Real-time status, dispatch alerts, POD collection"],
    ["🗂️", "Document Vault",                  "Tax invoices, technical submittals, LEED compliance"],
    ["🏷️", "Personalised Offers Feed",        "Account-specific pricing, LEED discounts, flash deals"],
    ["✦",  "24×7 AI Support",                 "Instant answers, human escalation, SLA tracking"],
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-br from-bg via-[#0A1428] to-[#0F1E3A] p-16 relative overflow-hidden hidden lg:flex flex-col justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(#1E2D45_1px,transparent_1px),linear-gradient(90deg,#1E2D45_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 mb-3">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              Enterprise B2B Platform
            </span>
          </div>

          {/* Tagline chip */}
          <div className="inline-flex items-center gap-2 mb-8" style={{ background: "rgba(61,122,82,0.12)", border: "1px solid rgba(61,122,82,0.25)", borderRadius: 999, padding: "6px 14px" }}>
            <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: "#3d7a52", animation: "pulse 2s infinite" }} />
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3d7a52" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.34l1.23.66L12 14l-1 6s5-2 7-8c0 0 3 1 3 5 2-3 2.5-8-4-13z"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#3d7a52", letterSpacing: ".06em", textTransform: "uppercase" }}>
              Your 24/7 Sustainable Materials Store
            </span>
          </div>

          <h1 className="font-serif text-5xl font-bold leading-tight mb-5">
            Your business,<br />
            <span className="text-gold">intelligently</span>
            <br />
            connected.
          </h1>

          <p className="text-muted text-lg leading-relaxed mb-12">
            Real-time orders, documents, pricing intelligence, and AI-powered
            support — all in one agentic workspace built for GCC B2B.
          </p>

          <div className="space-y-3">
            {features.map(([icon, title, desc]) => (
              <div
                key={title as string}
                className="flex gap-3 items-center p-3 bg-white/[0.03] border border-white/10 rounded-lg"
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="text-xs text-muted">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[460px] bg-surface border-l border-border flex flex-col justify-center p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 bg-gradient-to-br from-gold to-gold-2 rounded-lg flex items-center justify-center text-2xl">
            🏭
          </div>
          <div>
            <div className="text-lg font-extrabold">SteelWood Industries</div>
            <div className="text-xs text-muted uppercase tracking-wider">FZCO · B2B Portal</div>
          </div>
        </div>

        <h2 className="font-serif text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-muted text-sm mb-6">Sign in to your account to continue</p>

        <div className="h-px bg-border my-6" />

        {success && (
          <div className="text-xs bg-green-50 text-green-700 border border-green-200 rounded px-3 py-2 mb-4">
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Email address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.ae"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-muted uppercase tracking-wider">
                Password
              </label>
              <span className="text-xs text-gold cursor-pointer">Forgot password?</span>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red bg-red/10 border border-red/20 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-gold" />
            <label htmlFor="remember" className="text-sm text-muted cursor-pointer">
              Remember me on this device
            </label>
          </div>

          <Button type="submit" variant="primary" className="w-full py-3 text-base" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Signing in…
              </div>
            ) : (
              "Sign in to Portal →"
            )}
          </Button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-surface text-muted">or</span>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => signIn("azure-ad")}
        >
          <span>🔐</span> Continue with SSO / Microsoft Entra
        </Button>

        <p className="text-center text-xs text-muted mt-6">
          New customer?{" "}
          <Link href="/register" className="text-gold font-semibold hover:underline">
            Create an account →
          </Link>
        </p>

        {/* Demo credentials hint */}
        <div className="mt-4 rounded-lg border border-border bg-bg/40 p-3 space-y-1">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Demo Credentials</p>
          <p className="text-[10px] text-muted">Customer: danish@steelwood.ae / <strong>demo</strong></p>
          <p className="text-[10px] text-muted">
            Admin:{" "}
            <button
              type="button"
              onClick={() => { setEmail("admin@steelwood.ae"); setPassword("admin1234"); }}
              className="text-gold font-semibold hover:underline cursor-pointer"
            >
              admin@steelwood.ae / admin1234
            </button>
          </p>
          <p className="text-[10px] text-muted">Registered: ahmed@alfuttaim-int.ae / <strong>customer1</strong></p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading…</div>}>
      <LoginContent />
    </Suspense>
  );
}

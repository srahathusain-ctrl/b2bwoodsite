"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const COUNTRIES = ["UAE", "KSA", "Qatar", "Kuwait", "Oman", "Bahrain", "Other GCC"];
const BUSINESS_TYPES = ["Contractor", "Fit-Out", "Developer", "Retailer", "Other"] as const;
const VOLUME_OPTIONS = [
  "Under AED 50,000",
  "AED 50,000–100,000",
  "AED 100,000–200,000",
  "AED 200,000–500,000",
  "AED 500,000–1,000,000",
  "AED 1,000,000+",
];

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 — Company
  const [companyName, setCompanyName] = useState("");
  const [tradeLicense, setTradeLicense] = useState("");
  const [trn, setTrn] = useState("");
  const [country, setCountry] = useState("UAE");
  const [businessType, setBusinessType] = useState<string>("Contractor");

  // Step 2 — Contact
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 3 — Business profile
  const [estimatedMonthlyVolume, setEstimatedMonthlyVolume] = useState(VOLUME_OPTIONS[0]);

  const nextStep = () => {
    setError("");
    if (step === 1) {
      if (!companyName.trim() || !country) {
        setError("Company name and country are required.");
        return;
      }
    }
    if (step === 2) {
      if (!contactName.trim() || !email.trim() || !password) {
        setError("Name, email, and password are required.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    }
    setStep((s) => (s + 1) as Step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName, tradeLicense, trn,
          contactName, email, password,
          phone, country, businessType,
          estimatedMonthlyVolume,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Success — redirect to login with success param
      router.push("/login?registered=1");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const STEPS = [
    { n: 1, label: "Company" },
    { n: 2, label: "Contact" },
    { n: 3, label: "Profile" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div className="flex-1 bg-gradient-to-br from-bg via-[#0A1428] to-[#0F1E3A] p-16 relative overflow-hidden hidden lg:flex flex-col justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(#1E2D45_1px,transparent_1px),linear-gradient(90deg,#1E2D45_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 mb-3">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              New Customer Onboarding
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
            Join the<br />
            <span className="text-gold">SteelWood</span>
            <br />
            network.
          </h1>

          <p className="text-muted text-lg leading-relaxed mb-12">
            Access wholesale pricing, dedicated account management, and real-time
            order tracking across the GCC.
          </p>

          <div className="space-y-4">
            {[
              ["🏷️", "Exclusive B2B Pricing", "Volume discounts, LEED bonuses, personalised deals"],
              ["💳", "Flexible Credit Terms", "Net 30–90 day terms, letter of credit options"],
              ["📦", "GCC-Wide Delivery",     "Free delivery over AED 15,000 · Dubai to Muscat"],
              ["✦",  "Dedicated AI Support",  "24×7 intelligent assistance, escalation on demand"],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
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

      {/* Right form panel */}
      <div className="w-full lg:w-[520px] bg-surface border-l border-border flex flex-col justify-center p-8 lg:p-12 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-gradient-to-br from-gold to-gold-2 rounded-lg flex items-center justify-center text-2xl">
            🏭
          </div>
          <div>
            <div className="text-lg font-extrabold">SteelWood Industries</div>
            <div className="text-xs text-muted uppercase tracking-wider">FZCO · B2B Portal</div>
          </div>
        </div>

        <h2 className="font-serif text-2xl font-bold mb-1">Create your account</h2>
        <p className="text-muted text-sm mb-6">Set up your B2B portal access in 3 quick steps</p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map(({ n, label }, i) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className="flex items-center gap-1.5"
                style={{ opacity: n > step ? 0.4 : 1 }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: n < step ? "#C9A84C" : n === step ? "#C9A84C" : "rgba(201,168,76,0.15)",
                    color: n <= step ? "#1a1612" : "#C9A84C",
                    border: n > step ? "1px solid rgba(201,168,76,0.3)" : "none",
                  }}
                >
                  {n < step ? "✓" : n}
                </div>
                <span className="text-xs font-semibold" style={{ color: n === step ? "#C9A84C" : "#7a7268" }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px w-8 bg-border" />
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-xs text-red bg-red/10 border border-red/20 rounded px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {/* ── Step 1: Company ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Company Name <span className="text-red">*</span>
              </label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Al Futtaim Interiors LLC"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Trade Licence No.
                </label>
                <Input
                  value={tradeLicense}
                  onChange={(e) => setTradeLicense(e.target.value)}
                  placeholder="DED-123456"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  TRN / VAT No.
                </label>
                <Input
                  value={trn}
                  onChange={(e) => setTrn(e.target.value)}
                  placeholder="100234567800003"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Country <span className="text-red">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg text-sm bg-bg border border-border text-text focus:outline-none focus:ring-1 focus:ring-gold/50"
                >
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Business Type <span className="text-red">*</span>
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg text-sm bg-bg border border-border text-text focus:outline-none focus:ring-1 focus:ring-gold/50"
                >
                  {BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <Button variant="primary" className="w-full py-2.5" onClick={nextStep}>
              Continue →
            </Button>
          </div>
        )}

        {/* ── Step 2: Contact ── */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Contact Person <span className="text-red">*</span>
              </label>
              <Input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Business Email <span className="text-red">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.ae"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 50 000 0000"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Password <span className="text-red">*</span>
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Confirm Password <span className="text-red">*</span>
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1 py-2.5" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button variant="primary" className="flex-1 py-2.5" onClick={nextStep}>
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Business profile + submit ── */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Estimated Monthly Purchase Volume
              </label>
              <select
                value={estimatedMonthlyVolume}
                onChange={(e) => setEstimatedMonthlyVolume(e.target.value)}
                className="w-full h-10 px-3 rounded-lg text-sm bg-bg border border-border text-text focus:outline-none focus:ring-1 focus:ring-gold/50"
              >
                {VOLUME_OPTIONS.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>

            {/* Summary card */}
            <div className="rounded-lg border border-border bg-bg/50 p-4 space-y-2 text-sm">
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Registration Summary</p>
              <div className="flex justify-between">
                <span className="text-muted">Company</span>
                <span className="font-semibold text-right max-w-[60%] truncate">{companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Contact</span>
                <span className="font-semibold">{contactName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Email</span>
                <span className="font-semibold text-right max-w-[60%] truncate">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Country</span>
                <span className="font-semibold">{country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Type</span>
                <span className="font-semibold">{businessType}</span>
              </div>
            </div>

            <p className="text-xs text-muted">
              By registering, you agree to SteelWood&apos;s{" "}
              <span className="text-gold cursor-pointer">Terms of Service</span> and{" "}
              <span className="text-gold cursor-pointer">Privacy Policy</span>.
              Your account will be active immediately and your account manager will
              contact you within 24 hours to set up credit terms.
            </p>

            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1 py-2.5" type="button" onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button variant="primary" className="flex-1 py-2.5" type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Creating account…
                  </span>
                ) : (
                  "Create Account →"
                )}
              </Button>
            </div>
          </form>
        )}

        <p className="text-center text-xs text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gold font-semibold hover:underline">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}

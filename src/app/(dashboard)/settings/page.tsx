"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getInitials } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import type { SavedAddress } from "@/types";

const MOCK_ADDRESSES: SavedAddress[] = [
  {
    id: "A1",
    label: "Head Office – Dubai",
    line1: "Unit 4B, Al Quoz Industrial Area 3",
    city: "Dubai",
    country: "UAE",
    contactName: "Danish Hussain",
    contactPhone: "+971 50 123 4567",
    isDefault: true,
  },
  {
    id: "A2",
    label: "DWTC Project Site",
    line1: "Sheikh Zayed Road, Hall 7 – Trade Centre",
    city: "Dubai",
    country: "UAE",
    contactName: "Ahmed Al-Rashidi",
    contactPhone: "+971 55 987 6543",
    isDefault: false,
  },
  {
    id: "A3",
    label: "Abu Dhabi Warehouse",
    line1: "Musaffah Industrial Area, Block M-22",
    city: "Abu Dhabi",
    country: "UAE",
    contactName: "Fatima Al-Kaabi",
    contactPhone: "+971 56 234 5678",
    isDefault: false,
  },
];

function LanguageToggle() {
  const { language, setLanguage, addToast } = useUIStore();
  const handleSwitch = (lang: "en" | "ar") => {
    setLanguage(lang);
    addToast({
      type: "info",
      title: lang === "ar" ? "تم التبديل إلى العربية" : "Switched to English",
      message: lang === "ar" ? "سيتم تطبيق RTL عند إعادة تحميل الصفحة" : "RTL layout will apply on reload",
    });
  };
  return (
    <div className="flex items-center gap-1 p-1 bg-surface2 border border-border rounded-lg w-fit">
      <button
        onClick={() => handleSwitch("en")}
        className={`px-4 py-1.5 rounded text-sm font-semibold transition-all ${
          language === "en" ? "bg-gold text-black" : "text-muted hover:text-text"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleSwitch("ar")}
        className={`px-4 py-1.5 rounded text-sm font-semibold transition-all ${
          language === "ar" ? "bg-gold text-black" : "text-muted hover:text-text"
        }`}
      >
        عربي
      </button>
    </div>
  );
}

function AddressCard({
  address,
  onSetDefault,
}: {
  address: SavedAddress;
  onSetDefault: () => void;
}) {
  return (
    <div
      className={`p-4 rounded-lg border transition-colors ${
        address.isDefault ? "border-gold/40 bg-gold/5" : "border-border bg-surface2"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="font-semibold text-sm flex items-center gap-2">
            {address.label}
            {address.isDefault && (
              <span className="text-[9px] font-bold text-gold bg-gold/10 border border-gold/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                Default
              </span>
            )}
          </div>
          <div className="text-xs text-muted mt-0.5">{address.line1}</div>
          <div className="text-xs text-muted">{address.city}, {address.country}</div>
        </div>
        <button className="text-muted hover:text-text text-xs transition-colors flex-shrink-0">✎ Edit</button>
      </div>
      <div className="text-xs text-muted2 flex gap-4">
        <span>📞 {address.contactPhone}</span>
        <span>👤 {address.contactName}</span>
      </div>
      {!address.isDefault && (
        <button
          onClick={onSetDefault}
          className="text-[10px] text-gold hover:underline mt-2 block"
        >
          Set as default
        </button>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const { addToast } = useUIStore();
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const name = session?.user?.name || "Danish Hussain";
  const email = session?.user?.email || "danish@steelwood.ae";

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    addToast({ type: "success", title: "Default address updated" });
  };

  return (
    <div className="space-y-5 animate-fade-slide-up max-w-2xl">
      {/* Profile */}
      <Card>
        <CardHeader>
          <h3 className="font-bold">Profile</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
              {getInitials(name)}
            </div>
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-xs text-muted">{email}</div>
              <div className="text-xs text-gold mt-0.5">
                {(session?.user as { role?: string })?.role || "Sales Manager"}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Full Name</label>
              <Input defaultValue={name} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Email</label>
              <Input defaultValue={email} type="email" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Phone</label>
              <Input defaultValue="+971 50 123 4567" type="tel" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Department</label>
              <Input defaultValue="Procurement" />
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => addToast({ type: "success", title: "Profile saved" })}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <h3 className="font-bold">Language & Region</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Portal Language</label>
            <LanguageToggle />
            <p className="text-xs text-muted mt-2">
              Switching to Arabic enables right-to-left (RTL) layout. A page reload is required.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Currency Display</label>
              <select className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-gold">
                <option value="AED">AED (Default)</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">VAT Region</label>
              <select className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-gold">
                <option value="UAE">UAE (5%)</option>
                <option value="KSA">KSA (15%)</option>
                <option value="Qatar">Qatar (0%)</option>
                <option value="Kuwait">Kuwait (0%)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company */}
      <Card>
        <CardHeader>
          <h3 className="font-bold">Company Information</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Company Name", "Starwood Industries LLC"],
              ["TRN / VAT Number", "100234567890003"],
              ["Trade License No.", "DED-2018-0045"],
              ["CR Number", "1101234567"],
            ].map(([label, value]) => (
              <div key={label}>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">{label}</label>
                <Input defaultValue={value} />
              </div>
            ))}
          </div>
          <Button variant="primary" size="sm" onClick={() => addToast({ type: "success", title: "Company info saved" })}>
            Save
          </Button>
        </CardContent>
      </Card>

      {/* Saved Addresses */}
      <Card>
        <CardHeader>
          <h3 className="font-bold">Saved Delivery Addresses</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addToast({ type: "info", title: "Add address", message: "Address form coming soon." })}
          >
            + Add Address
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {addresses.map((addr) => (
            <AddressCard key={addr.id} address={addr} onSetDefault={() => setDefaultAddress(addr.id)} />
          ))}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <h3 className="font-bold">Portal Preferences</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email notifications for new orders", defaultChecked: true },
            { label: "SMS alerts for dispatch updates", defaultChecked: true },
            { label: "Weekly analytics report", defaultChecked: false },
            { label: "Offer & deal alerts", defaultChecked: true },
            { label: "AI-powered price alerts", defaultChecked: true },
            { label: "Invoice due date reminders (3 days before)", defaultChecked: true },
          ].map(({ label, defaultChecked }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm">{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
                <div className="w-9 h-5 bg-surface2 border border-border rounded-full peer peer-checked:bg-gold/80 peer-checked:border-gold/60 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <h3 className="font-bold">Security</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start gap-2">🔑 Change Password</Button>
          <Button variant="ghost" className="w-full justify-start gap-2">📱 Set up Two-Factor Authentication</Button>
          <Button variant="ghost" className="w-full justify-start gap-2">🔐 Manage SSO / Microsoft Entra</Button>
          <div className="h-px bg-border my-2" />
          <Button variant="danger" className="w-full justify-start gap-2" onClick={() => signOut({ callbackUrl: "/login" })}>
            ⤴ Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

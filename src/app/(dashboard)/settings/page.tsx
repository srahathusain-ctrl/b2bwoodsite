"use client";

import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getInitials } from "@/lib/utils";

export default function SettingsPage() {
  const { data: session } = useSession();
  const name = session?.user?.name || "Danish Hussain";
  const email = session?.user?.email || "danish@steelwood.ae";

  return (
    <div className="space-y-5 animate-fade-slide-up max-w-2xl">
      {/* Profile */}
      <Card>
        <CardHeader>
          <h3 className="font-bold">Profile</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
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
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Full Name
              </label>
              <Input defaultValue={name} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Email
              </label>
              <Input defaultValue={email} type="email" />
            </div>
          </div>

          <Button variant="primary" size="sm">Save Changes</Button>
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
          ].map(({ label, defaultChecked }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm">{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={defaultChecked}
                  className="sr-only peer"
                />
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
          <Button variant="ghost" className="w-full justify-start gap-2">
            🔑 Change Password
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            📱 Set up Two-Factor Authentication
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            🔐 Manage SSO / Microsoft Entra
          </Button>
          <div className="h-px bg-border my-2" />
          <Button
            variant="danger"
            className="w-full justify-start gap-2"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            ⤴ Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

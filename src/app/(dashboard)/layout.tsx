"use client";

import { useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";
import LiveTicker from "@/components/layout/LiveTicker";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { ToastContainer } from "@/components/ui/Toast";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Welcome to your B2B portal" },
  orders: { title: "Orders", subtitle: "Manage and track your orders" },
  products: { title: "Product Catalog", subtitle: "Browse SteelWood products" },
  documents: { title: "Documents", subtitle: "Certificates, invoices & submittals" },
  finance: { title: "Finance & Invoices", subtitle: "Invoices, payments & credit" },
  offers: { title: "Offers & Deals", subtitle: "Exclusive pricing for your account" },
  analytics: { title: "Analytics", subtitle: "Business intelligence & insights" },
  ai: { title: "AI Assistant", subtitle: "Powered by Claude · Available 24×7" },
  notifications: { title: "Notifications", subtitle: "Alerts, updates & actions" },
  settings: { title: "Settings", subtitle: "Account & portal preferences" },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const segment = pathname.split("/")[1] || "dashboard";
  const page = pageTitles[segment] || pageTitles.dashboard;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <div className="flex items-center gap-3 text-muted">
          <div className="w-5 h-5 border-2 border-border border-t-gold rounded-full animate-spin" />
          Loading portal…
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  const name = session.user?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg">
      <LiveTicker />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar
            title={page.title}
            subtitle={`${greeting}, ${name} · ${page.subtitle}`}
          />
          <div className="flex-1 overflow-auto p-4 lg:p-6">{children}</div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

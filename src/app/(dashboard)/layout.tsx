"use client";

import { useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";
import LiveTicker from "@/components/layout/LiveTicker";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { ToastContainer } from "@/components/ui/Toast";
import RFQModal from "@/components/ui/RFQModal";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";

// Pages that should take full height without padding (flex layouts)
const FULL_HEIGHT_PAGES = ["/dashboard", "/ai"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const { data: products } = useQuery({
    queryKey: ["products", "All", "All Applications", ""],
    queryFn:  () => getProducts("All", "All Applications", ""),
    staleTime: 60_000,
  });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: "#f0ece4" }}>
        <div className="flex items-center gap-3" style={{ color: "#7a7268" }}>
          <div
            className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#ece6dd", borderTopColor: "#b8924a" }}
          />
          <span className="font-mono text-sm">Loading portal…</span>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  const isFullHeight = FULL_HEIGHT_PAGES.includes(pathname);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f0ece4" }}>
      {/* 48px icon rail */}
      <Sidebar />

      {/* Main column */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <TopBar />

        {/* Ticker */}
        <LiveTicker />

        {/* Content area */}
        <div className={isFullHeight ? "flex-1 overflow-hidden flex flex-col" : "flex-1 overflow-auto p-4 lg:p-6"}>
          {children}
        </div>
      </div>

      {/* Global overlays */}
      <ToastContainer />
      <RFQModal products={products || []} />
    </div>
  );
}

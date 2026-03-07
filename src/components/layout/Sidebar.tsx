"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUIStore } from "@/store/ui-store";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { navItems } from "@/lib/constants";
import { getInitials } from "@/lib/utils";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const { data: session } = useSession();

  const currentPage = pathname.split("/")[1] || "dashboard";

  const navigate = (id: string) => {
    router.push(`/${id}`);
    setMobileSidebarOpen(false);
  };

  const SidebarContent = () => (
    <aside
      className={cn(
        "bg-surface border-r border-border flex flex-col h-full flex-shrink-0 transition-all duration-200",
        sidebarCollapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 p-4 border-b border-border flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-2 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
          🏭
        </div>
        {!sidebarCollapsed && (
          <div className="truncate flex-1">
            <div className="text-sm font-bold leading-tight">SteelWood</div>
            <div className="text-[10px] text-muted uppercase tracking-wider">Industries FZCO</div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto w-7 h-7 p-0 text-muted hover:text-text hidden lg:flex"
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? "›" : "‹"}
        </Button>
        {/* Mobile close */}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto w-7 h-7 p-0 text-muted hover:text-text lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          ✕
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <div
              key={item.id}
              className={cn("sidebar-item relative", isActive && "active")}
              onClick={() => navigate(item.id)}
              title={sidebarCollapsed ? item.label : ""}
            >
              <span className="text-lg min-w-[20px] text-center flex-shrink-0">{item.icon}</span>
              {!sidebarCollapsed && (
                <span className="flex-1 text-sm truncate">{item.label}</span>
              )}
              {!sidebarCollapsed && item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                    item.badge === "●"
                      ? "bg-red text-white w-2 h-2 p-0 rounded-full"
                      : "bg-gold text-black"
                  )}
                >
                  {item.badge !== "●" && item.badge}
                </span>
              )}
              {sidebarCollapsed && item.badge && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-gold" />
              )}
            </div>
          );
        })}
      </nav>

      {/* User info */}
      <div className="border-t border-border p-3 flex items-center gap-2.5 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">
          {session?.user?.name ? getInitials(session.user.name) : "DH"}
        </div>
        {!sidebarCollapsed && (
          <div className="truncate flex-1">
            <div className="text-xs font-semibold truncate">{session?.user?.name || "Danish Hussain"}</div>
            <div className="text-[10px] text-muted truncate">
              {(session?.user as { role?: string })?.role || "Sales Manager"}
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-full">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}

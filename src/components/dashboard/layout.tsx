import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Menu } from "lucide-react";

import logo from "@/assets/logo.svg";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} currentPath={pathname} />

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-14 items-center gap-4 border-b border-border px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" width={24} height={24} className="rounded-md" />
            <span className="text-sm font-semibold tracking-tight">
              Satu Data<span className="text-primary"> Kolaborasi</span>
            </span>
          </Link>
        </header>

        {/* Page content */}
        <ScrollArea className="flex-1">
          <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}

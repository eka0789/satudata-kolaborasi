import { Link, useNavigate } from "react-router";
import {
  Bell,
  CalendarDays,
  FolderKanban,
  Home,
  LogOut,
  Search,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";

import logo from "@/assets/logo.svg";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { label: "Beranda", href: "/dashboard", icon: Home },
  { label: "Pencarian", href: "/dashboard/cari", icon: Search },
  { label: "Proyek Saya", href: "/dashboard/proyek", icon: FolderKanban },
  { label: "Kegiatan", href: "/dashboard/kegiatan", icon: CalendarDays },
  { label: "Komunitas", href: "/dashboard/komunitas", icon: Users },
  { label: "Notifikasi", href: "/dashboard/notifikasi", icon: Bell },
  { label: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
  { label: "Admin", href: "/dashboard/admin", icon: Shield },
] as const;

export function Sidebar({
  open,
  setOpen,
  currentPath,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  currentPath: string;
}) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initials = (name?: string) =>
    name
      ?.split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") ?? "?";

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out lg:relative",
          open
            ? "w-[260px] translate-x-0"
            : "w-[260px] -translate-x-full lg:w-[72px] lg:translate-x-0",
        )}
      >
        {/* Logo area */}
        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="Satu Data Kolaborasi"
              width={28}
              height={28}
              className="rounded-md"
            />
          </Link>
          {open && (
<span className="truncate text-sm font-semibold tracking-tight">
                Satu Data<span className="text-primary"> Kolaborasi</span>
              </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto shrink-0 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Nav links */}
        <ScrollArea className="flex-1 px-3 py-3">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? currentPath === "/dashboard"
                  : currentPath.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                  )}
                  <item.icon className="size-4 shrink-0" />
                  {open && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User area */}
        <div className="border-t border-border px-3 py-3">
          {open ? (
            <div className="flex items-center gap-3">
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                  {initials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user?.name ?? "Pengguna"}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.email ?? ""}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                onClick={handleSignOut}
                title="Keluar"
              >
                <LogOut className="size-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="size-9 shrink-0">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                  {initials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router";

/**
 * Brand logo that also serves as a user menu when signed in. Clicking the logo
 * navigates home; the chevron opens a dropdown with dashboard / profile /
 * sign-out actions.
 */
export function LogoDropdown() {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
        >
          <img
            src={logo}
            alt="Satu Data Kolaborasi"
            width={28}
            height={28}
            className="rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
          />
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            Satu Data Kolaborasi
          </span>
          {isAuthenticated && (
            <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
          )}
        </button>
      </DropdownMenuTrigger>
      {isAuthenticated && (
        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuLabel className="truncate">
            {user?.name ?? "Guest"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="mr-2 size-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" disabled>
            <User className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
            <LogOut className="mr-2 size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

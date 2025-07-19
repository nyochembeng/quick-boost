"use client";

import { useTranslations } from "next-intl";
import {
  ChevronDown,
  User,
  Settings,
  BarChart3,
  LogOut,
  Crown,
  History,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Mock authentication state - replace with your actual auth logic
const useAuth = () => {
  // This should be replaced with your actual authentication logic
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatar-placeholder.jpg", // Replace with actual avatar URL
    isPremium: false, // Add premium status
  };

  return { user };
};

export function Header() {
  const t = useTranslations("header");
  const { user } = useAuth();
  const router = useRouter();

  const handlePremium = () => {
    // Implement premium upgrade logic
    router.push("/pricing");
    console.log("Premium clicked");
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout clicked");
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="QuizBoost Logo"
                width={250}
                height={250}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-3 p-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>{t("auth.profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>{t("auth.dashboard")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/history")}>
                <History className="mr-2 h-4 w-4" />
                <span>{t("auth.history")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t("auth.settings")}</span>
              </DropdownMenuItem>
              {!user.isPremium && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handlePremium}
                    className="text-amber-600"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    <span>{t("auth.premium")}</span>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("auth.logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

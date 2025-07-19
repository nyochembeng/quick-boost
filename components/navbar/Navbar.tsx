"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Settings,
  BarChart3,
  LogOut,
  Crown,
  Menu,
  ChevronDown,
  History,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock authentication state - replace with your actual auth logic
const useAuth = () => {
  // This should be replaced with your actual authentication logic
  const isAuthenticated = false; // Change to true to test authenticated state
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatar-placeholder.jpg", // Replace with actual avatar URL
    isPremium: false, // Add premium status
  };

  return { isAuthenticated, user };
};

export default function Navbar() {
  const t = useTranslations("navbar");
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    // Implement login logic
    router.push("/auth/login"); // Redirect to login page
    console.log("Login clicked");
  };

  const handleSignup = () => {
    // Implement signup logic
    router.push("/auth/signup"); // Redirect to signup page
    console.log("Signup clicked");
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout clicked");
  };

  const handlePremium = () => {
    // Implement premium upgrade logic
    router.push("/pricing");
    console.log("Premium clicked");
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const navigationItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/pricing", label: t("nav.pricing") },
    { href: "/help", label: t("nav.help") },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="QuizBoost Logo"
                width={200}
                height={200}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              /* Authenticated User - Profile Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 p-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {getUserInitials(user.name)}
                      </AvatarFallback>
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
            ) : (
              /* Unauthenticated User - Login/Signup Buttons */
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" onClick={handleLogin}>
                  {t("auth.login")}
                </Button>
                <Button onClick={handleSignup}>{t("auth.signup")}</Button>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>{t("mobile.menu")}</SheetTitle>
                  <SheetDescription>{t("mobile.description")}</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Navigation Links */}
                  <div className="flex flex-col space-y-3">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    {isAuthenticated ? (
                      /* Authenticated User - Mobile Menu */
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-3 py-2 px-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          className="justify-start"
                          onClick={() => {
                            router.push("/profile");
                            closeMobileMenu();
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          {t("auth.profile")}
                        </Button>

                        <Button
                          variant="ghost"
                          className="justify-start"
                          onClick={() => {
                            router.push("/dashboard");
                            closeMobileMenu();
                          }}
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />
                          {t("auth.dashboard")}
                        </Button>

                        <Button
                          variant="ghost"
                          className="justify-start"
                          onClick={() => {
                            router.push("/settings");
                            closeMobileMenu();
                          }}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          {t("auth.settings")}
                        </Button>

                        {!user.isPremium && (
                          <Button
                            variant="ghost"
                            className="justify-start text-amber-600"
                            onClick={() => {
                              handlePremium();
                              closeMobileMenu();
                            }}
                          >
                            <Crown className="mr-2 h-4 w-4" />
                            {t("auth.premium")}
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          className="justify-start"
                          onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          {t("auth.logout")}
                        </Button>
                      </div>
                    ) : (
                      /* Unauthenticated User - Mobile Menu */
                      <div className="flex flex-col space-y-3">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            handleLogin();
                            closeMobileMenu();
                          }}
                        >
                          {t("auth.login")}
                        </Button>
                        <Button
                          onClick={() => {
                            handleSignup();
                            closeMobileMenu();
                          }}
                        >
                          {t("auth.signup")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

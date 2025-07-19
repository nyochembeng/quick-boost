"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

// Password strength checker
const getPasswordStrength = (
  password: string
): { strength: string; color: string; width: string } => {
  if (password.length === 0) return { strength: "", color: "", width: "0%" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2)
    return { strength: "Weak", color: "bg-red-500", width: "33%" };
  if (score <= 3)
    return { strength: "Medium", color: "bg-yellow-500", width: "66%" };
  if (score <= 4)
    return { strength: "Strong", color: "bg-green-500", width: "100%" };
  return { strength: "Very Strong", color: "bg-green-600", width: "100%" };
};

export default function SignUpPage() {
  const t = useTranslations("auth.signup");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    color: "",
    width: "0%",
  });

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Handle signup logic here
      router.push("/onboarding");
      console.log("Sign up data:", data);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const handlePasswordChange = (value: string) => {
    form.setValue("password", value);
    setPasswordStrength(getPasswordStrength(value));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">{t("subtitle")}</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t("fullName")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("fullNamePlaceholder")}
                      className="w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t("email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t("password")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder={t("passwordPlaceholder")}
                        className="w-full px-3 py-2 sm:py-3 pr-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => {
                          field.onChange(e);
                          handlePasswordChange(e.target.value);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  {/* Password Strength Indicator */}
                  {field.value && (
                    <div className="mt-2 space-y-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: passwordStrength.width }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        {t("passwordStrength")}: {passwordStrength.strength}
                      </p>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Terms Agreement */}
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-600">
                      {t("agreeToTerms")}{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:underline"
                      >
                        {t("termsOfService")}
                      </Link>{" "}
                      {t("and")}{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        {t("privacyPolicy")}
                      </Link>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? t("signingUp") : t("signUp")}
            </Button>
          </form>
        </Form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t("alreadyHaveAccount")}{" "}
            <Link
              href="/auth/login"
              className="text-green-600 hover:underline font-medium"
            >
              {t("logIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

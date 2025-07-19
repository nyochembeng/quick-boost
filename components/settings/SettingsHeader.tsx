"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SettingsHeader() {
  const t = useTranslations("settings");
  const router = useRouter();

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="flex items-center gap-4 px-4 sm:px-6 lg:px-8 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          {t("title")}
        </h1>
      </div>
    </div>
  );
}

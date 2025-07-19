"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";

export function StoragePrivacy() {
  const t = useTranslations("settings");
  const router = useRouter();

  const handleClearProgress = () => {
    // Handle clear progress logic
    console.log("Clearing progress...");
  };

  const handleExportData = () => {
    // Handle export data logic
    console.log("Exporting data...");
  };

  const handleGoPremium = () => {
    router.push("/pricing");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {t("storagePrivacy.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="destructive"
          onClick={handleClearProgress}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          {t("storagePrivacy.clearProgress")}
        </Button>

        <Button
          onClick={handleExportData}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {t("storagePrivacy.exportData")}
        </Button>

        <Button
          onClick={handleGoPremium}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white relative"
        >
          <Crown className="w-4 h-4 mr-2" />
          {t("storagePrivacy.goPremium")}
          <Badge className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs px-2 py-1">
            {t("storagePrivacy.upgrade")}
          </Badge>
        </Button>
      </CardContent>
    </Card>
  );
}

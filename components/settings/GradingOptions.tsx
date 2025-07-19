"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function GradingOptions() {
  const t = useTranslations("settings");
  const [semanticScoring, setSemanticScoring] = useState(true);
  const [showHints, setShowHints] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {t("gradingOptions.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {t("gradingOptions.semanticScoring.title")}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {t("gradingOptions.semanticScoring.description")}
              </p>
            </div>
            <Switch
              checked={semanticScoring}
              onCheckedChange={setSemanticScoring}
              className="ml-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {t("gradingOptions.showHints.title")}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {t("gradingOptions.showHints.description")}
              </p>
            </div>
            <Switch
              checked={showHints}
              onCheckedChange={setShowHints}
              className="ml-4"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

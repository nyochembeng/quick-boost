"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function PricingCards() {
  const t = useTranslations("pricing");

  const freeFeatures = [
    "dailyQuizzes",
    "basicAnalytics",
    "coreSubjects",
    "limitedQuestions",
    "adSupported",
  ];

  const premiumFeatures = [
    "unlimitedQuizzes",
    "allSubjects",
    "advancedAnalytics",
    "offlineAccess",
    "adFree",
    "personalizedRevision",
    "prioritySupport",
    "earlyAccess",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Free Plan */}
      <Card className="bg-blue-50 border-blue-200 relative">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            {t("freePlan.title")}
          </CardTitle>
          <div className="mt-4">
            <span className="text-4xl font-bold text-gray-900">
              {t("freePlan.price")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {t("freePlan.button")}
          </Button>
          <div className="space-y-3">
            {freeFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  {t(`freePlan.features.${feature}`)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Premium Plan */}
      <Card className="bg-orange-50 border-orange-200 relative">
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 text-sm">
          {t("premiumPlan.badge")}
        </Badge>
        <CardHeader className="text-center pb-4 pt-8">
          <CardTitle className="text-xl font-semibold text-gray-900">
            {t("premiumPlan.title")}
          </CardTitle>
          <div className="mt-4">
            <span className="text-4xl font-bold text-gray-900">
              {t("premiumPlan.price")}
            </span>
            <span className="text-gray-600 ml-2">
              {t("premiumPlan.period")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            {t("premiumPlan.button")}
          </Button>
          <div className="space-y-3">
            {premiumFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  {t(`premiumPlan.features.${feature}`)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

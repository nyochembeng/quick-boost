"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Target, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export function StatsCards() {
  const t = useTranslations("dashboard");
  const router = useRouter();

  const handleContinueQuiz = () => {
    // Navigate to continue the previous uncompleted quiz
    router.push("/quiz");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Continue Learning Card */}
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t("continueLearning")}</CardTitle>
          <CardDescription className="text-sm">
            {t("currentSubject")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("progress")}</span>
              <span className="font-medium">
                5 of 15 {t("questionsCompleted")}
              </span>
            </div>
            <Progress value={33} className="h-2" />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
            onClick={handleContinueQuiz}
          >
            {t("continue")}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Quiz Card */}
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t("quickQuiz")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="w-4 h-4" />
            <span>5 {t("questions")}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>5 {t("minutes")}</span>
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
            onClick={() => router.push("/choose-subject")}
          >
            {t("startNow")}
          </Button>
        </CardContent>
      </Card>

      {/* Progress Card */}
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t("yourProgress")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">82%</div>
            <div className="text-sm text-gray-600">{t("lastQuizScore")}</div>
          </div>
          <Button
            variant="outline"
            className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 cursor-pointer"
            onClick={() => router.push("/history")}
          >
            {t("viewAll")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

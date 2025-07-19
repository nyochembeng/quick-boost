"use client";

import { useTranslations } from "next-intl";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AccuracyChart } from "@/components/dashboard/AccuracyChart";
import { RecommendedTopics } from "@/components/dashboard/RecommendedTopics";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();

  const handleChooseSubject = () => {
    router.push("/choose-subject");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <WelcomeSection />

        {/* Stats Cards */}
        <StatsCards />

        {/* New Subject Selection Card */}
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              {t("newSubject.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-2">
                  {t("newSubject.description")}
                </p>
                <p className="text-xs text-gray-500">
                  {t("newSubject.subtext")}
                </p>
              </div>
              <Button
                onClick={handleChooseSubject}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                {t("newSubject.button")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Accuracy Chart */}
        <AccuracyChart />

        {/* Recommended Topics */}
        <RecommendedTopics />
      </main>
    </div>
  );
}

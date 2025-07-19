"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, TrendingUp, Calendar } from "lucide-react";
import { FilterButton } from "@/components/utils/FilterButton";
import { SessionHistoryItem } from "@/components/history/SessionHistoryItem";
import { PerformanceChart } from "@/components/history/PerformanceChart";
import { useRouter } from "next/navigation";

export default function QuizHistoryPage() {
  const t = useTranslations("quiz_history");
  const [selectedFilter, setSelectedFilter] = useState("last_7_days");
  const router = useRouter();

  // Filter options
  const filterOptions = [
    { value: "last_7_days", label: t("filter.last_7_days") },
    { value: "last_30_days", label: t("filter.last_30_days") },
    { value: "last_3_months", label: t("filter.last_3_months") },
    { value: "last_6_months", label: t("filter.last_6_months") },
    { value: "all_time", label: t("filter.all_time") },
  ];

  // Mock data - replace with actual data from your state management
  const historyData = [
    { date: "Jan 15, 2024", title: t("sessions.javascript_basics"), score: 85 },
    { date: "Jan 14, 2024", title: t("sessions.react_hooks"), score: 92 },
    { date: "Jan 13, 2024", title: t("sessions.css_grid"), score: 78 },
    { date: "Jan 12, 2024", title: t("sessions.typescript"), score: 88 },
    { date: "Jan 11, 2024", title: t("sessions.nodejs"), score: 95 },
    { date: "Jan 10, 2024", title: t("sessions.web_apis"), score: 82 },
    { date: "Jan 9, 2024", title: t("sessions.dom_manipulation"), score: 75 },
  ];

  const performanceData = [
    { date: "Jan 15", score: 85 },
    { date: "Jan 14", score: 92 },
    { date: "Jan 13", score: 78 },
    { date: "Jan 12", score: 88 },
    { date: "Jan 11", score: 95 },
    { date: "Jan 10", score: 82 },
    { date: "Jan 9", score: 75 },
  ];

  const handleSessionClick = (session: (typeof historyData)[0]) => {
    // Navigate to session details
    router.push(`/history/${session}`);
    console.log("Navigate to session:", session);
  };

  const handleExportHistory = () => {
    // Export functionality
    console.log("Export history");
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    // Add logic to filter data based on selected value
    console.log("Filter changed to:", value);
  };

  // Calculate stats for the header
  const totalSessions = historyData.length;
  const averageScore = Math.round(
    historyData.reduce((sum, session) => sum + session.score, 0) / totalSessions
  );
  const highestScore = Math.max(...historyData.map((session) => session.score));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {t("page_title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("page_description")}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="text-center border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {totalSessions}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {t("stats.total_sessions")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {averageScore}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {t("stats.average_score")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {highestScore}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {t("stats.highest_score")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 hidden sm:block">
            {t("your_learning_journey")}
          </h2>
          <FilterButton
            label={t("filter.time_period")}
            options={filterOptions}
            selectedValue={selectedFilter}
            onSelect={handleFilterChange}
            placeholder={t("filter.select_period")}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">
              {t("session_history")}
            </h3>
            <div className="space-y-3">
              {historyData.map((session, index) => (
                <SessionHistoryItem
                  key={index}
                  date={session.date}
                  title={session.title}
                  score={session.score}
                  onClick={() => handleSessionClick(session)}
                />
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">
              {t("performance_overview")}
            </h3>
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-900">
                  {t("performance_chart_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart data={performanceData} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleExportHistory}
            className="w-full sm:w-auto min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {t("export_history")}
          </Button>
        </div>
      </div>
    </div>
  );
}

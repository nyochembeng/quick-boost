"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/utils/BackButton";
import { SessionHeader } from "@/components/history/SessionHeader";
import { ProgressCircle } from "@/components/utils/ProgressCircle";
import { QuestionCard } from "@/components/history/QuestionCard";

export default function SessionDetailsPage() {
  const t = useTranslations("session_details");

  // Mock data - replace with actual data from your state management
  const sessionData = {
    title: t("title"),
    subtitle: t("subtitle"),
    date: "July 18, 2025",
    duration: "8 min 24 s",
    score: 12,
    total: 15,
    percentage: 80,
    questions: [
      {
        id: 1,
        question: t("question1.text"),
        userAnswer: "6x + 2",
        correctAnswer: "6x + 2",
        isCorrect: true,
        explanation: t("question1.explanation"),
        timeSpent: "25 s",
      },
      {
        id: 2,
        question: t("question2.text"),
        userAnswer: "0",
        correctAnswer: "-1",
        isCorrect: false,
        explanation: t("question2.explanation"),
        timeSpent: "35 s",
      },
      {
        id: 3,
        question: t("question3.text"),
        userAnswer: "2e^(2x)",
        correctAnswer: "2e^(2x)",
        isCorrect: true,
        explanation: t("question3.explanation"),
        timeSpent: "20 s",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <BackButton label={t("back")} />
          <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
            {t("page_title")}
          </h1>
          <div className="text-sm text-gray-400 sm:hidden">
            {sessionData.date}
          </div>
          <div className="text-sm text-gray-400 hidden sm:block">
            {sessionData.date}
          </div>
        </div>

        {/* Session Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <SessionHeader
                title={sessionData.title}
                subtitle={sessionData.subtitle}
                date={sessionData.date}
                duration={sessionData.duration}
              />
            </div>
            <div className="flex justify-center sm:justify-end">
              <ProgressCircle
                score={sessionData.score}
                total={sessionData.total}
                percentage={sessionData.percentage}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {sessionData.questions.map((question) => (
            <QuestionCard
              key={question.id}
              questionNumber={question.id}
              question={question.question}
              userAnswer={question.userAnswer}
              correctAnswer={question.correctAnswer}
              isCorrect={question.isCorrect}
              explanation={question.explanation}
              timeSpent={question.timeSpent}
            />
          ))}
        </div>

        {/* Retry Button */}
        <div className="mt-8 flex justify-center">
          <Button className="w-full sm:w-auto min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium">
            {t("retry_session")}
          </Button>
        </div>
      </div>
    </div>
  );
}

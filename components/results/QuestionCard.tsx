"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface QuestionResult {
  id: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  timeSpent: string;
}

interface QuestionCardProps {
  question: QuestionResult;
  questionNumber: number;
}

function QuestionCard({ question, questionNumber }: QuestionCardProps) {
  const t = useTranslations("quiz.results");

  return (
    <Card className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        {/* Question Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              {t("question")} {questionNumber}
            </p>
            <h3 className="text-sm sm:text-base font-medium text-gray-900">
              {question.question}
            </h3>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-xs sm:text-sm text-gray-600">
              {t("timeSpent")}: {question.timeSpent}
            </span>
          </div>
        </div>

        {/* User Answer */}
        <div className="mb-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            {t("yourAnswer")}
          </p>
          <div
            className={`p-3 sm:p-4 rounded-lg flex items-center gap-2 ${
              question.isCorrect
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {question.isCorrect ? (
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              {question.userAnswer}
            </span>
          </div>
        </div>

        {/* Correct Answer (if wrong) */}
        {!question.isCorrect && (
          <div className="mb-4">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              {t("correctAnswer")}
            </p>
            <div className="p-3 sm:p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-900">
                {question.correctAnswer}
              </span>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            {t("explanation")}
          </p>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuestionCard;

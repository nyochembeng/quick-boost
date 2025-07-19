"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  CheckCircle,
  Badge,
  RotateCcw,
  BarChart3,
  History,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StatsCard from "@/components/results/StatsCard";
import QuestionCard from "@/components/results/QuestionCard";
import { QuizTimeAnalytics } from "@/components/results/QuizTimeAnalytics";

interface QuizResultsData {
  subject: string;
  title: string;
  score: string;
  percentage: string;
  timeTaken: string;
  date: string;
  questions: QuestionResult[];
  mode: "diagnostic" | "adaptive";
  questionTimes?: QuestionTimeData[];
  averageTimePerQuestion?: number;
  totalTimeSpent?: number;
}

interface QuestionResult {
  id: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  timeSpent: string;
}

interface QuestionTimeData {
  questionIndex: number;
  timeSpent: number;
  startTime: number;
}

// This would typically come from your quiz results or be passed via props/context
const mockData: QuizResultsData = {
  subject: "Advanced Mathematics",
  title: "Calculus - Derivatives",
  score: "12/15",
  percentage: "80%",
  timeTaken: "25:30",
  date: "December 15, 2023",
  mode: "diagnostic",
  totalTimeSpent: 1530, // 25:30 in seconds
  averageTimePerQuestion: 102, // ~1:42 per question
  questionTimes: [
    { questionIndex: 0, timeSpent: 165, startTime: Date.now() - 165000 },
    { questionIndex: 1, timeSpent: 95, startTime: Date.now() - 95000 },
    { questionIndex: 2, timeSpent: 90, startTime: Date.now() - 90000 },
  ],
  questions: [
    {
      id: 1,
      question: "What is the derivative of f(x) = x² with respect to x?",
      userAnswer: "f'(x) = x",
      correctAnswer: "f'(x) = 2x",
      isCorrect: false,
      explanation:
        "To find the derivative of x², we use the power rule: multiply by the power and reduce the exponent by 1. Therefore, f'(x) = 2x¹ = 2x",
      timeSpent: "2:45",
    },
    {
      id: 2,
      question: "Find the derivative of g(x) = 3x³ + 2x² - 5x + 7",
      userAnswer: "g'(x) = 9x² + 4x - 5",
      correctAnswer: "g'(x) = 9x² + 4x - 5",
      isCorrect: true,
      explanation:
        "Apply the power rule to each term: 3(3)x² + 2(2)x - 5 = 9x² + 4x - 5",
      timeSpent: "3:15",
    },
    {
      id: 3,
      question: "What is the derivative of h(x) = sin(x) at x = π/2?",
      userAnswer: "cos(π/2)",
      correctAnswer: "-1",
      isCorrect: false,
      explanation:
        "The derivative of sin(x) is cos(x). At x = π/2, cos(π/2) = 0, but we need to evaluate the rate of change, which is -1.",
      timeSpent: "1:30",
    },
  ],
};

export default function QuizResultsPage() {
  const t = useTranslations("quiz.results");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quizData, setQuizData] = useState<QuizResultsData>(mockData);
  const [isLoading, setIsLoading] = useState(false);

  // Get quiz parameters from URL for retry functionality
  const subject = searchParams.get("subject");
  const topic = searchParams.get("topic");
  const mode = searchParams.get("mode") as "diagnostic" | "adaptive" | null;
  const difficulty = searchParams.get("difficulty");

  useEffect(() => {
    // In a real app, you would fetch the quiz results based on URL params or session data
    // For now, we'll use the mock data but update it based on URL params if available
    if (subject || topic || mode) {
      setQuizData((prev) => ({
        ...prev,
        subject: subject || prev.subject,
        title: topic || prev.title,
        mode: mode || prev.mode,
      }));
    }
  }, [subject, topic, mode]);

  const handleRetryQuiz = () => {
    setIsLoading(true);

    // Build the quiz URL with the same parameters
    const quizParams = new URLSearchParams();

    if (subject) quizParams.set("subject", subject);
    if (topic) quizParams.set("topic", topic);
    if (mode) quizParams.set("mode", mode);
    if (difficulty) quizParams.set("difficulty", difficulty);

    // Navigate back to the quiz with the same parameters
    const quizUrl = `/quiz${
      quizParams.toString() ? `?${quizParams.toString()}` : ""
    }`;

    setTimeout(() => {
      router.push(quizUrl);
    }, 500); // Small delay for better UX
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const handleViewHistory = () => {
    router.push("/history");
  };

  const handleTryDifferentQuiz = () => {
    router.push("/choose-topic");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const getScoreColor = (percentage: string) => {
    const score = parseInt(percentage.replace("%", ""));
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceMessage = (percentage: string) => {
    const score = parseInt(percentage.replace("%", ""));
    if (score >= 90) return t("performance.excellent");
    if (score >= 80) return t("performance.good");
    if (score >= 70) return t("performance.fair");
    if (score >= 60) return t("performance.needsImprovement");
    return t("performance.studyMore");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                {quizData.subject} •{" "}
                {quizData.mode === "diagnostic"
                  ? t("diagnosticMode")
                  : t("adaptiveMode")}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {quizData.title}
              </h1>
            </div>
            <div className="text-right">
              <div
                className={`text-2xl sm:text-3xl font-bold ${getScoreColor(
                  quizData.percentage
                )}`}
              >
                {quizData.percentage}
              </div>
              <p className="text-sm text-gray-600">
                {getPerformanceMessage(quizData.percentage)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <StatsCard
            label={t("score")}
            value={quizData.score}
            icon={<CheckCircle className="w-4 h-4 text-blue-600" />}
          />
          <StatsCard
            label={t("percentage")}
            value={quizData.percentage}
            icon={<Badge className="w-4 h-4 text-green-600" />}
          />
          <StatsCard
            label={t("timeTaken")}
            value={quizData.timeTaken}
            icon={<Clock className="w-4 h-4 text-orange-600" />}
          />
          <StatsCard
            label={t("date")}
            value={quizData.date}
            icon={<Calendar className="w-4 h-4 text-blue-600" />}
          />
        </motion.div>

        {/* Time Analytics */}
        {quizData.questionTimes &&
          quizData.averageTimePerQuestion &&
          quizData.totalTimeSpent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-6 sm:mb-8"
            >
              <QuizTimeAnalytics
                questionTimes={quizData.questionTimes}
                averageTimePerQuestion={quizData.averageTimePerQuestion}
                totalTimeSpent={quizData.totalTimeSpent}
                mode={quizData.mode}
              />
            </motion.div>
          )}

        {/* Questions Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 sm:space-y-6 mb-6 sm:mb-8"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            {t("questionReview")}
          </h2>
          {quizData.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={index + 1}
            />
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {/* Retry Quiz */}
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base flex items-center gap-2"
            onClick={handleRetryQuiz}
            disabled={isLoading}
          >
            <RotateCcw className="w-4 h-4" />
            {isLoading ? t("loading") : t("retryQuiz")}
          </Button>

          {/* Go to Dashboard */}
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-sm sm:text-base flex items-center gap-2 cursor-pointer"
            onClick={handleGoToDashboard}
          >
            <BarChart3 className="w-4 h-4" />
            {t("goToDashboard")}
          </Button>

          {/* View History */}
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-sm sm:text-base flex items-center gap-2 cursor-pointer"
            onClick={handleViewHistory}
          >
            <History className="w-4 h-4" />
            {t("viewHistory")}
          </Button>

          {/* Try Different Quiz */}
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-sm sm:text-base cursor-pointer"
            onClick={handleTryDifferentQuiz}
          >
            {t("tryDifferentQuiz")}
          </Button>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            onClick={handleGoHome}
          >
            {t("backToHome")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

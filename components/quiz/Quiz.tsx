"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Lightbulb } from "lucide-react";
import { QuizProgress } from "./QuizProgress";
import { QuizHeader } from "./QuizHeader";
import { QuizOption } from "./QuizOption";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  hint?: string;
}

interface QuestionTimeData {
  questionIndex: number;
  timeSpent: number;
  startTime: number;
}

interface QuizState {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
  selectedAnswer: number | null;
  answers: (number | null)[];
  score: number;
  isCompleted: boolean;
  questionStartTime: number;
  questionTimes: QuestionTimeData[];
}

interface QuizProps {
  mode: "diagnostic" | "adaptive";
  subject: string;
  topic: string;
  questions: QuizQuestion[];
  onQuizComplete: (results: QuizResults) => void;
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: (number | null)[];
  mode: "diagnostic" | "adaptive";
  questionTimes: QuestionTimeData[];
  averageTimePerQuestion: number;
}

export function Quiz({
  mode,
  subject,
  topic,
  questions,
  onQuizComplete,
}: QuizProps) {
  const t = useTranslations("quiz");
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    totalQuestions: questions.length,
    timeRemaining: mode === "diagnostic" ? 900 : 600, // 15 min for diagnostic, 10 min for adaptive
    selectedAnswer: null,
    answers: new Array(questions.length).fill(null),
    score: 0,
    isCompleted: false,
    questionStartTime: Date.now(),
    questionTimes: [],
  });

  const [showHint, setShowHint] = useState(false);
  const currentQuestion = questions[quizState.currentQuestion];
  const isLastQuestion = quizState.currentQuestion === questions.length - 1;

  // Reset question start time when question changes
  useEffect(() => {
    setQuizState((prev) => ({
      ...prev,
      questionStartTime: Date.now(),
    }));
  }, [quizState.currentQuestion]);

  const calculateQuestionTime = () => {
    const currentTime = Date.now();
    const timeSpent = Math.round(
      (currentTime - quizState.questionStartTime) / 1000
    ); // Convert to seconds
    return timeSpent;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answerIndex,
    }));
  };

  const handleSubmit = () => {
    if (quizState.selectedAnswer === null) return;

    const questionTimeSpent = calculateQuestionTime();
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = quizState.selectedAnswer;

    const isCorrect =
      quizState.selectedAnswer === currentQuestion.correctAnswer;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    // Add current question time data
    const newQuestionTimes = [
      ...quizState.questionTimes,
      {
        questionIndex: quizState.currentQuestion,
        timeSpent: questionTimeSpent,
        startTime: quizState.questionStartTime,
      },
    ];

    if (isLastQuestion) {
      // Complete the quiz
      const totalTimeSpent =
        (mode === "diagnostic" ? 900 : 600) - quizState.timeRemaining;
      const averageTimePerQuestion =
        newQuestionTimes.reduce((sum, qt) => sum + qt.timeSpent, 0) /
        newQuestionTimes.length;

      setQuizState((prev) => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
        questionTimes: newQuestionTimes,
      }));

      onQuizComplete({
        score: newScore,
        totalQuestions: questions.length,
        timeSpent: totalTimeSpent,
        answers: newAnswers,
        mode,
        questionTimes: newQuestionTimes,
        averageTimePerQuestion,
      });
    } else {
      // Move to next question
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        answers: newAnswers,
        score: newScore,
        questionTimes: newQuestionTimes,
        questionStartTime: Date.now(), // This will be updated by useEffect
      }));
      setShowHint(false);
    }
  };

  const handleTimeUp = () => {
    // Calculate time for current question when time runs out
    const questionTimeSpent = calculateQuestionTime();
    const finalQuestionTimes = [...quizState.questionTimes];

    // Add current question time if not already added
    if (finalQuestionTimes.length <= quizState.currentQuestion) {
      finalQuestionTimes.push({
        questionIndex: quizState.currentQuestion,
        timeSpent: questionTimeSpent,
        startTime: quizState.questionStartTime,
      });
    }

    const totalTimeSpent = mode === "diagnostic" ? 900 : 600;
    const averageTimePerQuestion =
      finalQuestionTimes.reduce((sum, qt) => sum + qt.timeSpent, 0) /
      finalQuestionTimes.length;

    onQuizComplete({
      score: quizState.score,
      totalQuestions: questions.length,
      timeSpent: totalTimeSpent,
      answers: quizState.answers,
      mode,
      questionTimes: finalQuestionTimes,
      averageTimePerQuestion,
    });
  };

  const handleTimeUpdate = (time: number) => {
    setQuizState((prev) => ({
      ...prev,
      timeRemaining: time,
    }));
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  if (quizState.isCompleted) {
    return null; // Parent component handles quiz completion
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <QuizProgress
            currentQuestion={quizState.currentQuestion + 1}
            totalQuestions={quizState.totalQuestions}
          />
        </div>

        <Card className="p-6 sm:p-8 lg:p-10 smartwatch:p-4">
          {/* Header */}
          <QuizHeader
            subject={mode === "diagnostic" ? subject : undefined}
            difficulty={
              mode === "diagnostic" ? currentQuestion.difficulty : undefined
            }
            mode={mode}
            timeRemaining={quizState.timeRemaining}
            questionStartTime={quizState.questionStartTime}
            onTimeUp={handleTimeUp}
            onTimeUpdate={handleTimeUpdate}
            showDetails={mode === "diagnostic"}
          />

          {/* Question */}
          <div className="mb-8 smartwatch:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-6 smartwatch:text-base smartwatch:mb-4">
              {mode === "diagnostic"
                ? `${t("question")} ${quizState.currentQuestion + 1}`
                : ""}
            </h2>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed smartwatch:text-sm">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="mb-8 smartwatch:mb-6">
            <RadioGroup
              value={quizState.selectedAnswer?.toString() || ""}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              <div className="space-y-3 smartwatch:space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <QuizOption
                    key={index}
                    option={option}
                    value={index.toString()}
                    isSelected={quizState.selectedAnswer === index}
                    onSelect={() => handleAnswerSelect(index)}
                  />
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Hint Section */}
          {mode === "diagnostic" && currentQuestion.hint && (
            <div className="mb-8 smartwatch:mb-6">
              <button
                onClick={toggleHint}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors smartwatch:space-x-1"
              >
                <Lightbulb className="w-4 h-4 smartwatch:w-3 smartwatch:h-3" />
                <span className="text-sm font-medium smartwatch:text-xs">
                  {showHint ? t("hideHint") : t("needHint")}
                </span>
              </button>

              {showHint && (
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg smartwatch:mt-2 smartwatch:p-3">
                  <p className="text-sm text-green-800 smartwatch:text-xs">
                    {currentQuestion.hint}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={quizState.selectedAnswer === null}
              className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed smartwatch:px-6 smartwatch:py-2 smartwatch:text-xs"
            >
              {isLastQuestion ? t("submitAnswer") : t("submitNext")}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

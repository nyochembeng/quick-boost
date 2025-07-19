"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Quiz } from "@/components/quiz/Quiz";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  hint?: string;
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: (number | null)[];
  mode: "diagnostic" | "adaptive";
}

export default function QuizPage() {
  const t = useTranslations("quiz");
  const router = useRouter();
  const searchParams = useSearchParams();

  const subject = searchParams.get("subject") || "";
  const topic = searchParams.get("topic") || "";
  const mode =
    (searchParams.get("mode") as "diagnostic" | "adaptive") || "diagnostic";

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock questions - in a real app, these would come from an API
  const mockQuestions: QuizQuestion[] = [
    {
      id: "1",
      question:
        "What is the primary purpose of a constructor in object-oriented programming?",
      options: [
        "To initialize object properties",
        "To destroy objects when they're no longer needed",
        "To define class methods",
        "To handle exceptions in the code",
      ],
      correctAnswer: 0,
      difficulty: "Intermediate",
      hint: "Think about what happens when you create a new instance of a class.",
    },
    {
      id: "2",
      question:
        "If a triangle has angles measuring 45°, 45°, and 90°, what is the ratio of its shortest to its longest side?",
      options: ["1:√2", "1:2", "1:1", "2:√2"],
      correctAnswer: 0,
      difficulty: "Intermediate",
      hint: "In a 45-45-90 triangle, the sides are in the ratio 1:1:√2.",
    },
    {
      id: "3",
      question:
        "Which of the following is NOT a principle of object-oriented programming?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
      correctAnswer: 3,
      difficulty: "Beginner",
      hint: "Think about the core concepts that define OOP methodology.",
    },
    {
      id: "4",
      question: "What is the derivative of x³ + 2x² - 5x + 1?",
      options: ["3x² + 4x - 5", "3x² + 2x - 5", "x³ + 4x - 5", "3x² + 4x - 5x"],
      correctAnswer: 0,
      difficulty: "Intermediate",
      hint: "Use the power rule: d/dx(xⁿ) = nxⁿ⁻¹",
    },
    {
      id: "5",
      question: "In statistics, what does the median represent?",
      options: [
        "The most frequently occurring value",
        "The middle value when data is arranged in order",
        "The average of all values",
        "The difference between the highest and lowest values",
      ],
      correctAnswer: 1,
      difficulty: "Beginner",
      hint: "Think about what happens when you arrange all values from smallest to largest.",
    },
    {
      id: "6",
      question: "What is the area of a circle with radius 5 units?",
      options: [
        "25π square units",
        "10π square units",
        "5π square units",
        "50π square units",
      ],
      correctAnswer: 0,
      difficulty: "Beginner",
      hint: "Remember the formula: A = πr²",
    },
    {
      id: "7",
      question:
        "Which sorting algorithm has the best average-case time complexity?",
      options: [
        "Bubble Sort",
        "Selection Sort",
        "Merge Sort",
        "Insertion Sort",
      ],
      correctAnswer: 2,
      difficulty: "Advanced",
      hint: "Consider algorithms that use divide-and-conquer strategy.",
    },
    {
      id: "8",
      question:
        "What is the probability of rolling a sum of 7 with two fair six-sided dice?",
      options: ["1/6", "1/12", "1/36", "6/36"],
      correctAnswer: 0,
      difficulty: "Intermediate",
      hint: "Count all the ways to get a sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)",
    },
  ];

  useEffect(() => {
    // Simulate loading questions
    const timer = setTimeout(() => {
      if (mode === "adaptive") {
        // For adaptive mode, we might filter or generate questions based on user's previous performance
        setQuestions(mockQuestions.slice(0, 5));
      } else {
        setQuestions(mockQuestions);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleQuizComplete = (results: QuizResults) => {
    // Store results and navigate to results page
    localStorage.setItem("quizResults", JSON.stringify(results));
    router.push("/results");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loadingQuiz")}</p>
        </div>
      </div>
    );
  }

  if (!subject || !topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("invalidQuiz")}</p>
          <button
            onClick={() => router.push("/choose-subject")}
            className="text-blue-600 hover:text-blue-700"
          >
            {t("backToSubjects")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Quiz
      mode={mode}
      subject={subject}
      topic={topic}
      questions={questions}
      onQuizComplete={handleQuizComplete}
    />
  );
}

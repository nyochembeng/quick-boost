"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/utils/StepIndicator";
import { SubjectCard } from "@/components/quiz/SubjectCard";

interface Subject {
  id: string;
  name: string;
  icon: string;
}

export default function ChooseSubjectPage() {
  const t = useTranslations("chooseSubject");
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects: Subject[] = [
    { id: "algebra", name: t("subjects.algebra"), icon: "algebra" },
    { id: "biology", name: t("subjects.biology"), icon: "biology" },
    { id: "physics", name: t("subjects.physics"), icon: "physics" },
    { id: "chemistry", name: t("subjects.chemistry"), icon: "chemistry" },
    { id: "literature", name: t("subjects.literature"), icon: "literature" },
    { id: "history", name: t("subjects.history"), icon: "history" },
  ];

  const handleStartQuiz = () => {
    if (selectedSubject) {
      router.push(`/choose-topic?subject=${selectedSubject}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-12 smartwatch:p-4">
          <StepIndicator currentStep={1} totalSteps={3} />

          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 smartwatch:text-lg">
              {t("title")}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 smartwatch:grid-cols-1 smartwatch:gap-3">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                isSelected={selectedSubject === subject.id}
                onClick={() => setSelectedSubject(subject.id)}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleStartQuiz}
              disabled={!selectedSubject}
              className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed smartwatch:px-6 smartwatch:py-2 smartwatch:text-xs"
            >
              {t("startQuiz")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { StepIndicator } from "@/components/utils/StepIndicator";
import { TopicCard } from "@/components/quiz/TopicCard";

interface Topic {
  id: string;
  name: string;
  description: string;
  icon: "book" | "lightbulb";
  lastScore?: number;
  isNewTopic?: boolean;
}

export default function ChooseTopicPage() {
  const t = useTranslations("chooseTopic");
  const router = useRouter();
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Mock data - in real app, this would come from an API based on selected subject
  const topics: Topic[] = [
    {
      id: "quadratics",
      name: t("topics.quadratics.name"),
      description: t("topics.quadratics.description"),
      icon: "book",
      lastScore: 92,
    },
    {
      id: "linear-algebra",
      name: t("topics.linearAlgebra.name"),
      description: t("topics.linearAlgebra.description"),
      icon: "lightbulb",
      lastScore: 88,
    },
    {
      id: "calculus",
      name: t("topics.calculus.name"),
      description: t("topics.calculus.description"),
      icon: "book",
      isNewTopic: true,
    },
    {
      id: "geometry",
      name: t("topics.geometry.name"),
      description: t("topics.geometry.description"),
      icon: "lightbulb",
      lastScore: 78,
    },
    {
      id: "statistics",
      name: t("topics.statistics.name"),
      description: t("topics.statistics.description"),
      icon: "book",
      lastScore: 85,
    },
    {
      id: "probability",
      name: t("topics.probability.name"),
      description: t("topics.probability.description"),
      icon: "lightbulb",
      isNewTopic: true,
    },
    {
      id: "trigonometry",
      name: t("topics.trigonometry.name"),
      description: t("topics.trigonometry.description"),
      icon: "book",
      lastScore: 90,
    },
    {
      id: "number-theory",
      name: t("topics.numberTheory.name"),
      description: t("topics.numberTheory.description"),
      icon: "lightbulb",
      isNewTopic: true,
    },
  ];

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    // Navigate to next step or start quiz
    router.push(`/quiz?subject=${subject}&topic=${topicId}`);
  };

  useEffect(() => {
    if (!subject) {
      router.push("/choose-subject");
    }
  }, [subject, router]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-12 smartwatch:p-4">
          <StepIndicator currentStep={2} totalSteps={3} />

          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 smartwatch:text-lg">
              {t("title")}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 smartwatch:grid-cols-1 smartwatch:gap-3">
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isSelected={selectedTopic === topic.id}
                onClick={() => handleTopicClick(topic.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

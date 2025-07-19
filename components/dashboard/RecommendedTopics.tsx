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
import {
  ChevronLeft,
  ChevronRight,
  Code,
  BookOpen,
  Palette,
} from "lucide-react";
import { useRouter } from "next/navigation";

const topics = [
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript",
    icon: Code,
  },
  {
    id: "react-basics",
    title: "React Basics",
    description: "Learn React fundamentals",
    icon: Code,
  },
  {
    id: "ui-design",
    title: "UI Design Principles",
    description: "Understanding design basics",
    icon: Palette,
  },
];

export function RecommendedTopics() {
  const t = useTranslations("dashboard");
  const router = useRouter();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("recommendedTopics")}</CardTitle>
            <CardDescription>{t("topicsBasedOnProgress")}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Card
                key={topic.id}
                className="border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{topic.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {topic.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => router.push(`/quiz?topic=${topic.id}`)}
                  >
                    {t("try")}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

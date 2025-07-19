"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GraduationCap, Building, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EducationLevelCard from "@/components/profile/EducationLevelCard";
import SettingItem from "@/components/profile/SettingItem";

export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState<string>("");
  const [includeStructuralQuestions, setIncludeStructuralQuestions] =
    useState(false);
  const [preferredQuizLength, setPreferredQuizLength] = useState("5");
  const [preferredTimeLimit, setPreferredTimeLimit] = useState("none");

  const educationLevels = [
    {
      id: "highschool",
      icon: <GraduationCap className="h-5 w-5" />,
      title: t("highSchool"),
      description: t("highSchoolDesc"),
    },
    {
      id: "undergraduate",
      icon: <Building className="h-5 w-5" />,
      title: t("undergraduate"),
      description: t("undergraduateDesc"),
    },
    {
      id: "graduate",
      icon: <BookOpen className="h-5 w-5" />,
      title: t("graduate"),
      description: t("graduateDesc"),
    },
    {
      id: "professional",
      icon: <Award className="h-5 w-5" />,
      title: t("professionalCertification"),
      description: t("professionalCertificationDesc"),
    },
  ];

  const handleSaveAndContinue = () => {
    const preferences = {
      educationLevel: selectedEducationLevel,
      includeStructuralQuestions,
      preferredQuizLength,
      preferredTimeLimit,
    };
    console.log("Saving preferences:", preferences);
    // Navigate to next step or dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">{t("subtitle")}</p>
        </div>

        {/* Education Level Selection */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {t("educationLevel")}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              {t("educationLevelDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {educationLevels.map((level) => (
              <EducationLevelCard
                key={level.id}
                icon={level.icon}
                title={level.title}
                description={level.description}
                selected={selectedEducationLevel === level.id}
                onClick={() => setSelectedEducationLevel(level.id)}
              />
            ))}
          </div>
        </div>

        {/* Quiz Preferences */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {t("quizPreferences")}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              {t("quizPreferencesDesc")}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 space-y-6">
            {/* Structural Questions Toggle */}
            <SettingItem
              title={t("includeStructuralQuestions")}
              description={t("includeStructuralQuestionsDesc")}
            >
              <Switch
                checked={includeStructuralQuestions}
                onCheckedChange={setIncludeStructuralQuestions}
              />
            </SettingItem>

            {/* Quiz Length */}
            <SettingItem title={t("preferredQuizLength")} description="">
              <Select
                value={preferredQuizLength}
                onValueChange={setPreferredQuizLength}
              >
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>

            {/* Time Limit */}
            <SettingItem title={t("preferredTimeLimit")} description="">
              <Select
                value={preferredTimeLimit}
                onValueChange={setPreferredTimeLimit}
              >
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">none</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSaveAndContinue}
            disabled={!selectedEducationLevel}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium w-full sm:w-auto"
          >
            {t("saveAndContinue")}
          </Button>
        </div>
      </div>
    </div>
  );
}

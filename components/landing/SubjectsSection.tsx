"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SubjectCard from "./SubjectCard";
import {
  Calculator,
  TestTube,
  Atom,
  Beaker,
  BookOpen,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubjectsSection() {
  const t = useTranslations("subjects");
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    { icon: Calculator, key: "algebra" },
    { icon: TestTube, key: "biology" },
    { icon: Atom, key: "physics" },
    { icon: Beaker, key: "chemistry" },
    { icon: BookOpen, key: "literature" },
    { icon: Globe, key: "history" },
  ];

  const handleSubjectSelect = (subjectKey: string) => {
    if (selectedSubject === subjectKey) {
      // Deselect if clicking the same subject
      setSelectedSubject(null);
    } else {
      // Select the new subject
      setSelectedSubject(subjectKey);
    }
  };

  const handleStartQuiz = () => {
    if (!selectedSubject) {
      // If no subject selected, you might want to show a toast or alert
      console.log("Please select a subject");
      return;
    }

    // Navigate to choose-topic page with selected subject
    router.push(`/choose-topic?subject=${selectedSubject}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 mb-6">{t("subtitle")}</p>

          {/* Selection Status */}
          {selectedSubject && (
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <span>
                {t("selectedSubject")}: {t(`items.${selectedSubject}`)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.key}
              icon={subject.icon}
              title={t(`items.${subject.key}`)}
              delay={index * 0.1}
              isSelected={selectedSubject === subject.key}
              onClick={() => handleSubjectSelect(subject.key)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className={`px-8 py-3 cursor-pointer transition-all duration-200 ${
              selectedSubject
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleStartQuiz}
            disabled={!selectedSubject}
          >
            {selectedSubject ? t("startQuiz") : t("selectSubjectFirst")}
          </Button>

          {!selectedSubject && (
            <p className="text-sm text-gray-500 mt-2">
              {t("selectOneSubject")}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import StatCard from "./StatCard";

export default function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { value: "10,000+", labelKey: "students" },
    { value: "500+", labelKey: "quizzes" },
    { value: "95%", labelKey: "successRate" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.labelKey}
              value={stat.value}
              label={t(stat.labelKey)}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

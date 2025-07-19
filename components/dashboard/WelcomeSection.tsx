"use client";

import { useTranslations } from "next-intl";

export function WelcomeSection() {
  const t = useTranslations("dashboard");

  return (
    <section className="space-y-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        {t("welcome")}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">{t("subtitle")}</p>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function BrandSection() {
  const t = useTranslations("brand");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            QuizBoost
          </h2>
          <p className="text-xl text-gray-600">{t("tagline")}</p>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("description")}</p>
        </motion.div>
      </div>
    </section>
  );
}

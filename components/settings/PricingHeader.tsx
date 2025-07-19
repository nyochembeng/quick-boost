import { useTranslations } from "next-intl";

export function PricingHeader() {
  const t = useTranslations("pricing");

  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {t("title")}
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
        {t("subtitle")}
      </p>
    </div>
  );
}

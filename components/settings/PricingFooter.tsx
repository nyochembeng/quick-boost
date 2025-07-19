import { useTranslations } from "next-intl";
import { CreditCard, Shield, Facebook } from "lucide-react";

export function PricingFooter() {
  const t = useTranslations("pricing");

  return (
    <div className="text-center space-y-8">
      <p className="text-gray-600 max-w-md mx-auto">
        {t("footer.cancelAnytime")}
      </p>

      <div className="flex justify-center items-center gap-6 text-gray-400">
        <CreditCard className="w-8 h-8" />
        <Shield className="w-8 h-8" />
        <Facebook className="w-8 h-8" />
      </div>

      <div className="text-sm text-gray-500 space-y-2">
        <p>{t("footer.copyright")}</p>
        <div className="flex justify-center items-center gap-4 text-xs">
          <span>{t("footer.terms")}</span>
          <span>•</span>
          <span>{t("footer.privacy")}</span>
          <span>•</span>
          <span>{t("footer.support")}</span>
        </div>
      </div>
    </div>
  );
}

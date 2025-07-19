import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function SettingsFooter() {
  const t = useTranslations("settings");

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...");
  };

  return (
    <div className="text-center pt-8 border-t border-gray-200">
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="text-gray-500 hover:text-gray-700 underline"
      >
        {t("footer.logout")}
      </Button>
    </div>
  );
}

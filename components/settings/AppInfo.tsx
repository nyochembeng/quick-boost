import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function AppInfo() {
  const t = useTranslations("settings");

  const handleAboutClick = () => {
    // Handle about click logic
    console.log("About QuizBoost clicked");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {t("appInfo.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          <p>{t("appInfo.version")}</p>
        </div>

        <Button
          variant="outline"
          onClick={handleAboutClick}
          className="w-full justify-start"
        >
          <Info className="w-4 h-4 mr-2 text-blue-600" />
          {t("appInfo.about")}
        </Button>
      </CardContent>
    </Card>
  );
}

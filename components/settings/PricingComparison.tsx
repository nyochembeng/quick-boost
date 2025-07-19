import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PricingComparison() {
  const t = useTranslations("pricing");

  const comparisonData = [
    {
      feature: "dailyQuizzes",
      free: "fivePerDay",
      premium: "unlimited",
    },
    {
      feature: "performanceAnalytics",
      free: "basic",
      premium: "advanced",
    },
    {
      feature: "subjectAccess",
      free: "coreOnly",
      premium: "allSubjects",
    },
    {
      feature: "pastQuestions",
      free: "limited",
      premium: "fullAccess",
    },
    {
      feature: "adFreeExperience",
      free: "no",
      premium: "yes",
    },
    {
      feature: "offlineAccess",
      free: "no",
      premium: "yes",
    },
    {
      feature: "prioritySupport",
      free: "no",
      premium: "yes",
    },
    {
      feature: "newFeatures",
      free: "regular",
      premium: "earlyAccess",
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {t("comparison.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 text-left font-semibold text-gray-900">
                  {t("comparison.features")}
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-900">
                  {t("comparison.free")}
                </TableHead>
                <TableHead className="text-center font-semibold text-gray-900">
                  {t("comparison.premium")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="font-medium text-gray-900">
                    {t(`comparison.items.${row.feature}`)}
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {t(`comparison.values.${row.free}`)}
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {t(`comparison.values.${row.premium}`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

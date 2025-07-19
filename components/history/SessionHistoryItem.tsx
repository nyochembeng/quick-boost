import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SessionHistoryItemProps {
  date: string;
  title: string;
  score: number;
  onClick?: () => void;
}

export function SessionHistoryItem({
  date,
  title,
  score,
  onClick,
}: SessionHistoryItemProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card
      className="mb-3 shadow-sm border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">{date}</div>
            <div className="text-sm font-medium text-blue-600">{title}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
              {score}%
            </span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Lightbulb } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  description: string;
  icon: "book" | "lightbulb";
  lastScore?: number;
  isNewTopic?: boolean;
}

interface TopicCardProps {
  topic: Topic;
  isSelected?: boolean;
  onClick: () => void;
}

export function TopicCard({ topic, isSelected, onClick }: TopicCardProps) {
  const IconComponent = topic.icon === "book" ? Book : Lightbulb;

  return (
    <Card
      className={`
        p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:shadow-lg
        border-2 group
        ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-md"
            : "border-gray-200 hover:border-gray-300"
        }
        smartwatch:p-3 smartwatch:min-h-[100px]
      `}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="flex-shrink-0">
          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 group-hover:scale-110 transition-transform duration-200 smartwatch:w-6 smartwatch:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base smartwatch:text-xs">
              {topic.name}
            </h3>
            {topic.isNewTopic && (
              <Badge
                variant="secondary"
                className="bg-green-500 text-white text-xs px-2 py-1 smartwatch:text-[10px] smartwatch:px-1"
              >
                New Topic
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 smartwatch:text-[10px] smartwatch:mb-2">
            {topic.description}
          </p>
          {topic.lastScore && (
            <Badge
              variant="outline"
              className="text-blue-600 border-blue-200 bg-blue-50 text-xs smartwatch:text-[10px]"
            >
              {topic.lastScore}% Last Score
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}

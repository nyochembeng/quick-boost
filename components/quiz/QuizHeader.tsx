import { Badge } from "@/components/ui/badge";
import { QuizTimer } from "./QuizTimer";

interface QuizHeaderProps {
  subject?: string;
  difficulty?: string;
  mode: "diagnostic" | "adaptive";
  timeRemaining: number;
  questionStartTime: number;
  onTimeUp: () => void;
  onTimeUpdate: (time: number) => void;
  showDetails?: boolean;
}

export function QuizHeader({
  subject,
  difficulty,
  mode,
  timeRemaining,
  questionStartTime,
  onTimeUp,
  onTimeUpdate,
  showDetails = true,
}: QuizHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 smartwatch:mb-4">
      <div className="flex items-center space-x-2 smartwatch:space-x-1">
        {showDetails && subject && (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 smartwatch:text-xs smartwatch:px-2"
          >
            {subject}
          </Badge>
        )}
        {showDetails && difficulty && (
          <Badge
            variant="outline"
            className="text-gray-600 smartwatch:text-xs smartwatch:px-2"
          >
            {difficulty}
          </Badge>
        )}
        {mode === "adaptive" && (
          <Badge
            variant="secondary"
            className="bg-blue-600 text-white smartwatch:text-xs smartwatch:px-2"
          >
            🔵 Adaptive Mode
          </Badge>
        )}
      </div>

      <QuizTimer
        timeRemaining={timeRemaining}
        questionStartTime={questionStartTime}
        onTimeUp={onTimeUp}
        onTimeUpdate={onTimeUpdate}
      />
    </div>
  );
}

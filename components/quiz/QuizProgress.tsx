import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
}: QuizProgressProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 smartwatch:text-xs">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
      <Progress
        value={progressPercentage}
        className="h-2 smartwatch:h-1"
        style={
          {
            "--progress-background": "#10b981",
          } as React.CSSProperties
        }
      />
    </div>
  );
}

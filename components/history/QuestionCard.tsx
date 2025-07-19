import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  timeSpent: string;
}

export function QuestionCard({
  questionNumber,
  question,
  userAnswer,
  correctAnswer,
  isCorrect,
  explanation,
  timeSpent,
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <Card className="mb-4 shadow-sm border-gray-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Question {questionNumber}
            </span>
            {isCorrect ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          <span className="text-xs text-gray-400">{timeSpent}</span>
        </div>

        <h3 className="text-base font-medium text-gray-900 mb-4">{question}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Your Answer:</span>
            <Badge
              variant={isCorrect ? "default" : "destructive"}
              className={
                isCorrect
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {userAnswer}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Correct Answer:</span>
            <Badge variant="outline" className="bg-gray-100 text-gray-800">
              {correctAnswer}
            </Badge>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => setShowExplanation(!showExplanation)}
          className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent text-sm font-medium"
        >
          Explanation
          <ChevronDown
            className={`h-4 w-4 ml-1 transform transition-transform ${
              showExplanation ? "rotate-180" : ""
            }`}
          />
        </Button>

        {showExplanation && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

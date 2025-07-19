"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface QuestionTimeData {
  questionIndex: number;
  timeSpent: number;
  startTime: number;
}

interface QuizTimeAnalyticsProps {
  questionTimes: QuestionTimeData[];
  averageTimePerQuestion: number;
  totalTimeSpent: number;
  mode: "diagnostic" | "adaptive";
}

export function QuizTimeAnalytics({
  questionTimes,
  averageTimePerQuestion,
  totalTimeSpent,
  mode,
}: QuizTimeAnalyticsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimeStatus = (timeSpent: number, average: number) => {
    const threshold = average * 0.2; // 20% threshold
    if (timeSpent > average + threshold) return "slow";
    if (timeSpent < average - threshold) return "fast";
    return "average";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "slow":
        return <TrendingUp className="w-3 h-3 text-red-500" />;
      case "fast":
        return <TrendingDown className="w-3 h-3 text-green-500" />;
      default:
        return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "slow":
        return "bg-red-50 text-red-700 border-red-200";
      case "fast":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const slowestQuestion = questionTimes.reduce((prev, current) => 
    prev.timeSpent > current.timeSpent ? prev : current
  );

  const fastestQuestion = questionTimes.reduce((prev, current) => 
    prev.timeSpent < current.timeSpent ? prev : current
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Time Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {formatTime(totalTimeSpent)}
            </div>
            <div className="text-sm text-blue-600">Total Time</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {formatTime(Math.round(averageTimePerQuestion))}
            </div>
            <div className="text-sm text-green-600">Average per Question</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {questionTimes.length}
            </div>
            <div className="text-sm text-purple-600">Questions Completed</div>
          </div>
        </div>

        {/* Fastest/Slowest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <span className="font-medium text-green-700">Fastest Question</span>
            </div>
            <div className="text-sm text-gray-600">
              Question {fastestQuestion.questionIndex + 1}: {formatTime(fastestQuestion.timeSpent)}
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span className="font-medium text-red-700">Slowest Question</span>
            </div>
            <div className="text-sm text-gray-600">
              Question {slowestQuestion.questionIndex + 1}: {formatTime(slowestQuestion.timeSpent)}
            </div>
          </div>
        </div>

        {/* Question-by-Question Breakdown */}
        <div>
          <h4 className="font-medium mb-3">Question Breakdown</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {questionTimes.map((qt) => {
              const status = getTimeStatus(qt.timeSpent, averageTimePerQuestion);
              return (
                <div
                  key={qt.questionIndex}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">
                      Q{qt.questionIndex + 1}
                    </span>
                    {getStatusIcon(status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {formatTime(qt.timeSpent)}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(status)}`}
                    >
                      {status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Performance Insights</h4>
          <div className="text-sm text-gray-600 space-y-1">
            {averageTimePerQuestion > 90 && (
              <p>• Consider practicing to improve your response time</p>
            )}
            {averageTimePerQuestion < 30 && (
              <p>{`• Great speed! Make sure you're reading questions carefully`}</p>
            )}
            {questionTimes.some(qt => qt.timeSpent > averageTimePerQuestion * 2) && (
              <p>• Some questions took significantly longer - review those topics</p>
            )}
            {mode === "diagnostic" && (
              <p>• Diagnostic mode helps identify areas that need more time</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

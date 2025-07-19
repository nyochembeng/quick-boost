import { Clock, Timer } from "lucide-react";
import { useEffect, useState } from "react";

interface QuizTimerProps {
  timeRemaining: number;
  questionStartTime: number;
  onTimeUp: () => void;
  onTimeUpdate: (time: number) => void;
}

export function QuizTimer({
  timeRemaining,
  questionStartTime,
  onTimeUp,
  onTimeUpdate,
}: QuizTimerProps) {
  const [time, setTime] = useState(timeRemaining);
  const [questionTime, setQuestionTime] = useState(0);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => {
        const newTime = prev - 1;
        onTimeUpdate(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimeUp, onTimeUpdate]);

  // Track time spent on current question
  useEffect(() => {
    const questionTimer = setInterval(() => {
      const currentTime = Date.now();
      const timeSpentOnQuestion = Math.floor(
        (currentTime - questionStartTime) / 1000
      );
      setQuestionTime(timeSpentOnQuestion);
    }, 1000);

    return () => clearInterval(questionTimer);
  }, [questionStartTime]);

  // Reset question time when question changes
  useEffect(() => {
    setQuestionTime(0);
  }, [questionStartTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isLowTime = time <= 60; // Last minute warning
  const isQuestionTimeLong = questionTime >= 120; // 2 minutes warning

  return (
    <div className="flex flex-col items-end space-y-1">
      {/* Total Quiz Time */}
      <div
        className={`flex items-center space-x-2 ${
          isLowTime ? "text-red-500" : "text-gray-600"
        }`}
      >
        <Clock className="w-4 h-4 smartwatch:w-3 smartwatch:h-3" />
        <span className="font-mono text-sm smartwatch:text-xs">
          {formatTime(time)}
        </span>
      </div>

      {/* Question Time */}
      <div
        className={`flex items-center space-x-2 text-xs ${
          isQuestionTimeLong ? "text-amber-500" : "text-gray-500"
        }`}
      >
        <Timer className="w-3 h-3 smartwatch:w-2 smartwatch:h-2" />
        <span className="font-mono smartwatch:text-xs">
          {formatTime(questionTime)}
        </span>
      </div>
    </div>
  );
}

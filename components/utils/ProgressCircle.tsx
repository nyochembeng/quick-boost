interface ProgressCircleProps {
  score: number;
  total: number;
  percentage: number;
  className?: string;
}

export function ProgressCircle({
  score,
  total,
  percentage,
  className = "",
}: ProgressCircleProps) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <svg width="48" height="48" className="transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">
            {score}/{total}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-blue-600">
          {score}/{total}
        </span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
    </div>
  );
}

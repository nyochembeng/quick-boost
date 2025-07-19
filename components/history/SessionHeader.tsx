import { Clock } from "lucide-react";

interface SessionHeaderProps {
  title: string;
  subtitle: string;
  date: string;
  duration: string;
}

export function SessionHeader({
  title,
  subtitle,
  date,
  duration,
}: SessionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          {title}
        </h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        <span>{duration}</span>
      </div>
      <div className="text-sm text-gray-400 hidden sm:block">{date}</div>
    </div>
  );
}

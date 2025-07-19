import { Card } from "@/components/ui/card";
interface Subject {
  id: string;
  name: string;
  icon: string;
}

interface SubjectCardProps {
  subject: Subject;
  isSelected?: boolean;
  onClick: () => void;
}

// Icon mapping for subjects
const iconMap = {
  algebra: "🔢",
  biology: "🧬",
  physics: "⚛️",
  chemistry: "🧪",
  literature: "📚",
  history: "📜",
};

export function SubjectCard({
  subject,
  isSelected,
  onClick,
}: SubjectCardProps) {
  return (
    <Card
      className={`
        p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:shadow-lg
        border-2 text-center group
        ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-md"
            : "border-gray-200 hover:border-gray-300"
        }
        smartwatch:p-3 smartwatch:min-h-[80px]
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-2 sm:space-y-3">
        <div className="text-2xl sm:text-3xl text-blue-600 group-hover:scale-110 transition-transform duration-200 smartwatch:text-xl">
          {iconMap[subject.icon as keyof typeof iconMap] || "📖"}
        </div>
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base smartwatch:text-xs">
          {subject.name}
        </h3>
      </div>
    </Card>
  );
}

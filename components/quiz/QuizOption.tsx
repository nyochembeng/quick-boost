import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizOptionProps {
  option: string;
  value: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function QuizOption({
  option,
  value,
  isSelected,
  onSelect,
}: QuizOptionProps) {
  return (
    <div
      className={`
        flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }
        smartwatch:p-3 smartwatch:space-x-2
      `}
      onClick={onSelect}
    >
      <RadioGroupItem value={value} id={value} className="flex-shrink-0" />
      <Label
        htmlFor={value}
        className="flex-1 cursor-pointer text-sm sm:text-base smartwatch:text-xs"
      >
        {option}
      </Label>
    </div>
  );
}

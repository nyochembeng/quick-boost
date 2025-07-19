import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterButtonProps {
  label: string;
  options: FilterOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function FilterButton({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = "Select option",
}: FilterButtonProps) {
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Calendar className="h-4 w-4" />
          <span>
            {label}: {displayText}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={selectedValue === option.value ? "bg-gray-100" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

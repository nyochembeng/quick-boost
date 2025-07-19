"use client";

import { Card, CardContent } from "@/components/ui/card";

const EducationLevelCard = ({
  icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <Card
    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
      selected
        ? "border-blue-500 bg-blue-50 shadow-sm"
        : "border-gray-200 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-start space-x-3">
        <div
          className={`p-2 rounded-lg ${
            selected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
            {title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default EducationLevelCard;

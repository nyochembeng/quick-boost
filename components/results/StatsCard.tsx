"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <Card className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-gray-600">{label}</span>
          {icon}
        </div>
        <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

export default StatsCard;

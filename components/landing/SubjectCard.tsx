"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

interface SubjectCardProps {
  icon: LucideIcon;
  title: string;
  delay?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function SubjectCard({
  icon: Icon,
  title,
  delay = 0,
  isSelected = false,
  onClick,
}: SubjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card
        className={`h-full transition-all duration-300 border-2 group relative ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200"
            : "border-gray-200 hover:border-blue-200 hover:shadow-lg"
        }`}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1">
            <Check className="h-3 w-3" />
          </div>
        )}

        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div
              className={`p-3 rounded-full transition-colors ${
                isSelected
                  ? "bg-blue-100"
                  : "bg-blue-50 group-hover:bg-blue-100"
              }`}
            >
              <Icon
                className={`h-8 w-8 transition-colors ${
                  isSelected ? "text-blue-700" : "text-blue-600"
                }`}
              />
            </div>
          </div>
          <h3
            className={`text-lg font-semibold transition-colors ${
              isSelected ? "text-blue-900" : "text-gray-900"
            }`}
          >
            {title}
          </h3>

          {/* Selection State Text */}
          <div className="text-xs font-medium">
            {isSelected ? (
              <span className="text-blue-600">Selected</span>
            ) : (
              <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                Click to select
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

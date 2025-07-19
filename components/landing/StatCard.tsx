"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export default function StatCard({ value, label, delay = 0 }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Extract numeric value for animation
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isVisible && numericValue > 0) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, numericValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
        {numericValue > 0 ? `${count.toLocaleString()}${suffix}` : value}
      </div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}

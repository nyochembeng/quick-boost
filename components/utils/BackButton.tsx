"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label: string;
  onClick?: () => void;
}

export function BackButton({ label, onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent text-sm font-medium"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      {label}
    </Button>
  );
}

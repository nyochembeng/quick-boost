"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileHeader = ({
  name,
  email,
  onBack,
}: {
  name: string;
  email: string;
  onBack: () => void;
}) => {
  const t = useTranslations("profile");

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm mb-6">
      <div className="w-full flex items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold ml-2 sm:text-xl">{t("title")}</h1>
      </div>

      <div className="relative">
        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <AvatarImage src="/api/placeholder/120/120" alt={name} />
          <AvatarFallback className="text-lg font-semibold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Camera className="h-4 w-4 text-white" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          {name}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-1">{email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;

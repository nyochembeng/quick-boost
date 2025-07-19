"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Shield, Clock, HelpCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PreferenceItem from "@/components/profile/PreferenceItem";

const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  validated = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  validated?: boolean;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10"
      />
      {validated && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="h-3 w-3 text-white" />
          </div>
        </div>
      )}
    </div>
  </div>
);

export default function ProfilePage() {
  const t = useTranslations("profile");
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  const handleBack = () => {
    // Navigate back logic
    window.history.back();
  };

  const handleSaveChanges = () => {
    // Save changes logic
    console.log("Saving changes...");
  };

  const handleDeleteAccount = () => {
    // Delete account logic
    console.log("Delete account...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <ProfileHeader name={fullName} email={email} onBack={handleBack} />

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 text-lg">
              {t("accountSettings")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              label={t("fullName")}
              value={fullName}
              onChange={setFullName}
              validated={true}
            />
            <FormField
              label={t("emailAddress")}
              value={email}
              onChange={setEmail}
              type="email"
              validated={true}
            />
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
            >
              <Shield className="h-4 w-4 mr-2" />
              {t("changePassword")}
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 text-lg">
              {t("preferences")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PreferenceItem
              icon={<Users className="h-5 w-5" />}
              label={t("educationLevel")}
              value="Bachelor's Degree"
              action={() => console.log("Edit education level")}
            />
            <PreferenceItem
              icon={<HelpCircle className="h-5 w-5" />}
              label={t("structuralQuestions")}
              value="Enabled"
              type="switch"
            />
            <PreferenceItem
              icon={<HelpCircle className="h-5 w-5" />}
              label={t("quizLength")}
              value="20 Questions"
              action={() => console.log("Edit quiz length")}
            />
            <PreferenceItem
              icon={<Clock className="h-5 w-5" />}
              label={t("timeLimit")}
              value="30 Minutes"
              action={() => console.log("Edit time limit")}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 pt-4">
          <Button
            onClick={handleSaveChanges}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            {t("saveChanges")}
          </Button>
          <Button
            variant="ghost"
            onClick={handleDeleteAccount}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 py-3 rounded-lg font-medium"
          >
            ⚠️ {t("deleteAccount")}
          </Button>
        </div>
      </div>
    </div>
  );
}

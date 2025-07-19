"use client";

import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { GradingOptions } from "@/components/settings/GradingOptions";
import { StoragePrivacy } from "@/components/settings/StoragePrivacy";
import { AppInfo } from "@/components/settings/AppInfo";
import { SettingsFooter } from "@/components/settings/SettingsFooter";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <SettingsHeader />
        <div className="px-4 sm:px-6 lg:px-8 pb-8 space-y-8">
          <GradingOptions />
          <StoragePrivacy />
          <AppInfo />
          <SettingsFooter />
        </div>
      </div>
    </div>
  );
}

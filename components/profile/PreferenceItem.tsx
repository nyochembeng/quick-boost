"use client";

import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const PreferenceItem = ({
  icon,
  label,
  value,
  type = "text",
  action,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  type?: "text" | "switch";
  action?: () => void;
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center space-x-3">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
    {type === "switch" ? (
      <Switch defaultChecked={value === "Enabled"} />
    ) : (
      <Button
        variant="ghost"
        size="sm"
        onClick={action}
        className="text-blue-600 hover:text-blue-700"
      >
        <Edit3 className="h-4 w-4 mr-1" />
        Edit
      </Button>
    )}
  </div>
);

export default PreferenceItem;

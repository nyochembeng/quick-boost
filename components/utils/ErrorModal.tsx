"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorModalProps {
  isOpen: boolean;
  onRetry: () => void;
  onContinueOffline: () => void;
  onClose: () => void;
}

export function ErrorModal({
  isOpen,
  onRetry,
  onContinueOffline,
  onClose,
}: ErrorModalProps) {
  const t = useTranslations("error");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <DialogTitle className="text-red-600 text-xl">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            {t("message")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={onRetry}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {t("retry")}
          </Button>
          <Button
            onClick={onContinueOffline}
            variant="outline"
            className="flex-1"
          >
            {t("continueOffline")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

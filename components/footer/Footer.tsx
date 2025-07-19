"use client";

import { useTranslations } from "next-intl";
import { Twitter, Facebook, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-500">{t("copyright")}</div>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t("links.terms")}
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t("links.privacy")}
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t("links.help")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

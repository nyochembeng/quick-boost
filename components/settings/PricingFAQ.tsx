"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function PricingFAQ() {
  const t = useTranslations("pricing");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqItems = [
    {
      id: "freeTrial",
      question: t("faq.freeTrial.question"),
      answer: t("faq.freeTrial.answer"),
    },
    {
      id: "switchPlans",
      question: t("faq.switchPlans.question"),
      answer: t("faq.switchPlans.answer"),
    },
    {
      id: "paymentMethods",
      question: t("faq.paymentMethods.question"),
      answer: t("faq.paymentMethods.answer"),
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {t("faq.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqItems.map((item) => (
          <Collapsible
            key={item.id}
            open={openItems.includes(item.id)}
            onOpenChange={() => toggleItem(item.id)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-left text-gray-900">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openItems.includes(item.id) ? "rotate-180" : ""
                  }`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 pt-2 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}

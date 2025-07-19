"use client";

import { PricingHeader } from "@/components/settings/PricingHeader";
import { PricingCards } from "@/components/settings/PricingCards";
import { PricingComparison } from "@/components/settings/PricingComparison";
import { PricingFAQ } from "@/components/settings/PricingFAQ";
import { PricingFooter } from "@/components/settings/PricingFooter";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <PricingHeader />
        <PricingCards />
        <PricingComparison />
        <PricingFAQ />
        <PricingFooter />
      </div>
    </div>
  );
}

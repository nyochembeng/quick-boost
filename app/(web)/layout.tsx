"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useState } from "react";
import { ErrorModal } from "@/components/utils/ErrorModal";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleRetry = () => {
    // Implement retry logic
    setIsErrorModalOpen(false);
  };

  const handleContinueOffline = () => {
    // Implement offline mode logic
    setIsErrorModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {children}
      <Footer />

      {/* Error Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onRetry={handleRetry}
        onContinueOffline={handleContinueOffline}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
}

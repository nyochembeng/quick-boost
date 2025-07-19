import HeroSection from "@/components/landing/HeroSection";
import BrandSection from "@/components/landing/BrandSection";
import SubjectsSection from "@/components/landing/SubjectsSection";
import StatsSection from "@/components/landing/StatsSection";

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        <HeroSection />
        <BrandSection />
        <SubjectsSection />
        <StatsSection />
      </main>
    </div>
  );
}

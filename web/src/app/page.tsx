import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyNovaLabs from "@/components/WhyNovaLabs";
import PricingPlans from "@/components/PricingPlans";
import TeamAndTools from "@/components/TeamAndTools";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import PromotionCountdown from "@/components/PromotionCountdown";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <WhyNovaLabs />
      <PricingPlans />
      <TeamAndTools />
      <Portfolio />
      <Testimonials />
      <PromotionCountdown />
      <ContactSection />
      <Footer />
    </div>
  );
}

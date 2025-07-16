"use client";

import { useState } from 'react';
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
import GalaxyFormation from "@/components/GalaxyFormation";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [loaderComplete, setLoaderComplete] = useState(false);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setLoaderComplete(true);
  };

  return (
    <div className="min-h-screen bg-black">
      {showLoader && (
        <GalaxyFormation 
          onComplete={handleLoaderComplete}
          duration={3600}
        />
      )}
      {!showLoader && <Navigation />}
      <Hero loaderComplete={loaderComplete} />
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

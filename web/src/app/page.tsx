"use client";

import { useState, useEffect } from 'react';
import Hero from "@/components/Hero";
import WhyNovaLabs from "@/components/WhyNovaLabs";
import PricingPlans from "@/components/PricingPlans";
import TeamAndTools from "@/components/TeamAndTools";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import PromotionCountdown from "@/components/PromotionCountdown";
import FAQs from "@/components/FAQs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GalaxyFormation from "@/components/GalaxyFormation";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Verificar si ya visitó la página en esta sesión
    const hasVisited = sessionStorage.getItem('novalabss-visited');
    
    if (hasVisited) {
      // No es primera visita, omitir loader
      setIsFirstVisit(false);
      setShowLoader(false);
      setLoaderComplete(true);
    } else {
      // Es primera visita, marcar como visitado
      sessionStorage.setItem('novalabss-visited', 'true');
      setIsFirstVisit(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setLoaderComplete(true);
  };

  const handleShowOfferModal = () => {
    setShowOfferModal(true);
  };

  return (
    <div className="min-h-screen bg-black">
      {showLoader && isFirstVisit && (
        <GalaxyFormation 
          onComplete={handleLoaderComplete}
          duration={3600}
        />
      )}
      {(!showLoader || !isFirstVisit) && (
        <>
          <Hero 
            loaderComplete={loaderComplete} 
            showOfferModal={showOfferModal}
            setShowOfferModal={setShowOfferModal}
          />
          <WhyNovaLabs />
          <PricingPlans />
          <TeamAndTools />
          <Portfolio />
          <Testimonials />
          <PromotionCountdown onClaimDiscount={handleShowOfferModal} />
          <FAQs />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
}

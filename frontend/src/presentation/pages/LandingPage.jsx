import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from './sections/HeroSection';
import ComoFuncionaSection from './sections/ComoFuncionaSection';
import BeneficiosSection from './sections/BeneficiosSection';
import CTASection from './sections/CTASection';

const LandingPage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ComoFuncionaSection />
      <BeneficiosSection />
      <CTASection />
    </MainLayout>
  );
};

export default LandingPage;

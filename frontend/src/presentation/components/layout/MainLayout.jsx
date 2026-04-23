import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * MainLayout
 * Envuelve cualquier página pública con Navbar + Footer.
 * Uso:
 *   <MainLayout>
 *     <HeroSection />
 *     <OtraSection />
 *   </MainLayout>
 */
const MainLayout = ({ children, mode = 'public' }) => {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar mode={mode} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;

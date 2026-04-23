import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Únete', href: '#cta' },
];

const CLIENT_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Solicitudes', href: '/solicitudes' },
  { label: 'Canje', href: '/canje' },
];

const scrollTo = (href) => {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
};

const Navbar = ({ mode = 'public', puntosCliente = 1250 }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(href);
  };

  return (
    <motion.nav
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#bbf7d0]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)' }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                <path d="M12 2C8.5 2 6 5.5 6 9c0 4.4 4.5 10.1 5.5 11.3.3.3.7.5 1 .5s.7-.2 1-.5C14.5 19.1 18 13.4 18 9c0-3.5-2.5-7-6-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: '#14532d' }}>
              Greenside<span style={{ color: '#16a34a' }}>.</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {(mode === 'cliente' ? CLIENT_LINKS : NAV_LINKS).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (mode === 'cliente') {
                    e.preventDefault();
                    navigate(link.href);
                  } else {
                    handleNavClick(e, link.href);
                  }
                }}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#16a34a]"
                style={{ color: '#1e293b' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            {mode === 'cliente' ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 shadow-sm" title="Tus puntos disponibles">
                  <span role="img" aria-label="puntos" className="text-lg">🔥</span>
                  <span className="font-bold text-amber-700">{puntosCliente.toLocaleString()} pts</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border-2 border-[#16a34a] overflow-hidden" title="Mi Perfil">
                  <span className="text-gray-600 font-bold">C</span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-100 select-none"
                style={{ background: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)' }}
              >
                Comenzar gratis
              </div>
            )}
          </div>

          {/* Hamburger mobile */}
          <div
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: '#14532d' }}
            />
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: '#14532d' }}
            />
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: '#14532d' }}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-[#bbf7d0] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {(mode === 'cliente' ? CLIENT_LINKS : NAV_LINKS).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (mode === 'cliente') {
                      e.preventDefault();
                      setMenuOpen(false);
                      navigate(link.href);
                    } else {
                      handleNavClick(e, link.href);
                    }
                  }}
                  className="text-base font-medium py-1"
                  style={{ color: '#1e293b' }}
                >
                  {link.label}
                </a>
              ))}
              {mode === 'cliente' ? (
                <div className="flex items-center justify-between py-2 border-t border-gray-100 mt-2">
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                    <span role="img" aria-label="puntos" className="text-lg">🔥</span>
                    <span className="font-bold text-amber-700">{puntosCliente.toLocaleString()} pts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    Mi Perfil
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => { setMenuOpen(false); navigate('/login'); }}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer text-white text-center select-none"
                  style={{ background: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)' }}
                >
                  Comenzar gratis
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

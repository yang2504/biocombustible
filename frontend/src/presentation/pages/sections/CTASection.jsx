import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

const TRUST_SIGNALS = ['✅ Registro en 2 minutos', '✅ Sin compromisos', '✅ 100% boliviana'];

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="cta" className="py-24 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)' }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: '#bbf7d0' }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 pointer-events-none"
            style={{ background: '#86efac' }}
          />

          <div className="relative z-10 px-8 py-14 md:px-16 md:py-16 text-center">
            <div className="text-5xl mb-6">♻️</div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
              style={{ lineHeight: '1.15' }}
            >
              Empieza hoy. Tu aceite
              <br className="hidden sm:block" /> tiene valor real.
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: '#bbf7d0' }}>
              Únete a más de 1,200 bolivianos que ya están ganando puntos y
              contribuyendo a un Bolivia más limpio con Greenside Solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div
                id="cta-section-registrarse"
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-100 select-none"
                style={{ background: '#ffffff', color: '#16a34a', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              >
                Crear mi cuenta gratis
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              <a
                href="#como-funciona"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base font-bold border-2 border-white/60 text-white transition-all duration-200 hover:bg-white/10 select-none"
              >
                Saber más
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {TRUST_SIGNALS.map((t) => (
                <span key={t} className="text-sm font-medium" style={{ color: '#bbf7d0' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

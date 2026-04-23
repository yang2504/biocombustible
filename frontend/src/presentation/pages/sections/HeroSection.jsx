import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

const STATS = [
  { value: '50K+', label: 'Litros reciclados' },
  { value: '1,200+', label: 'Familias registradas' },
  { value: '98%', label: 'Satisfacción' },
];

const TIMELINE_STEPS = [
  { label: 'Solicitud aceptada', done: true },
  { label: 'Vehículo en ruta', done: true, active: true },
  { label: 'Recolección completada', done: false },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 40%, #ffffff 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: '#16a34a' }}
      />
      <div
        className="absolute bottom-0 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#bbf7d0' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <div>
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
              style={{ background: '#bbf7d0', color: '#14532d' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#16a34a' }} />
              🌱 Bolivia hacia un futuro más limpio
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              style={{ color: '#14532d' }}
            >
              Tu aceite usado
              <span
                className="block"
                style={{
                  background: 'linear-gradient(90deg, #16a34a, #14532d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                vale más de lo que crees
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl mb-10 leading-relaxed"
              style={{ color: '#64748b' }}
            >
              Recolectamos aceite vegetal y automotriz de tu hogar o empresa, lo convertimos en
              biocombustible limpio y{' '}
              <strong style={{ color: '#16a34a' }}>te premiamos con puntos canjeables</strong>{' '}
              por productos, servicios y dinero.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <div
                id="cta-hero-registrarse"
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold cursor-pointer text-white transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-100 select-none"
                style={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)',
                  boxShadow: '0 8px 32px rgba(22,163,74,0.35)',
                }}
              >
                Registrarme gratis
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold border-2 transition-all duration-200 hover:bg-[#f0fdf4] select-none"
                style={{ borderColor: '#16a34a', color: '#16a34a' }}
              >
                Ver cómo funciona
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-8 mt-14 pt-10 border-t"
              style={{ borderColor: '#bbf7d0' }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-extrabold" style={{ color: '#16a34a' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: '#64748b' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Card demo */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center items-center"
          >
            <div
              className="relative w-full max-w-sm mx-auto rounded-3xl p-8 shadow-2xl"
              style={{ background: 'linear-gradient(145deg, #14532d 0%, #052e16 100%)' }}
            >
              <div className="flex justify-center mb-6">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(187,247,208,0.15)' }}
                >
                  <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                    <circle cx="32" cy="32" r="28" fill="rgba(187,247,208,0.15)" />
                    <path d="M32 14C24.268 14 18 20.268 18 28c0 9.941 11.2 19.832 12.8 21.2.667.582 1.733.582 2.4 0C34.8 47.832 46 37.941 46 28c0-7.732-6.268-14-14-14zm0 19c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" fill="#bbf7d0" />
                    <path d="M20 44l4-4M44 44l-4-4" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
                    <ellipse cx="32" cy="50" rx="10" ry="3" fill="rgba(187,247,208,0.2)" />
                  </svg>
                </div>
              </div>

              <h3 className="text-white text-center text-xl font-bold mb-2">Tu recolección en camino</h3>
              <p className="text-center text-sm mb-6" style={{ color: '#86efac' }}>
                REC-2025-0018 · En camino 🚛
              </p>

              <div className="space-y-3">
                {TIMELINE_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
                        step.active
                          ? 'border-[#16a34a] bg-[#16a34a] animate-pulse'
                          : step.done
                          ? 'border-[#86efac] bg-[#86efac]'
                          : 'border-white/30 bg-transparent'
                      }`}
                    />
                    <span className={`text-sm ${step.active ? 'text-white font-semibold' : step.done ? 'text-[#86efac]' : 'text-white/40'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 rounded-2xl p-4 flex items-center justify-between"
                style={{ background: 'rgba(187,247,208,0.12)' }}
              >
                <div>
                  <div className="text-xs mb-1" style={{ color: '#86efac' }}>Puntos por ganar</div>
                  <div className="text-2xl font-extrabold text-white">🔥 +150 pts</div>
                </div>
                <div className="text-right">
                  <div className="text-xs mb-1" style={{ color: '#86efac' }}>15 litros × 10 pts</div>
                  <div className="text-sm" style={{ color: '#86efac' }}>≈ Bs. 15 en canjes</div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -left-4 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full shadow-xl text-sm font-bold"
              style={{ background: '#16a34a', color: '#fff' }}
            >
              ♻️ Eco-friendly
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -right-4 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full shadow-xl text-sm font-bold"
              style={{ background: '#bbf7d0', color: '#14532d' }}
            >
              🏆 Gana puntos
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 lg:h-16">
          <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

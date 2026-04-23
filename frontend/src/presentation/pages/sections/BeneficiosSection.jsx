import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

const BENEFICIOS = [
  {
    emoji: '🏠',
    title: 'Para tu hogar',
    desc: 'Cualquier persona puede registrarse. Solo necesitas aceite usado y una dirección en Bolivia.',
    highlights: ['Sin costo de registro', 'Recolección a domicilio', 'App móvil incluida'],
  },
  {
    emoji: '🏢',
    title: 'Para empresas',
    desc: 'Solución corporativa para restaurantes, industrias y negocios con grandes volúmenes de aceite.',
    highlights: ['Recolecciones programadas', 'Reportes de impacto ambiental', 'Facturación disponible'],
  },
  {
    emoji: '💰',
    title: 'Canjea tus puntos',
    desc: 'Tus puntos tienen valor real. Elige entre productos físicos, transferencias o servicios exclusivos.',
    highlights: ['10 pts por litro', 'Canje en efectivo', 'Catálogo de souvenirs'],
  },
  {
    emoji: '🌍',
    title: 'Impacto ambiental',
    desc: 'Cada litro recolectado evita la contaminación de miles de litros de agua y reduce las emisiones de carbono.',
    highlights: ['Biocombustible B100', 'Carbono neutral', 'Economía circular'],
  },
  {
    emoji: '📍',
    title: 'Seguimiento en tiempo real',
    desc: 'Sigue el vehículo de recolección en el mapa desde tu celular. Nunca pierdas de vista tu solicitud.',
    highlights: ['GPS en vivo', 'ETA actualizado', 'Notificaciones push'],
  },
  {
    emoji: '🔒',
    title: 'Seguro y transparente',
    desc: 'Cada recolección genera un código único trazable. Verifica cuántos litros entregaste y cuántos puntos ganaste.',
    highlights: ['Código de trazabilidad', 'Historial completo', 'Sin letra pequeña'],
  },
];

const MOVIMIENTOS_DEMO = [
  { label: 'REC-2025-0018 · 15 litros', pts: '+150 pts', fecha: 'Hace 2 días' },
  { label: 'REC-2025-0012 · 30 litros', pts: '+300 pts', fecha: 'Hace 1 semana' },
  { label: 'REC-2025-0005 · 80 litros', pts: '+800 pts', fecha: 'Hace 3 semanas' },
];

const CANJES_DEMO = ['Souvenir — 200 pts', 'Vale Bs. 20 — 500 pts', 'Servicio premium — 800 pts'];

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const BeneficiosSection = () => {
  return (
    <section
      id="beneficios"
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{ background: '#bbf7d0', color: '#14532d' }}
          >
            ¿Por qué Greenside?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: '#1e293b' }}>
            Beneficios que sí importan
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            Diseñado para hogares y empresas bolivianas que quieren hacer la diferencia sin complicaciones.
          </p>
        </motion.div>

        {/* Grid de beneficios */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFICIOS.map((b, idx) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              custom={idx * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{ border: '1px solid #e2e8f0' }}
            >
              <div className="text-4xl mb-5">{b.emoji}</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1e293b' }}>{b.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>{b.desc}</p>
              <ul className="space-y-2">
                {b.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#16a34a' }}>
                    <CheckIcon />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Tarjeta de puntos demo */}
        <motion.div
          variants={fadeUp}
          custom={0.6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)' }}
        >
          <div className="px-8 py-10 md:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-4xl font-extrabold text-white mb-3">🔥 1,250 pts disponibles</div>
              <p className="text-lg mb-6" style={{ color: '#86efac' }}>
                Así luce el saldo de puntos de un cliente activo de Greenside Solutions.
                Tú también puedes acumular así.
              </p>
              <div className="flex flex-wrap gap-3">
                {CANJES_DEMO.map((canje) => (
                  <div
                    key={canje}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(187,247,208,0.15)', color: '#bbf7d0' }}
                  >
                    {canje}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {MOVIMIENTOS_DEMO.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-5 py-3 rounded-xl"
                  style={{ background: 'rgba(187,247,208,0.1)' }}
                >
                  <div>
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs" style={{ color: '#86efac' }}>{item.fecha}</div>
                  </div>
                  <div className="text-base font-bold" style={{ color: '#bbf7d0' }}>{item.pts}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeneficiosSection;

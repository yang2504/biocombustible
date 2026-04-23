import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

const STEPS = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
      </svg>
    ),
    title: 'Regístrate y solicita',
    description: 'Crea tu cuenta en minutos. Ingresa el tipo de aceite, la cantidad estimada y tu disponibilidad horaria. Nosotros coordinamos todo.',
    color: '#16a34a',
    bg: '#f0fdf4',
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor" />
      </svg>
    ),
    title: 'Recolectamos en tu puerta',
    description: 'Nuestro vehículo va hasta donde estás. Sigue en tiempo real la llegada del conductor con GPS desde la app.',
    color: '#0ea5e9',
    bg: '#f0f9ff',
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M19.48 12.35c-1.57-4.08-7.16-4.3-5.81-10.23.1-.44-.37-.78-.75-.55C9.29 3.71 6.68 8 8.87 13.62c.18.46-.36.89-.75.59-1.81-1.37-2-3.34-1.84-4.75.06-.52-.62-.77-.91-.34C4.69 10.16 4 11.84 4 14.37c.38 5.6 5.11 7.32 6.81 7.54 2.43.31 5.06-.14 6.95-1.87 2.08-1.93 2.84-5.01 1.72-7.69zm-9.28 5.03c1.44-.35 2.18-1.39 2.38-2.31.33-1.43-.45-2.83-.56-4.29-.08-1.02.22-2.17.84-3.07.28 3.55 3.18 5.42 3.18 7.29.01 2.4-1.96 4.38-5.84 2.38z" fill="currentColor" />
      </svg>
    ),
    title: 'Convertimos en biocombustible',
    description: 'Tu aceite se transforma en biocombustible B100 de alta calidad. Cada litro entregado contribuye a reducir la huella de carbono de Bolivia.',
    color: '#f97316',
    bg: '#fff7ed',
  },
  {
    number: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" fill="currentColor" />
      </svg>
    ),
    title: 'Gana y canjea puntos',
    description: '10 puntos por cada litro entregado. Canjéalos por souvenirs, transferencias en efectivo o servicios exclusivos de la empresa.',
    color: '#16a34a',
    bg: '#f0fdf4',
  },
];

const OIL_TYPES = [
  { label: 'Aceite vegetal de cocina', emoji: '🍳' },
  { label: 'Aceite de freidora', emoji: '🍟' },
  { label: 'Aceite automotriz', emoji: '🚗' },
  { label: 'Aceite industrial', emoji: '⚙️' },
  { label: 'Aceite mixto', emoji: '🔃' },
];

const ComoFuncionaSection = () => {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-white">
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
            Proceso simple
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: '#1e293b' }}>
            Así funciona Greenside
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            En 4 pasos conviertes tu aceite usado en beneficios reales para tu bolsillo y el planeta.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              custom={idx * 0.15}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative rounded-2xl p-6 group hover:-translate-y-1 transition-transform duration-300"
              style={{ background: step.bg }}
            >
              {idx < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 right-0 w-6 h-0.5 translate-x-full"
                  style={{ background: `${step.color}40` }}
                />
              )}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${step.color}18`, color: step.color }}
              >
                {step.icon}
              </div>
              <div
                className="text-5xl font-extrabold opacity-10 absolute top-4 right-6 pointer-events-none select-none"
                style={{ color: step.color }}
              >
                {step.number}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: '#1e293b' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tipos de aceite */}
        <motion.div
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 rounded-2xl p-8 md:p-10"
          style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #bbf7d0' }}
        >
          <h3 className="text-xl font-bold mb-6 text-center" style={{ color: '#14532d' }}>
            Tipos de aceite que recolectamos
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {OIL_TYPES.map((type) => (
              <div
                key={type.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{ background: 'white', color: '#14532d', border: '1px solid #bbf7d0' }}
              >
                <span>{type.emoji}</span>
                {type.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComoFuncionaSection;

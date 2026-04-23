import React from 'react';
import { motion } from 'framer-motion';

const SaldoPuntosCard = ({ puntos }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div>
        <h2 className="text-gray-500 font-medium text-sm uppercase tracking-wider mb-2">Saldo Actual</h2>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-black text-[#1e293b]">{puntos.toLocaleString()}</span>
          <span className="text-xl font-bold text-[#f59e0b] mb-1">pts</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Equivale a aproximadamente <strong>Bs. {(puntos / 100).toFixed(2)}</strong> en beneficios.
        </p>
      </div>
      <div className="w-full md:w-auto flex flex-col gap-3">
        <button className="w-full md:w-auto px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#16a34a] to-[#14532d] hover:opacity-90 transition-opacity shadow-md">
          Cómo ganar más puntos
        </button>
      </div>
    </motion.div>
  );
};

export default SaldoPuntosCard;

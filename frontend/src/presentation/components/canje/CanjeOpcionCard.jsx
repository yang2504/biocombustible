import React from 'react';
import { motion } from 'framer-motion';

const TIPO_BADGES = {
  souvenir: 'bg-purple-100 text-purple-800',
  dinero: 'bg-green-100 text-green-800',
  servicio: 'bg-blue-100 text-blue-800'
};

const CanjeOpcionCard = ({ opcion, puntosCliente, onCanjear }) => {
  const suficienteSaldo = puntosCliente >= opcion.costo_puntos;

  return (
    <motion.div 
      whileHover={suficienteSaldo ? { y: -5 } : {}}
      className={`relative bg-white rounded-2xl overflow-hidden border ${suficienteSaldo ? 'border-gray-200 shadow-sm' : 'border-gray-100'}`}
    >
      {/* Imagen */}
      <div className="h-48 bg-gray-100 relative">
        <img src={opcion.imagen_url} alt={opcion.nombre} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${TIPO_BADGES[opcion.tipo]}`}>
            {opcion.tipo}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col h-[180px]">
        <h3 className="font-bold text-lg text-[#1e293b] mb-1">{opcion.nombre}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{opcion.descripcion}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-[#f59e0b] text-lg">{opcion.costo_puntos.toLocaleString()}</span>
          </div>
          
          {suficienteSaldo ? (
            <button 
              onClick={() => onCanjear(opcion)}
              className="px-4 py-2 rounded-full bg-[#16a34a] text-white text-sm font-semibold hover:bg-[#15803d] transition-colors"
            >
              Canjear
            </button>
          ) : (
            <div className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-2 rounded-full">
              Faltan {(opcion.costo_puntos - puntosCliente).toLocaleString()} pts
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay si no hay saldo */}
      {!suficienteSaldo && (
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      )}
    </motion.div>
  );
};

export default CanjeOpcionCard;

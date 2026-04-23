import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmCanjeModal = ({ isOpen, onClose, opcion, puntosCliente, onConfirm }) => {
  if (!isOpen || !opcion) return null;

  const saldoRestante = puntosCliente - opcion.costo_puntos;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        >
          <div className="h-32 bg-gray-100 relative">
            <img src={opcion.imagen_url} alt={opcion.nombre} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-5 right-5 text-white font-bold text-xl leading-tight">
              Confirmar Canje
            </h3>
          </div>

          <div className="p-5">
            <p className="text-gray-600 mb-6 text-sm">
              Estás a punto de canjear tus puntos por <strong>{opcion.nombre}</strong>. Por favor revisa el resumen antes de confirmar.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-6 border border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Saldo actual</span>
                <span className="font-bold text-[#1e293b]">{puntosCliente.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Costo del beneficio</span>
                <span className="font-bold text-red-500">-{opcion.costo_puntos.toLocaleString()} pts</span>
              </div>
              <div className="h-px bg-gray-200 my-1" />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#1e293b]">Saldo restante</span>
                <span className="font-bold text-[#16a34a]">{saldoRestante.toLocaleString()} pts</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-full text-gray-600 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  onConfirm(opcion);
                  onClose();
                }}
                className="flex-1 px-4 py-2.5 rounded-full bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors"
              >
                Confirmar Canje
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmCanjeModal;

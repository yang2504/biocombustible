import React from 'react';

const HistorialPuntosItem = ({ movimiento }) => {
  const isGanancia = movimiento.tipo === 'ganancia';
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isGanancia ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          {isGanancia ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-medium text-[#1e293b]">{movimiento.descripcion}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{new Date(movimiento.fecha).toLocaleDateString()}</span>
            {movimiento.recoleccion_codigo && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-medium text-[#16a34a] bg-green-50 px-2 py-0.5 rounded">{movimiento.recoleccion_codigo}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`font-bold ${isGanancia ? 'text-[#16a34a]' : 'text-gray-600'}`}>
        {isGanancia ? '+' : '-'}{movimiento.puntos} pts
      </div>
    </div>
  );
};

export default HistorialPuntosItem;

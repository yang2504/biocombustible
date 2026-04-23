import React from 'react';

const ESTADO_BADGES = {
  solicitado: 'bg-yellow-100 text-yellow-800',
  procesando: 'bg-blue-100 text-blue-800',
  completado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800'
};

const HistorialCanjeItem = ({ canje }) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl mb-3 hover:shadow-sm transition-shadow bg-white">
      <div className="flex items-center gap-4">
        <img src={canje.opcion.imagen_url} alt={canje.opcion.nombre} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-[#1e293b]">{canje.opcion.nombre}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ESTADO_BADGES[canje.estado]}`}>
              {canje.estado}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{canje.codigo}</span>
            <span>•</span>
            <span>{new Date(canje.fecha_solicitud).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-gray-700">-{canje.puntos_usados} pts</div>
      </div>
    </div>
  );
};

export default HistorialCanjeItem;

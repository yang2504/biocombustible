import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import SaldoPuntosCard from '../../components/canje/SaldoPuntosCard';
import CanjeOpcionCard from '../../components/canje/CanjeOpcionCard';
import HistorialPuntosItem from '../../components/canje/HistorialPuntosItem';
import HistorialCanjeItem from '../../components/canje/HistorialCanjeItem';
import ConfirmCanjeModal from '../../components/canje/ConfirmCanjeModal';

// --- MOCK DATA ---
const MOCK_PUNTOS_CLIENTE = 1250;

const MOCK_CATALOGO = [
  {
    id: '1',
    nombre: 'Botella Reutilizable Greenside',
    descripcion: 'Botella de acero inoxidable de 750ml, mantiene bebidas frías por 24h y calientes por 12h. Ideal para llevar al trabajo.',
    tipo: 'souvenir',
    costo_puntos: 500,
    imagen_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    nombre: 'Abono de 50 Bs. a cuenta',
    descripcion: 'Transferencia directa a tu cuenta bancaria o billetera móvil Tigo Money / BNB.',
    tipo: 'dinero',
    costo_puntos: 1000,
    imagen_url: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    nombre: 'Vale de Descuento Supermercado',
    descripcion: 'Vale de descuento del 15% en compras superiores a 200 Bs en supermercados Hipermaxi.',
    tipo: 'servicio',
    costo_puntos: 300,
    imagen_url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    nombre: 'Mantenimiento de Cocina',
    descripcion: 'Servicio de limpieza profunda de campana extractora y cocina a gas por técnicos de Greenside.',
    tipo: 'servicio',
    costo_puntos: 2500,
    imagen_url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=400',
  }
];

const MOCK_HISTORIAL_PUNTOS = [
  { id: '1', tipo: 'ganancia', puntos: 450, descripcion: 'Recolección de aceite vegetal', fecha: '2025-04-10T14:30:00', recoleccion_codigo: 'REC-2025-0018' },
  { id: '2', tipo: 'ganancia', puntos: 800, descripcion: 'Bono por primer mes', fecha: '2025-03-15T09:00:00' },
  { id: '3', tipo: 'ganancia', puntos: 500, descripcion: 'Recolección de aceite vegetal', fecha: '2025-02-28T16:15:00', recoleccion_codigo: 'REC-2025-0005' },
];

const MOCK_HISTORIAL_CANJES = [
  { 
    id: '1', 
    codigo: 'CANJE-2025-0007', 
    puntos_usados: 500, 
    estado: 'completado', 
    fecha_solicitud: '2025-03-20T10:00:00',
    opcion: MOCK_CATALOGO[0] 
  }
];
// -----------------

const CanjeView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const handleCanjear = (opcion) => {
    setOpcionSeleccionada(opcion);
    setModalOpen(true);
  };

  const handleConfirmar = (opcion) => {
    // Aquí iría la llamada a la API
    alert(`Canje confirmado: ${opcion.nombre}. Puntos descontados: ${opcion.costo_puntos}.`);
  };

  return (
    <MainLayout mode="cliente">
      <div className="bg-[#f8fafc] min-h-screen pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-2">Canje de Puntos</h1>
            <p className="text-gray-500">Convierte tus litros de aceite reciclado en increíbles beneficios.</p>
          </div>

          <div className="mb-10">
            <SaldoPuntosCard puntos={MOCK_PUNTOS_CLIENTE} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna Izquierda: Catálogo (ocupa 2 columnas en lg) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#1e293b]">Catálogo de Beneficios</h2>
                <span className="text-sm text-gray-500">{MOCK_CATALOGO.length} opciones</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_CATALOGO.map((opcion) => (
                  <CanjeOpcionCard 
                    key={opcion.id} 
                    opcion={opcion} 
                    puntosCliente={MOCK_PUNTOS_CLIENTE} 
                    onCanjear={handleCanjear}
                  />
                ))}
              </div>
            </div>

            {/* Columna Derecha: Historial */}
            <div className="space-y-8">
              
              {/* Historial de Puntos Ganados */}
              <div>
                <h2 className="text-xl font-bold text-[#1e293b] mb-4">Últimos Movimientos</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {MOCK_HISTORIAL_PUNTOS.map((mov) => (
                    <HistorialPuntosItem key={mov.id} movimiento={mov} />
                  ))}
                  <div className="p-3 border-t border-gray-100 text-center">
                    <button className="text-sm font-semibold text-[#16a34a] hover:underline">
                      Ver todos los movimientos
                    </button>
                  </div>
                </div>
              </div>

              {/* Historial de Canjes */}
              <div>
                <h2 className="text-xl font-bold text-[#1e293b] mb-4">Mis Canjes</h2>
                <div>
                  {MOCK_HISTORIAL_CANJES.map((canje) => (
                    <HistorialCanjeItem key={canje.id} canje={canje} />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <ConfirmCanjeModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        opcion={opcionSeleccionada}
        puntosCliente={MOCK_PUNTOS_CLIENTE}
        onConfirm={handleConfirmar}
      />
    </MainLayout>
  );
};

export default CanjeView;

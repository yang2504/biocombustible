import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../presentation/store/AuthContext';
import LoginPage from '../presentation/pages/LoginPage';
import LandingPage from '../presentation/pages/LandingPage';
import CanjeView from '../presentation/pages/cliente/CanjeView';

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Placeholder para el Dashboard (Lo llenaremos con Three.js en el siguiente paso)
const DashboardPlaceholder = () => {
  const { logout } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard OilTrace</h1>
      <p className="text-slate-400 mb-6">Backend conectado con éxito.</p>
      <button onClick={logout} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
        Cerrar Sesión
      </button>
    </div>
  );
};

// Placeholder para /registro
const RegistroPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0fdf4' }}>
    <div className="text-center">
      <div className="text-5xl mb-4">🌱</div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#14532d' }}>Registro — Próximamente</h1>
      <p className="text-sm mb-6" style={{ color: '#64748b' }}>Esta pantalla está en construcción.</p>
      <a href="/" className="text-sm font-medium" style={{ color: '#16a34a' }}>← Volver al inicio</a>
    </div>
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página pública */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<RegistroPlaceholder />} />

        {/* Autenticación */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard protegido (Admin) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPlaceholder />
            </PrivateRoute>
          }
        />

        {/* Vista del Usuario (Cliente) */}
        <Route
          path="/canje"
          element={
            <PrivateRoute>
              <CanjeView />
            </PrivateRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

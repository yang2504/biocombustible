import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../presentation/store/AuthContext';
import LoginPage from '../presentation/pages/LoginPage';

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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPlaceholder />
            </PrivateRoute>
          } 
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

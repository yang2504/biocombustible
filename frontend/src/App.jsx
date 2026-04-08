import React from 'react';
import { AuthProvider } from './presentation/store/AuthContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;

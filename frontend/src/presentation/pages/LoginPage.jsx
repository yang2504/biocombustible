import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Droplet, AlertCircle, User, Mail, Phone, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScene from '../components/three/LoginScene';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regData, setRegData] = useState({
    nombre: '', apellido: '', email: '', password: '', telefono: ''
  });

  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const { login, loading, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); clearError(); setSuccessMsg('');

    if (!email || !password) {
      setLocalError('Complete credenciales.');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      // rol = 1 es Administrador, rol = 2 (u otros) es Cliente
      if (result.rol === 1) {
        navigate('/dashboard');
      } else {
        navigate('/canje'); // Vista principal del cliente
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); clearError(); setSuccessMsg('');

    if (!regData.nombre || !regData.email || !regData.password) {
      setLocalError('Campos obligatorios faltantes.');
      return;
    }

    setIsRegistering(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock
      setSuccessMsg('Registro exitoso. Inicie sesión.');
      setIsLogin(true);
    } catch (err) {
      setLocalError('Error al registrar.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleChangeReg = (e) => setRegData({ ...regData, [e.target.name]: e.target.value });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLocalError(''); clearError(); setSuccessMsg('');
  };

  const error = localError || authError;

  return (
    <div className="min-h-screen flex items-center justify-end bg-[var(--color-surface)] relative overflow-hidden pr-[5%] lg:pr-[10%]">
      
      {/* Texto gigante de fondo a la izquierda */}
      <div className="bg-text-layer">
        TRAZABILIDAD <br/>
        ACEITE <br/>
        BIOCOMBUSTIBLE
      </div>

      {/* Escena 3D */}
      <LoginScene />

      {/* Panel Frontal / Formulario */}
      <motion.div 
        layout
        className="w-full max-w-xl relative z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div layout className="glass-panel p-12 rounded-xl relative overflow-hidden">
          
          {/* Header del panel (Logo + Titulo) */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-full border border-[var(--color-primary-dark)] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
               <Droplet className="w-6 h-6 text-[var(--color-primary-dark)]" />
            </div>
            <h1 className="text-4xl font-bold tracking-widest text-[var(--color-primary)] mb-2 uppercase">
              OilTrace
            </h1>
            <p className="text-xs tracking-[0.2em] text-[#888] uppercase font-semibold">
              Sistema de trazabilidad
            </p>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-[var(--color-primary-dark)]/50 to-transparent mb-8"></div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              // --- FORM LOGIN ---
              <motion.form 
                key="login"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleLoginSubmit} 
                className="space-y-6"
              >
                {successMsg && <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-xs text-center">{successMsg}</div>}

                <Input 
                  label="Usuario" 
                  placeholder="Ingrese su usuario o correo" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <Input 
                  label="Contraseña" 
                  type="password"
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                  <div className="flex items-center gap-2 p-2 text-red-500 text-xs">
                    <AlertCircle className="w-4 h-4" /> <p>{error}</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button type="submit" isLoading={loading}>
                    Ingresar al sistema
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-[#333] mt-6">
                  <Button type="button" variant="ghost" onClick={toggleMode} className="text-xs text-[#888] py-0!">
                    ¿Nuevo aquí? Regístrate
                  </Button>
                </div>
              </motion.form>

            ) : (
              // --- FORM REGISTER ---
              <motion.form 
                key="register"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleRegisterSubmit} 
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Nombre" name="nombre" placeholder="Juan" value={regData.nombre} onChange={handleChangeReg} icon={User} />
                  <Input label="Apellido" name="apellido" placeholder="Pérez" value={regData.apellido} onChange={handleChangeReg} />
                </div>
                
                <Input label="Correo" name="email" type="email" placeholder="correo@universidad.edu" value={regData.email} onChange={handleChangeReg} icon={Mail} />
                <Input label="Teléfono" name="telefono" placeholder="+591" value={regData.telefono} onChange={handleChangeReg} icon={Phone} />
                <Input label="Contraseña" name="password" type="password" placeholder="••••••••" value={regData.password} onChange={handleChangeReg} icon={Lock} />

                {error && (
                  <div className="flex items-center gap-2 p-2 text-red-500 text-xs">
                    <AlertCircle className="w-4 h-4" /> <p>{error}</p>
                  </div>
                )}

                <div className="pt-2">
                  <Button type="submit" isLoading={isRegistering}>
                    Registrar
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-[#333] mt-4">
                  <Button type="button" variant="ghost" onClick={toggleMode} className="text-xs text-[#888] py-0!">
                    Volver al login
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer Card */}
          <div className="mt-12 text-center">
            <p className="text-[10px] text-[#555] font-medium tracking-widest uppercase">
              Universidad Privada Franz Tamayo · 2026
            </p>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

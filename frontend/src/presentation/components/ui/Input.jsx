import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ label, type = 'text', icon: Icon, className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="text-sm uppercase tracking-wider font-bold text-[var(--color-primary-dark)] ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-white/40 group-focus-within:text-[var(--color-primary)] transition-colors" />
          </div>
        )}
        
        <input
          type={inputType}
          className={`w-full bg-white/[0.03] border border-white/10 text-white text-base rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:bg-white/[0.06] backdrop-blur-md transition-all py-4 ${Icon ? 'pl-11' : 'pl-4'} ${isPassword ? 'pr-11' : 'pr-4'} placeholder-white/30 hover:border-white/20`}
          {...props}
        />
        
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#666] hover:text-[var(--color-primary)] transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

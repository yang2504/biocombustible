import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, isLoading, className = '', variant = 'primary', ...props }) => {
  const baseStyles = "relative w-full flex items-center justify-center gap-2 py-4 px-4 uppercase tracking-widest font-bold text-base rounded-lg transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-[#3f2b00] hover:shadow-[0_0_20px_rgba(253,224,71,0.4)] hover:brightness-110",
    ghost: "bg-transparent text-[#aaa] hover:text-[var(--color-primary)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

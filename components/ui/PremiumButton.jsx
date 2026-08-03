import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function PremiumButton({ 
  children, 
  onClick, 
  variant = 'primary', // 'primary', 'secondary', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseClasses = "relative flex items-center justify-center gap-2 font-bold transition-all duration-300 rounded-[14px] overflow-hidden group";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-linear-button hover:shadow-glow-sm hover:scale-[1.02] border border-white/10 active:scale-95",
    secondary: "bg-bgElevated text-textPrimary border border-borderStrong hover:bg-white/5 hover:border-primary/50 hover:shadow-glow-sm active:scale-95",
    ghost: "bg-transparent text-textSecondary hover:text-textPrimary hover:bg-bgSurface active:scale-95",
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variants[variant]} 
        ${isDisabled ? 'opacity-50 cursor-not-allowed transform-none' : 'cursor-pointer'} 
        ${className}
      `}
      {...props}
    >
      {/* Shine effect for primary button */}
      {variant === 'primary' && !isDisabled && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      )}

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 text-current transition-transform group-hover:scale-110" />
      ) : null}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-forest-500 text-white hover:bg-forest-600 active:bg-forest-700 shadow-md hover:shadow-lg',
  secondary: 'bg-white text-forest-600 border-2 border-forest-200 hover:border-forest-400 hover:bg-forest-50 dark:bg-dark-surface dark:text-forest-300 dark:border-forest-800 dark:hover:border-forest-600',
  ghost: 'bg-transparent text-forest-600 hover:bg-forest-50 dark:text-forest-300 dark:hover:bg-forest-900/30',
  danger: 'bg-danger-600 text-white hover:bg-red-700 shadow-md',
  outline: 'bg-transparent text-forest-500 border-2 border-forest-500 hover:bg-forest-500 hover:text-white dark:text-forest-400 dark:border-forest-400',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-2xl',
};

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  icon: Icon, 
  iconRight: IconRight,
  className = '', 
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 focus-visible:ring-offset-2
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight className="w-4 h-4" />}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;

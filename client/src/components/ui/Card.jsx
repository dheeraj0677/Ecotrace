import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  onClick,
  gradient,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        bg-white/80 dark:bg-dark-surface/80 
        backdrop-blur-md rounded-2xl 
        border border-gray-100 dark:border-forest-900/50 
        shadow-sm hover:shadow-md 
        transition-shadow duration-300
        ${padding}
        ${gradient ? `bg-gradient-to-br ${gradient}` : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}

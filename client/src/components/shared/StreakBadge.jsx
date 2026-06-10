import { motion } from 'framer-motion';

export default function StreakBadge({ count, size = 'md' }) {
  if (!count || count <= 0) return null;

  const sizes = {
    sm: 'text-sm px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold ${sizes[size]}`}
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        🔥
      </motion.span>
      <span>{count}</span>
    </motion.div>
  );
}

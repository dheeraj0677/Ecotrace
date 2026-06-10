import { motion } from 'framer-motion';

export default function ProgressBar({ value, max = 100, color = 'forest', height = 'h-2', showLabel = false, className = '' }) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const colorClasses = {
    forest: 'bg-forest-500',
    sky: 'bg-sky-600',
    warn: 'bg-warn-600',
    danger: 'bg-danger-600',
    earth: 'bg-earth-400',
    gradient: 'bg-gradient-to-r from-forest-400 to-sky-500',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>{Math.round(percent)}%</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className={`w-full ${height} bg-gray-200 dark:bg-forest-900/40 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`${height} ${colorClasses[color] || colorClasses.forest} rounded-full`}
        />
      </div>
    </div>
  );
}

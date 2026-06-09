import { motion } from 'framer-motion';
import { getGradeForTons } from '@/utils/gradeSystem';
import { GradeBadge } from '@/components/ui/Badge';
import { TreePine } from 'lucide-react';

export default function LivePreview({ result }) {
  if (!result) return null;

  const gradeInfo = getGradeForTons(result.total_annual_tons);
  const categories = [
    { key: 'home_energy', label: 'Home', icon: '🏠', color: 'bg-forest-500' },
    { key: 'transport', label: 'Transport', icon: '🚗', color: 'bg-sky-600' },
    { key: 'flights', label: 'Flights', icon: '✈️', color: 'bg-earth-400' },
    { key: 'food', label: 'Food', icon: '🥗', color: 'bg-warn-600' },
    { key: 'lifestyle', label: 'Lifestyle', icon: '🛍️', color: 'bg-danger-400' },
  ];

  const total = Object.values(result.breakdown).reduce((s, v) => s + v, 0);

  // Animated leaf color
  const leafColor = result.total_annual_tons <= 2 ? '#52b788' :
    result.total_annual_tons <= 4 ? '#4cc9f0' :
    result.total_annual_tons <= 6 ? '#fbbf24' :
    result.total_annual_tons <= 8 ? '#f97316' : '#dc2626';

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-forest-900/50 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-br from-forest-50 to-sky-50 dark:from-forest-900/30 dark:to-sky-900/20 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Live Estimate</p>
        <motion.p
          key={result.total_annual_tons}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold font-display"
          style={{ color: gradeInfo.hex }}
        >
          {result.total_annual_tons}
        </motion.p>
        <p className="text-sm text-gray-500 dark:text-gray-400">tons CO₂e / year</p>
        <div className="mt-2">
          <GradeBadge grade={result.grade} />
        </div>
      </div>

      {/* Animated Leaf */}
      <div className="flex justify-center py-3">
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path d="M20 5 C30 8, 35 20, 20 35 C5 20, 10 8, 20 5Z"
              fill={leafColor} opacity="0.8" />
            <line x1="20" y1="10" x2="20" y2="32" stroke="white" strokeWidth="1" opacity="0.5" />
          </svg>
        </motion.div>
      </div>

      {/* Breakdown */}
      <div className="px-5 pb-5 space-y-2">
        {categories.map((cat) => {
          const value = result.breakdown[cat.key] || 0;
          const pct = total > 0 ? Math.round((value / total) * 100) : 0;
          return (
            <div key={cat.key} className="flex items-center gap-2">
              <span className="text-sm w-5">{cat.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-gray-600 dark:text-gray-400">{cat.label}</span>
                  <span className="text-gray-500 font-medium">{pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-forest-900/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${cat.color}`}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="pt-3 mt-3 border-t border-gray-100 dark:border-forest-900/50 flex items-center gap-2 text-xs text-gray-400">
          <TreePine className="w-3.5 h-3.5" />
          <span>{result.trees_needed.toLocaleString()} trees needed</span>
        </div>
      </div>
    </div>
  );
}

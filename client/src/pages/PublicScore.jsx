import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getGradeForTons } from '@/utils/gradeSystem';
import Card from '@/components/ui/Card';
import { GradeBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, TreePine } from 'lucide-react';

export default function PublicScore() {
  const { userId } = useParams();

  // In a real app, this would fetch from the API. For now, use demo data.
  const score = {
    name: 'EcoTrace User',
    total_annual_tons: 4.2,
    grade: 'B',
    trees_needed: 200,
    breakdown: { home_energy: 1200, transport: 800, flights: 500, food: 600, lifestyle: 300 },
    badges: ['🌱', '🔥', '💪'],
  };

  const gradeInfo = getGradeForTons(score.total_annual_tons);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <Card className="text-center" padding="p-0">
          {/* Header */}
          <div className="bg-gradient-to-br from-forest-600 to-forest-800 p-8 rounded-t-2xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-forest-300" />
              <span className="text-white/80 text-sm font-semibold">EcoTrace</span>
            </div>
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl font-black font-display mb-3"
              style={{ background: `${gradeInfo.hex}22`, color: gradeInfo.hex, border: `2px solid ${gradeInfo.hex}66` }}>
              {gradeInfo.letter}
            </motion.div>
            <p className="text-white text-sm">{score.name}</p>
          </div>

          {/* Stats */}
          <div className="p-6">
            <p className="text-3xl font-bold gradient-text mb-1">{score.total_annual_tons} tons</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">CO₂e per year · {gradeInfo.label}</p>

            <div className="flex justify-center gap-4 mb-4">
              {score.badges.map((b, i) => (
                <span key={i} className="text-2xl">{b}</span>
              ))}
            </div>

            <p className="text-xs text-gray-400 mb-6 flex items-center justify-center gap-1">
              <TreePine className="w-3 h-3" /> {score.trees_needed} trees needed to offset
            </p>

            <Link to="/calculate">
              <Button className="w-full" iconRight={ArrowRight}>Calculate Your Own Footprint</Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

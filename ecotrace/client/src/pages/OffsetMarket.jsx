import { useState } from 'react';
import { motion } from 'framer-motion';
import { OFFSETS, calculateOffsetCost } from '@/data/offsets';
import useFootprint from '@/hooks/useFootprint';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { ExternalLink, Info, ChevronDown, Leaf, ShieldCheck, MapPin } from 'lucide-react';

export default function OffsetMarket() {
  const { latest } = useFootprint();
  const [expandExplainer, setExpandExplainer] = useState(false);
  const [offsetTons, setOffsetTons] = useState(latest?.total_annual_tons || 4.7);

  const userTons = latest?.total_annual_tons || 4.7;
  const avgCostPerTon = OFFSETS.reduce((s, o) => s + o.pricePerTon, 0) / OFFSETS.length;

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-dark-text mb-2">🌍 Offset Marketplace</h1>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-forest-50 to-sky-50 dark:from-forest-900/20 dark:to-sky-900/20 border border-forest-100 dark:border-forest-800">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Your Footprint</p>
                <p className="text-2xl font-bold text-forest-600 dark:text-forest-400">{userTons} tons</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Offsets Needed</p>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{userTons} tons</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Est. Cost</p>
                <p className="text-2xl font-bold text-earth-400">${Math.round(userTons * avgCostPerTon)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Explainer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
          <button onClick={() => setExpandExplainer(!expandExplainer)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-forest-600 transition-colors">
            <Info className="w-4 h-4" /> How do carbon offsets work?
            <ChevronDown className={`w-4 h-4 transition-transform ${expandExplainer ? 'rotate-180' : ''}`} />
          </button>
          {expandExplainer && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-forest-900/50">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Carbon offsets fund projects that reduce or remove CO₂ from the atmosphere. When you purchase an offset, you're funding verified projects like tree planting, renewable energy, or methane capture. Each project is certified by independent standards (Gold Standard, VCS) to ensure real, measurable impact. <strong>Remember: offsets should be a last resort after reducing your own emissions first.</strong>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {OFFSETS.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
              <Card className="h-full flex flex-col">
                {/* Hero */}
                <div className={`h-32 rounded-xl bg-gradient-to-br ${project.heroGradient} flex items-center justify-center mb-4 relative overflow-hidden`}>
                  <span className="text-5xl opacity-80">{project.icon}</span>
                  <div className="absolute top-2 right-2">
                    <Badge variant="forest" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>{project.certification}</Badge>
                  </div>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-dark-text mb-1">{project.name}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" /> {project.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex-1">{project.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Impact</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{project.impact}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Price</span>
                    <span className="text-forest-600 dark:text-forest-400 font-bold">${project.pricePerTon}/ton</span>
                  </div>
                  <ProgressBar value={project.fundingRaised} max={project.fundingGoal} color="gradient" showLabel />
                </div>

                <Button size="sm" className="w-full" icon={Leaf}>
                  Offset {userTons}t · ${calculateOffsetCost(userTons, project.pricePerTon)}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Offset Calculator */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">🧮 Offset Calculator</h3>
          <div className="grid sm:grid-cols-3 gap-6 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tons to offset: <span className="text-forest-500 font-bold">{offsetTons}</span>
              </label>
              <input type="range" min="0.5" max="20" step="0.5" value={offsetTons}
                onChange={(e) => setOffsetTons(Number(e.target.value))}
                className="w-full accent-forest-500" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Estimated Cost</p>
              <p className="text-3xl font-bold text-forest-600 dark:text-forest-400">
                ${Math.round(offsetTons * avgCostPerTon)}
              </p>
              <p className="text-xs text-gray-400">avg across all projects</p>
            </div>
            <div className="text-center">
              <Button icon={ExternalLink}>Proceed to Partner Site</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

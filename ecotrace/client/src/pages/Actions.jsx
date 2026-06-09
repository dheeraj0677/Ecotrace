import { useState } from 'react';
import { motion } from 'framer-motion';
import { ACTIONS, ACTION_CATEGORIES } from '@/data/actions';
import { getCurrentWeekChallenge } from '@/data/weeklyChallenges';
import useDashboardStore from '@/store/dashboardStore';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { fireConfetti } from '@/components/shared/ConfettiBlast';
import { Filter, CheckCircle2, Leaf } from 'lucide-react';

export default function Actions() {
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState(null);
  const [showPledgesOnly, setShowPledgesOnly] = useState(false);
  const { pledgeAction, unpledgeAction, isPledged, getTotalCO2Saved, pledgedActions } = useDashboardStore();
  const weeklyChallenge = getCurrentWeekChallenge();
  const totalSaved = getTotalCO2Saved();

  let filtered = [...ACTIONS];
  if (category !== 'all') filtered = filtered.filter(a => a.category === category);
  if (difficulty) filtered = filtered.filter(a => a.difficulty === difficulty);
  if (showPledgesOnly) filtered = filtered.filter(a => isPledged(a.id));

  const handlePledge = (action) => {
    if (isPledged(action.id)) {
      unpledgeAction(action.id);
    } else {
      pledgeAction(action.id, action.co2_saved_kg);
      fireConfetti();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Weekly Challenge */}
        {weeklyChallenge.action && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-forest-500 to-sky-600 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <Badge variant="default" className="bg-white/20 text-white mb-3">🏆 Weekly Challenge</Badge>
                <h2 className="text-xl font-bold font-display mb-1">{weeklyChallenge.action.title}</h2>
                <p className="text-sm text-white/80 mb-3">{weeklyChallenge.bonus_message}</p>
                <ProgressBar value={weeklyChallenge.communityProgress} color="sky" height="h-2" className="mb-2" />
                <p className="text-xs text-white/60">{weeklyChallenge.communityProgress}% of community completed</p>
                <Button variant="secondary" size="sm" className="mt-3 bg-white text-forest-700 border-white hover:bg-white/90"
                  onClick={() => handlePledge(weeklyChallenge.action)}>
                  {isPledged(weeklyChallenge.action.id) ? '✓ Joined' : 'Join Challenge'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {ACTION_CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    category === cat.id
                      ? 'bg-forest-500 text-white'
                      : 'bg-gray-100 dark:bg-forest-900/30 text-gray-600 dark:text-gray-400 hover:bg-forest-100 dark:hover:bg-forest-900/50'
                  }`}>
                  {cat.icon} {cat.label}
                </button>
              ))}
              <div className="w-px bg-gray-200 dark:bg-forest-900/50 mx-1" />
              {[1, 2, 3].map((d) => (
                <button key={d} onClick={() => setDifficulty(difficulty === d ? null : d)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    difficulty === d ? 'bg-forest-500 text-white' : 'bg-gray-100 dark:bg-forest-900/30 text-gray-600 dark:text-gray-400'
                  }`}>
                  {'🌿'.repeat(d)}
                </button>
              ))}
              <button onClick={() => setShowPledgesOnly(!showPledgesOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  showPledgesOnly ? 'bg-forest-500 text-white' : 'bg-gray-100 dark:bg-forest-900/30 text-gray-600 dark:text-gray-400'
                }`}>
                <Filter className="w-3 h-3" /> My Pledges
              </button>
            </div>

            {/* Actions Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((action, i) => {
                const pledged = isPledged(action.id);
                return (
                  <motion.div key={action.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Card className={pledged ? 'border-forest-300 dark:border-forest-700 bg-forest-50/50 dark:bg-forest-900/20' : ''}>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{action.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text">{action.title}</h3>
                            <Badge variant="forest" size="sm">-{action.co2_saved_kg}kg/yr</Badge>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{action.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] text-gray-400">{'🌿'.repeat(action.difficulty)}</span>
                            <span className="text-[10px] text-gray-400">{action.cost_impact}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant={pledged ? 'ghost' : 'primary'}
                        className="w-full mt-3"
                        onClick={() => handlePledge(action)}
                        icon={pledged ? CheckCircle2 : undefined}>
                        {pledged ? 'Pledged ✓' : 'Pledge'}
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24">
              <Card>
                <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-3 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-forest-500" /> My Impact
                </h3>
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-forest-500">{(totalSaved / 1000).toFixed(1)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">tonnes CO₂ saved</p>
                </div>
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between"><span>Actions pledged</span><span className="font-medium">{pledgedActions.length}</span></div>
                  <div className="flex justify-between"><span>Total kg saved</span><span className="font-medium">{totalSaved.toLocaleString()}</span></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

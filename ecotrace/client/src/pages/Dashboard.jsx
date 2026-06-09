import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';
import useFootprint from '@/hooks/useFootprint';
import useAuth from '@/hooks/useAuth';
import useDashboardStore from '@/store/dashboardStore';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { GradeBadge } from '@/components/ui/Badge';
import StreakBadge from '@/components/shared/StreakBadge';
import { TreePine, TrendingDown, Award, ArrowRight, Zap, Target } from 'lucide-react';
import { ACTIONS } from '@/data/actions';
import { fireConfetti } from '@/components/shared/ConfettiBlast';

const COLORS = ['#2d9e6b', '#0096c7', '#a0785a', '#d97706', '#dc2626'];
const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const { latest, gradeInfo, insights, totalSaved, monthlyData, hasData } = useFootprint();
  const { userName } = useAuth();
  const { streak, pledgeAction, isPledged, pledgedActions } = useDashboardStore();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (!hasData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text mb-2">No data yet</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Complete your first carbon calculation to unlock your personal dashboard.</p>
          <Link to="/calculate"><Button iconRight={ArrowRight} size="lg">Calculate My Footprint</Button></Link>
        </div>
      </div>
    );
  }

  const breakdownData = Object.entries(latest.breakdown).map(([key, value], i) => ({
    name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value,
    color: COLORS[i],
  }));

  const comparisonData = [
    { name: 'You', value: latest.total_annual_tons, fill: gradeInfo.hex },
    { name: 'India Avg', value: 1.9, fill: '#8dd8b0' },
    { name: 'Global Avg', value: 4.7, fill: '#4cc9f0' },
    { name: 'Paris Target', value: 2.5, fill: '#fbbf24' },
  ];

  const uncompletedActions = ACTIONS.filter(a => !isPledged(a.id)).sort((a, b) => b.co2_saved_kg - a.co2_saved_kg).slice(0, 4);

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Top Bar */}
        <motion.div {...fadeIn} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text">
              {greeting()}, {userName} 🌱
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <StreakBadge count={streak.current} size="lg" />
        </motion.div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <Card className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Footprint</p>
              <p className="text-4xl font-bold font-display" style={{ color: gradeInfo.hex }}>{latest.total_annual_tons}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">tons CO₂e/year</p>
              <div className="mt-2"><GradeBadge grade={latest.grade} /></div>
            </Card>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <Card className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Global Ranking</p>
              <p className="text-4xl font-bold font-display text-sky-600 dark:text-sky-400">Top {100 - latest.percentile}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">worldwide</p>
              <div className="mt-2"><TrendingDown className="w-4 h-4 text-forest-500 mx-auto" /></div>
            </Card>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <Card className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Trees Needed</p>
              <p className="text-4xl font-bold font-display text-forest-500">{latest.trees_needed.toLocaleString()}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">to offset your footprint</p>
              <div className="mt-2 flex justify-center gap-0.5">
                {[...Array(Math.min(10, Math.ceil(latest.trees_needed / 50)))].map((_, i) => (
                  <TreePine key={i} className="w-3.5 h-3.5 text-forest-500" />
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Donut Chart */}
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <Card>
              <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">Category Breakdown</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={breakdownData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                      {breakdownData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v} kg CO₂e`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {breakdownData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Comparison Bar */}
          <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
            <Card>
              <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">vs. Average</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => `${v} tons/yr`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {comparisonData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Trend Chart */}
        {monthlyData.length > 0 && (
          <motion.div {...fadeIn} transition={{ delay: 0.6 }} className="mb-8">
            <Card>
              <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">Monthly Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="tons" stroke="#2d9e6b" strokeWidth={3} dot={{ fill: '#2d9e6b', strokeWidth: 2, r: 5 }} />
                    <Line type="monotone" dataKey={() => 2.5} stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" name="Paris Target" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <motion.div {...fadeIn} transition={{ delay: 0.7 }} className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-warn-400" /> AI Insights</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {insights.map((insight, i) => (
                <Card key={insight.id}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{insight.icon}</span>
                    <div>
                      <span className="text-[10px] font-semibold text-forest-600 dark:text-forest-400 uppercase tracking-wider">{insight.category}</span>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-dark-text mt-1">{insight.headline}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{insight.tip}</p>
                      <p className="text-xs font-semibold text-forest-500 mt-2">💚 {insight.savings}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div {...fadeIn} transition={{ delay: 0.8 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text flex items-center gap-2"><Target className="w-5 h-5 text-forest-500" /> Quick Actions</h3>
            <Link to="/actions" className="text-sm text-forest-500 hover:text-forest-600 font-medium">See all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {uncompletedActions.map((action) => (
              <Card key={action.id}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">{action.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-dark-text">{action.title}</h4>
                    <p className="text-xs text-forest-500 font-medium mt-1">-{action.co2_saved_kg} kg/yr</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3"
                  onClick={() => { pledgeAction(action.id, action.co2_saved_kg); fireConfetti(); }}>
                  Pledge
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Tree Visualizer */}
        <motion.div {...fadeIn} transition={{ delay: 0.9 }}>
          <Card>
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">🌳 Offset Progress</h3>
            <div className="flex flex-wrap gap-1">
              {[...Array(Math.min(100, latest.trees_needed))].map((_, i) => {
                const isOffset = i < Math.floor(totalSaved / 21);
                return (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.01 }}>
                    <TreePine className={`w-4 h-4 ${isOffset ? 'text-forest-500' : 'text-gray-200 dark:text-forest-900/40'}`} />
                  </motion.div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {Math.floor(totalSaved / 21)} of {latest.trees_needed} trees offset through your pledged actions
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

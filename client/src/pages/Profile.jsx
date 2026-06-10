import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import useAuth from '@/hooks/useAuth';
import useFootprint from '@/hooks/useFootprint';
import useDashboardStore from '@/store/dashboardStore';
import { BADGES, checkBadgeUnlock } from '@/data/badges';
import { ACTIONS, getActionById } from '@/data/actions';
import CarbonCard from '@/components/shared/CarbonCard';
import Card from '@/components/ui/Card';
import Badge, { GradeBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Download, Settings, Calendar, Award, TrendingDown } from 'lucide-react';
import { exportToCSV, formatFootprintForCSV } from '@/utils/exportHelpers';

export default function Profile() {
  const { user, userName, userInitials, avatarColor } = useAuth();
  const { latest, history, totalSaved, gradeInfo, pledgedActions: dashPledges } = useFootprint();
  const { streak, pledgedActions } = useDashboardStore();

  const userStats = {
    calculations_count: history.length,
    longest_streak: streak.longest,
    total_co2_saved: totalSaved,
    best_grade: latest?.grade,
    articles_read: useDashboardStore.getState().articlesRead.length,
    pledges_by_category: {},
  };

  // Count pledges by category
  for (const pledge of pledgedActions) {
    const action = getActionById(pledge.actionId);
    if (action) {
      userStats.pledges_by_category[action.category] = (userStats.pledges_by_category[action.category] || 0) + 1;
    }
  }

  const unlockedBadges = BADGES.filter(b => checkBadgeUnlock(b, userStats));
  const lockedBadges = BADGES.filter(b => !checkBadgeUnlock(b, userStats));

  const historyChartData = history.slice(0, 10).reverse().map(h => ({
    date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    tons: h.total_annual_tons,
  }));

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            style={{ backgroundColor: avatarColor }}>
            {userInitials}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text">{userName}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email || 'demo@ecotrace.app'} · Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
            </p>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Footprint', value: latest ? `${latest.total_annual_tons}t` : '—', icon: '🌍' },
            { label: 'CO₂ Saved', value: `${(totalSaved / 1000).toFixed(1)}t`, icon: '💚' },
            { label: 'Streak', value: `${streak.current} days`, icon: '🔥' },
            { label: 'Pledges', value: pledgedActions.length, icon: '✅' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="text-center" padding="p-4">
                <span className="text-xl">{stat.icon}</span>
                <p className="text-xl font-bold text-gray-900 dark:text-dark-text mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-forest-500" /> Badges</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {unlockedBadges.map((badge) => (
              <div key={badge.id} className="text-center p-3 rounded-xl bg-forest-50 dark:bg-forest-900/20 border border-forest-200 dark:border-forest-700 animate-badge-glow">
                <span className="text-3xl">{badge.icon}</span>
                <p className="text-[10px] font-semibold text-forest-700 dark:text-forest-300 mt-1">{badge.name}</p>
              </div>
            ))}
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="text-center p-3 rounded-xl bg-gray-100 dark:bg-forest-900/10 border border-gray-200 dark:border-forest-900/30 opacity-40">
                <span className="text-3xl grayscale">{badge.icon}</span>
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-500 mt-1">{badge.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footprint History Chart */}
        {historyChartData.length > 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
            <Card>
              <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2"><TrendingDown className="w-5 h-5" /> Footprint History</h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="tons" stroke="#2d9e6b" strokeWidth={2} dot={{ fill: '#2d9e6b', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Pledge History */}
        {pledgedActions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
            <Card>
              <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" /> Pledge History</h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {pledgedActions.slice(0, 15).map((pledge, i) => {
                  const action = getActionById(pledge.actionId);
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm py-2 border-b border-gray-50 dark:border-forest-900/30 last:border-0">
                      <span>{action?.icon || '🌿'}</span>
                      <span className="flex-1 text-gray-700 dark:text-gray-300">{action?.title || pledge.actionId}</span>
                      <Badge variant="forest" size="sm">-{pledge.co2Saved}kg</Badge>
                      <span className="text-xs text-gray-400">{new Date(pledge.pledgedAt).toLocaleDateString()}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Carbon Card */}
        {latest && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4">🎴 Shareable Carbon Card</h2>
            <CarbonCard result={latest} user={user} badges={unlockedBadges} />
          </motion.div>
        )}

        {/* Data Export & Settings */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-3 flex items-center gap-2"><Download className="w-4 h-4" /> Data Export</h3>
            <Button variant="secondary" size="sm" icon={Download}
              onClick={() => exportToCSV(formatFootprintForCSV(history), 'ecotrace-data.csv')}
              disabled={history.length === 0}>
              Download My Data as CSV
            </Button>
          </Card>
          <Card>
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-3 flex items-center gap-2"><Settings className="w-4 h-4" /> Settings</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Country: {user?.country || 'Not set'}</p>
              <p>Theme: Auto-detected</p>
              <p>Notifications: Enabled</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

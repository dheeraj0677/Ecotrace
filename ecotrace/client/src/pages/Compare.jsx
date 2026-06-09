import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useFootprint from '@/hooks/useFootprint';
import Card from '@/components/ui/Card';
import { GradeBadge } from '@/components/ui/Badge';
import { getGradeForTons } from '@/utils/gradeSystem';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { ArrowRight, Users, Share2 } from 'lucide-react';

const COLORS = ['#2d9e6b', '#0096c7', '#a0785a', '#d97706', '#dc2626'];

export default function Compare() {
  const { latest } = useFootprint();

  // Demo comparison user
  const otherUser = {
    name: 'Global Average',
    total_annual_tons: 4.7,
    breakdown: { home_energy: 1400, transport: 1200, flights: 400, food: 1200, lifestyle: 500 },
  };

  const users = [
    { name: latest ? 'You' : 'User 1', data: latest || { total_annual_tons: 5.2, breakdown: { home_energy: 1500, transport: 1000, flights: 600, food: 900, lifestyle: 400 } } },
    { name: otherUser.name, data: otherUser },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-dark-text mb-2 flex items-center gap-2">
            <Users className="w-7 h-7 text-forest-500" /> Compare
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Side-by-side carbon footprint comparison</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {users.map((user, idx) => {
            const gradeInfo = getGradeForTons(user.data.total_annual_tons);
            const breakdownData = Object.entries(user.data.breakdown).map(([key, value], i) => ({
              name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
              value,
              color: COLORS[i],
            }));

            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15 }}>
                <Card className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-forest-100 dark:bg-forest-900/30 flex items-center justify-center text-xl font-bold text-forest-600 dark:text-forest-400 mb-3">
                    {user.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text">{user.name}</h3>
                  <p className="text-3xl font-bold mt-2" style={{ color: gradeInfo.hex }}>
                    {user.data.total_annual_tons} t
                  </p>
                  <div className="mt-1 mb-4"><GradeBadge grade={gradeInfo.letter} /></div>

                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={breakdownData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3} dataKey="value">
                          {breakdownData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => `${v} kg`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1 mt-4">
                    {breakdownData.map((d, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                          <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-dark-text">{d.value} kg</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Share this link with a friend to compare your footprints side-by-side</p>
          <Button variant="secondary" icon={Share2} onClick={() => {
            const url = `${window.location.origin}/compare`;
            navigator.clipboard.writeText(url);
            import('react-hot-toast').then(m => m.default.success('Link copied!'));
          }}>
            Copy Compare Link
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

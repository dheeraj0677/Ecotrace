import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus, Globe } from 'lucide-react';

// Generate fake leaderboard data
const generateUsers = (count = 50) => {
  const names = ['Alex Green', 'Priya Sharma', 'Marcus Chen', 'Sofia Andersson', 'James Wilson', 'Yuki Tanaka', 'Lina Mueller', 'Carlos Rodriguez', 'Emma Thompson', 'Raj Patel', 'Hannah Kim', 'Oliver Brown', 'Aisha Hassan', 'David Lee', 'Maria Garcia', 'Tom Anderson', 'Nina Ivanova', 'Leo Nakamura', 'Sara Jensen', 'Kai Wong', 'Fatima Ali', 'Lucas Silva', 'Anna Kowalski', 'Ryan Murphy', 'Zara Mohammed', 'Max Fischer', 'Lily Chang', 'Noah Dubois', 'Eva Petrov', 'Sam O\'Brien', 'Mia Rossi', 'Jake Taylor', 'Rosa Fernandez', 'Leo Martin', 'Ava Johansson', 'Ben Clark', 'Chloe Wang', 'Dan Smith', 'Ella Davis', 'Finn O\'Reilly', 'Grace Park', 'Hugo Laurent', 'Iris Yamamoto', 'Jack Cooper', 'Kate Svensson', 'Lars Bergman', 'Mona Reddy', 'Niko Papadopoulos', 'Olivia Santos', 'Paul Meyer'];
  const countries = ['🇮🇳', '🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇯🇵', '🇧🇷', '🇸🇪', '🇳🇴', '🇦🇺', '🇨🇦', '🇰🇷', '🇲🇽', '🇪🇸', '🇮🇹'];
  const badges = ['🌱', '🔥', '🏆', '✂️', '💪', '⚡', '🌟'];
  return names.slice(0, count).map((name, i) => ({
    rank: i + 1,
    name,
    country: countries[i % countries.length],
    tons: Math.round((1.2 + Math.random() * 12) * 10) / 10,
    reduction: Math.round(-5 + Math.random() * 25),
    badges: badges.slice(0, 1 + Math.floor(Math.random() * 4)),
    change: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'same',
  })).sort((a, b) => a.tons - b.tons).map((u, i) => ({ ...u, rank: i + 1 }));
};

const users = generateUsers();

export default function Leaderboard() {
  const [tab, setTab] = useState('global');
  const [period, setPeriod] = useState('month');

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);
  const currentUserRank = 17;
  const currentUser = users[currentUserRank - 1];

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-dark-text mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">See how you compare to eco-warriors worldwide</p>
        </motion.div>

        {/* Tabs + Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-1 bg-gray-100 dark:bg-forest-900/30 rounded-xl p-1">
            {['global', 'regional', 'friends'].map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  tab === t ? 'bg-white dark:bg-dark-surface shadow-sm text-forest-600 dark:text-forest-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {['week', 'month', 'all'].map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  period === p ? 'bg-forest-500 text-white' : 'bg-gray-100 dark:bg-forest-900/30 text-gray-500 dark:text-gray-400'
                }`}>
                {p === 'all' ? 'All Time' : `This ${p}`}
              </button>
            ))}
          </div>
        </div>

        {/* Podium */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="mb-10">
          <div className="flex items-end justify-center gap-4">
            {/* 2nd Place */}
            <div className="text-center w-28">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-lg shadow-lg mb-2">
                {top3[1].name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="text-xs font-semibold text-gray-900 dark:text-dark-text truncate">{top3[1].name}</p>
              <p className="text-[10px] text-gray-400">{top3[1].country} {top3[1].tons}t</p>
              <div className="mt-2 h-20 bg-gradient-to-t from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-xl flex items-center justify-center">
                <Medal className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center w-32">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-xl mb-2 ring-4 ring-yellow-200 dark:ring-yellow-800">
                {top3[0].name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-dark-text truncate">{top3[0].name}</p>
              <p className="text-xs text-gray-400">{top3[0].country} {top3[0].tons}t</p>
              <div className="mt-2 h-28 bg-gradient-to-t from-yellow-200 to-yellow-50 dark:from-yellow-900 dark:to-yellow-950 rounded-t-xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center w-28">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-lg shadow-lg mb-2">
                {top3[2].name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="text-xs font-semibold text-gray-900 dark:text-dark-text truncate">{top3[2].name}</p>
              <p className="text-[10px] text-gray-400">{top3[2].country} {top3[2].tons}t</p>
              <div className="mt-2 h-16 bg-gradient-to-t from-amber-200 to-amber-50 dark:from-amber-900 dark:to-amber-950 rounded-t-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <Card padding="p-0" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-forest-900/50">
                  <th className="text-left p-4 text-xs text-gray-500 dark:text-gray-400 font-medium">Rank</th>
                  <th className="text-left p-4 text-xs text-gray-500 dark:text-gray-400 font-medium">User</th>
                  <th className="text-right p-4 text-xs text-gray-500 dark:text-gray-400 font-medium">CO₂ (t/yr)</th>
                  <th className="text-right p-4 text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:table-cell">Reduction</th>
                  <th className="text-center p-4 text-xs text-gray-500 dark:text-gray-400 font-medium hidden md:table-cell">Badges</th>
                  <th className="text-center p-4 text-xs text-gray-500 dark:text-gray-400 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {rest.slice(0, 20).map((user) => (
                  <tr key={user.rank} className={`border-b border-gray-50 dark:border-forest-900/30 hover:bg-gray-50 dark:hover:bg-forest-900/10 transition-colors ${
                    user.rank === currentUserRank ? 'bg-forest-50 dark:bg-forest-900/20' : ''
                  }`}>
                    <td className="p-4 font-bold text-gray-400">{user.rank}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-forest-100 dark:bg-forest-900/30 flex items-center justify-center text-forest-600 dark:text-forest-400 text-xs font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-dark-text">{user.name}</span>
                          <span className="text-xs text-gray-400 ml-1.5">{user.country}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold text-gray-900 dark:text-dark-text">{user.tons}</td>
                    <td className="p-4 text-right hidden sm:table-cell">
                      <span className={user.reduction > 0 ? 'text-forest-500' : 'text-danger-400'}>
                        {user.reduction > 0 ? '-' : '+'}{Math.abs(user.reduction)}%
                      </span>
                    </td>
                    <td className="p-4 text-center hidden md:table-cell">
                      <span className="text-sm">{user.badges.join('')}</span>
                    </td>
                    <td className="p-4 text-center">
                      {user.change === 'up' ? <TrendingUp className="w-4 h-4 text-forest-500 mx-auto" /> :
                       user.change === 'down' ? <TrendingDown className="w-4 h-4 text-danger-400 mx-auto" /> :
                       <Minus className="w-4 h-4 text-gray-300 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Current User Rank */}
        {currentUser && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="sticky bottom-4 mt-4">
            <div className="bg-forest-500 text-white rounded-xl p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">#{currentUserRank}</span>
                <span className="text-sm">Your Rank</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{currentUser.tons} t/yr</p>
                <p className="text-xs text-white/70">Next rank: #{currentUserRank - 1} ({users[currentUserRank - 2]?.tons}t)</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

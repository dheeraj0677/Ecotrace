export const BADGES = [
  { id: 'first_step', name: 'First Step', icon: '🌱', description: 'Complete your first carbon calculation', criteria: 'calculator_complete', threshold: 1 },
  { id: 'week_warrior', name: 'Week Warrior', icon: '🔥', description: 'Maintain a 7-day streak', criteria: 'streak', threshold: 7 },
  { id: 'month_master', name: 'Month Master', icon: '🏆', description: 'Maintain a 30-day streak', criteria: 'streak', threshold: 30 },
  { id: 'carbon_cutter', name: 'Carbon Cutter', icon: '✂️', description: 'Reduce your footprint by 10%', criteria: 'reduction_percent', threshold: 10 },
  { id: 'half_ton_hero', name: 'Half Ton Hero', icon: '💪', description: 'Save 500kg CO₂ through actions', criteria: 'co2_saved_kg', threshold: 500 },
  { id: 'tree_planter', name: 'Tree Planter', icon: '🌲', description: 'Offset at least 1 tonne of CO₂', criteria: 'offset_tons', threshold: 1 },
  { id: 'veggie_champion', name: 'Veggie Champion', icon: '🥬', description: 'Pledge 4 food-related actions', criteria: 'category_pledges', category: 'food', threshold: 4 },
  { id: 'green_commuter', name: 'Green Commuter', icon: '🚲', description: 'Pledge 3 transport actions', criteria: 'category_pledges', category: 'transport', threshold: 3 },
  { id: 'energy_saver', name: 'Energy Saver', icon: '⚡', description: 'Pledge 3 home energy actions', criteria: 'category_pledges', category: 'home', threshold: 3 },
  { id: 'carbon_neutral', name: 'Carbon Neutral', icon: '🌟', description: 'Achieve an A grade', criteria: 'grade', threshold: 'A' },
  { id: 'community_star', name: 'Community Star', icon: '⭐', description: 'Reach top 10% on leaderboard', criteria: 'percentile', threshold: 90 },
  { id: 'educator', name: 'Educator', icon: '📚', description: 'Read 5 articles in the Learn hub', criteria: 'articles_read', threshold: 5 },
];

export function checkBadgeUnlock(badge, userStats) {
  switch (badge.criteria) {
    case 'calculator_complete':
      return (userStats.calculations_count || 0) >= badge.threshold;
    case 'streak':
      return (userStats.longest_streak || 0) >= badge.threshold;
    case 'reduction_percent':
      return (userStats.reduction_percent || 0) >= badge.threshold;
    case 'co2_saved_kg':
      return (userStats.total_co2_saved || 0) >= badge.threshold;
    case 'offset_tons':
      return (userStats.offset_tons || 0) >= badge.threshold;
    case 'category_pledges': {
      const catPledges = userStats.pledges_by_category || {};
      return (catPledges[badge.category] || 0) >= badge.threshold;
    }
    case 'grade':
      return userStats.best_grade === badge.threshold;
    case 'percentile':
      return (userStats.percentile || 0) >= badge.threshold;
    case 'articles_read':
      return (userStats.articles_read || 0) >= badge.threshold;
    default:
      return false;
  }
}

export function getUnlockedBadges(userStats) {
  return BADGES.filter((b) => checkBadgeUnlock(b, userStats));
}

export function getLockedBadges(userStats) {
  return BADGES.filter((b) => !checkBadgeUnlock(b, userStats));
}

import { getBreakdownPercentages, getTopCategory } from './carbonCalculator';

const INSIGHT_RULES = [
  {
    id: 'high_flights',
    category: 'flights',
    condition: (breakdown, pcts) => pcts.flights >= 25,
    generate: (breakdown, pcts, result) => ({
      icon: '✈️',
      category: 'Travel',
      headline: `Your flights make up ${pcts.flights}% of your footprint`,
      detail: `Aviation is one of the most carbon-intensive activities per hour. Each long-haul flight generates about ${Math.round(result.breakdown.flights / Math.max(1, result.inputs?.long_haul_flights || 1))} kg of CO₂.`,
      tip: 'Consider taking one fewer long-haul flight this year or choosing train travel for shorter trips.',
      savings: 'Taking one fewer long-haul flight saves ~1.5 tons/year',
      impact: 1500,
    }),
  },
  {
    id: 'meat_heavy_diet',
    category: 'food',
    condition: (breakdown, pcts, result) => result.inputs?.diet === 'meat_heavy',
    generate: (breakdown, pcts, result) => ({
      icon: '🥩',
      category: 'Food',
      headline: 'Your meat-heavy diet significantly increases emissions',
      detail: `Food accounts for ${pcts.food}% of your footprint. A meat-heavy diet produces about 7.2 kg CO₂ per day compared to 1.5 kg for a vegan diet.`,
      tip: 'Try Meat-Free Mondays to start. Even reducing meat by 2 days/week saves substantial emissions.',
      savings: 'Switching to flexitarian saves ~1.2 tons/year',
      impact: 1200,
    }),
  },
  {
    id: 'high_car_use',
    category: 'transport',
    condition: (breakdown, pcts, result) =>
      pcts.transport >= 25 && result.inputs?.car_type && result.inputs.car_type !== 'none',
    generate: (breakdown, pcts, result) => ({
      icon: '🚗',
      category: 'Transport',
      headline: `Driving accounts for ${pcts.transport}% of your carbon footprint`,
      detail: `Your ${result.inputs?.car_type?.replace('_', ' ')} emits significant CO₂ on your weekly commute.`,
      tip: 'Carpooling just 2 days a week cuts transport emissions by 40%. Consider public transit for routine trips.',
      savings: 'Carpooling 2x/week saves ~0.8 tons/year',
      impact: 800,
    }),
  },
  {
    id: 'high_home_energy',
    category: 'home_energy',
    condition: (breakdown, pcts) => pcts.home_energy >= 30,
    generate: (breakdown, pcts) => ({
      icon: '🏠',
      category: 'Home Energy',
      headline: `Home energy is your biggest source at ${pcts.home_energy}%`,
      detail: 'Heating, cooling, and electricity are major contributors. Your grid\'s energy mix heavily influences this.',
      tip: 'Switch to a green energy tariff, install a smart thermostat, and improve insulation.',
      savings: 'Green energy + smart thermostat saves ~1.0 tons/year',
      impact: 1000,
    }),
  },
  {
    id: 'low_renewable',
    category: 'home_energy',
    condition: (_, __, result) => (result.inputs?.renewable_percent || 0) < 20,
    generate: () => ({
      icon: '⚡',
      category: 'Energy',
      headline: 'Your energy is mostly from fossil fuels',
      detail: 'Less than 20% of your electricity comes from renewable sources. The grid mix in your region is carbon-intensive.',
      tip: 'Switching to a renewable energy provider can cut your home energy emissions by up to 80%.',
      savings: 'Switching to renewables saves ~0.5–1.5 tons/year',
      impact: 1000,
    }),
  },
  {
    id: 'high_shopping',
    category: 'lifestyle',
    condition: (breakdown, pcts) => pcts.lifestyle >= 20 && breakdown.lifestyle > 500,
    generate: (breakdown, pcts) => ({
      icon: '🛍️',
      category: 'Shopping',
      headline: `Lifestyle & shopping contribute ${pcts.lifestyle}% to your footprint`,
      detail: 'Online orders, new clothing, electronics, and streaming all add up over a year.',
      tip: 'Buy secondhand, repair before replacing, and consider quality over quantity.',
      savings: 'Reducing shopping by 30% saves ~0.3 tons/year',
      impact: 300,
    }),
  },
  {
    id: 'low_recycling',
    category: 'lifestyle',
    condition: (_, __, result) => (result.inputs?.recycling_percent || 0) < 30,
    generate: () => ({
      icon: '♻️',
      category: 'Waste',
      headline: 'Your recycling rate is below average',
      detail: 'Recycling reduces the emissions from waste by up to 94% compared to landfill.',
      tip: 'Start separating recyclables and compostables. Even basic sorting makes a big difference.',
      savings: 'Increasing recycling to 60% saves ~0.15 tons/year',
      impact: 150,
    }),
  },
  {
    id: 'food_waste',
    category: 'food',
    condition: (_, __, result) => result.inputs?.food_waste === 'high',
    generate: () => ({
      icon: '🗑️',
      category: 'Food Waste',
      headline: 'High food waste is inflating your food emissions',
      detail: 'About 8-10% of global emissions come from food waste. Wasted food means wasted resources.',
      tip: 'Plan meals, buy only what you need, and compost scraps. A meal plan can cut food waste by 40%.',
      savings: 'Reducing food waste saves ~0.3 tons/year',
      impact: 300,
    }),
  },
  {
    id: 'petrol_car',
    category: 'transport',
    condition: (_, __, result) =>
      result.inputs?.car_type === 'petrol_car' || result.inputs?.car_type === 'diesel_car',
    generate: (breakdown, pcts, result) => ({
      icon: '⛽',
      category: 'Vehicle',
      headline: 'Your fossil fuel vehicle is a top emitter',
      detail: `A ${result.inputs?.car_type === 'petrol_car' ? 'petrol' : 'diesel'} car emits about ${result.inputs?.car_type === 'petrol_car' ? '192' : '171'} grams of CO₂ per kilometer.`,
      tip: 'When it\'s time for a new car, consider a hybrid (45% less) or electric (72% less) vehicle.',
      savings: 'Switching to EV saves ~1.0+ tons/year',
      impact: 1000,
    }),
  },
  {
    id: 'great_score',
    category: 'general',
    condition: (_, __, result) => result.total_annual_tons <= 2,
    generate: (_, __, result) => ({
      icon: '🌟',
      category: 'Achievement',
      headline: 'You\'re in the top tier globally!',
      detail: `At ${result.total_annual_tons} tons/year, you're well below the world average of 4.7 tons. Keep it up!`,
      tip: 'Inspire others by sharing your carbon card. You can also offset your remaining footprint.',
      savings: 'You\'re already doing great!',
      impact: 0,
    }),
  },
];

export function generateInsights(result) {
  const breakdown = result.breakdown;
  const pcts = getBreakdownPercentages(breakdown);
  const topCategory = getTopCategory(breakdown);

  const insights = [];

  for (const rule of INSIGHT_RULES) {
    try {
      if (rule.condition(breakdown, pcts, result)) {
        const insight = rule.generate(breakdown, pcts, result);
        insights.push({ ...insight, id: rule.id, priority: insight.impact || 0 });
      }
    } catch (e) {
      // skip broken rules silently
    }
  }

  // Sort by impact (highest first) and return top 3
  insights.sort((a, b) => b.priority - a.priority);
  return insights.slice(0, 3);
}

export function getTopActions(result, allActions) {
  const pcts = getBreakdownPercentages(result.breakdown);
  const topCategories = Object.entries(pcts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([cat]) => cat);

  const categoryMap = {
    home_energy: 'home',
    transport: 'transport',
    flights: 'travel',
    food: 'food',
    lifestyle: 'shopping',
  };

  const recommended = [];
  for (const cat of topCategories) {
    const mapped = categoryMap[cat] || cat;
    const matching = allActions.filter(
      (a) => a.category.toLowerCase() === mapped && !a.pledged
    );
    matching.sort((a, b) => b.co2_saved_kg - a.co2_saved_kg);
    recommended.push(...matching.slice(0, 2));
  }

  return recommended.slice(0, 3);
}

export const ACTIONS = [
  // HOME
  { id: 'led_bulbs', category: 'home', title: 'Switch to LED bulbs everywhere', description: 'Replace all incandescent and CFL bulbs with energy-efficient LEDs.', co2_saved_kg: 136, difficulty: 1, cost_impact: 'Save $75/year', icon: '💡' },
  { id: 'smart_thermostat', category: 'home', title: 'Install a smart thermostat', description: 'Optimize heating and cooling schedules automatically based on your habits.', co2_saved_kg: 340, difficulty: 2, cost_impact: 'Save $140/year', icon: '🌡️' },
  { id: 'air_dry_laundry', category: 'home', title: 'Air-dry your laundry', description: 'Skip the dryer and air-dry clothes to save energy and extend garment life.', co2_saved_kg: 270, difficulty: 1, cost_impact: 'Save $65/year', icon: '👕' },
  { id: 'shorter_showers', category: 'home', title: 'Take shorter showers (5 min)', description: 'Reduce hot water usage by keeping showers under 5 minutes.', co2_saved_kg: 180, difficulty: 1, cost_impact: 'Save $50/year', icon: '🚿' },
  { id: 'fix_insulation', category: 'home', title: 'Fix drafts and insulation', description: 'Seal gaps around windows and doors to reduce heating and cooling waste.', co2_saved_kg: 410, difficulty: 2, cost_impact: 'Save $200/year', icon: '🏗️' },
  { id: 'green_energy', category: 'home', title: 'Switch to green energy tariff', description: 'Choose a renewable energy provider for your home electricity.', co2_saved_kg: 1500, difficulty: 1, cost_impact: 'Save $0–30/year', icon: '🌿' },
  { id: 'unplug_standby', category: 'home', title: 'Unplug standby devices', description: 'Use power strips to easily disconnect devices on standby mode.', co2_saved_kg: 90, difficulty: 1, cost_impact: 'Save $50/year', icon: '🔌' },
  { id: 'solar_panels', category: 'home', title: 'Install solar panels', description: 'Generate clean electricity at home and potentially earn credits.', co2_saved_kg: 2000, difficulty: 3, cost_impact: 'Save $600+/year', icon: '☀️' },

  // FOOD
  { id: 'meat_free_monday', category: 'food', title: 'Meat-Free Mondays', description: 'Go vegetarian one day a week to reduce your food carbon footprint.', co2_saved_kg: 150, difficulty: 1, cost_impact: '🌱 Free', icon: '🥬' },
  { id: 'vegan_week', category: 'food', title: 'Try a vegan week', description: 'Challenge yourself to eat fully plant-based for one week per month.', co2_saved_kg: 200, difficulty: 2, cost_impact: 'Save $15/week', icon: '🥑' },
  { id: 'meal_planning', category: 'food', title: 'Reduce food waste by meal planning', description: 'Plan your meals for the week to buy only what you need.', co2_saved_kg: 280, difficulty: 1, cost_impact: 'Save $100/year', icon: '📋' },
  { id: 'buy_local', category: 'food', title: 'Buy local produce', description: 'Shop at farmers markets to reduce food transportation emissions.', co2_saved_kg: 120, difficulty: 1, cost_impact: 'Varies', icon: '🧺' },
  { id: 'grow_herbs', category: 'food', title: 'Grow herbs at home', description: 'Start a small herb garden to reduce packaging and transport emissions.', co2_saved_kg: 30, difficulty: 1, cost_impact: 'Save $40/year', icon: '🌱' },
  { id: 'compost', category: 'food', title: 'Compost kitchen waste', description: 'Turn food scraps into nutrient-rich soil instead of sending them to landfill.', co2_saved_kg: 160, difficulty: 2, cost_impact: '🌱 Free', icon: '🪱' },

  // TRANSPORT
  { id: 'carpool', category: 'transport', title: 'Carpool this week', description: 'Share rides with colleagues or neighbors to cut transport emissions in half.', co2_saved_kg: 800, difficulty: 1, cost_impact: 'Save $500/year', icon: '🚙' },
  { id: 'cycle_to_work', category: 'transport', title: 'Cycle to work', description: 'Replace car commuting with cycling for zero-emission travel.', co2_saved_kg: 1200, difficulty: 2, cost_impact: 'Save $2000/year', icon: '🚲' },
  { id: 'public_transit', category: 'transport', title: 'Use public transit instead of car', description: 'Buses and trains are 3–5x more efficient per passenger than driving alone.', co2_saved_kg: 950, difficulty: 1, cost_impact: 'Save $4000/year', icon: '🚌' },
  { id: 'walk_short_trips', category: 'transport', title: 'Walk short trips', description: 'Walk for any trip under 2km instead of driving.', co2_saved_kg: 200, difficulty: 1, cost_impact: '🌱 Free', icon: '🚶' },
  { id: 'car_maintenance', category: 'transport', title: 'Service your car for efficiency', description: 'Regular maintenance improves fuel efficiency by up to 10%.', co2_saved_kg: 200, difficulty: 1, cost_impact: 'Save $100/year', icon: '🔧' },
  { id: 'switch_ev', category: 'transport', title: 'Switch to EV next purchase', description: 'Electric vehicles produce 50–70% less emissions than petrol cars.', co2_saved_kg: 2500, difficulty: 3, cost_impact: 'Varies', icon: '⚡' },

  // TRAVEL
  { id: 'train_over_flight', category: 'travel', title: 'Take train instead of flight', description: 'Trains emit 80% less CO₂ than flying for the same distance.', co2_saved_kg: 1500, difficulty: 2, cost_impact: 'Varies', icon: '🚄' },
  { id: 'offset_flight', category: 'travel', title: 'Offset your next flight', description: 'Purchase verified carbon offsets to neutralize your flight emissions.', co2_saved_kg: 500, difficulty: 1, cost_impact: '$10–50', icon: '🌍' },
  { id: 'skip_long_haul', category: 'travel', title: 'Skip one long-haul trip', description: 'One fewer intercontinental flight saves over a ton of CO₂.', co2_saved_kg: 1800, difficulty: 2, cost_impact: 'Save $500+', icon: '🗺️' },
  { id: 'direct_flights', category: 'travel', title: 'Choose direct flights', description: 'Layovers add extra fuel burn for takeoff and landing. Direct flights save 20% emissions.', co2_saved_kg: 300, difficulty: 1, cost_impact: 'Varies', icon: '✈️' },

  // SHOPPING
  { id: 'buy_secondhand', category: 'shopping', title: 'Buy secondhand', description: 'Give pre-owned items a second life to avoid manufacturing emissions.', co2_saved_kg: 200, difficulty: 1, cost_impact: 'Save 50%+', icon: '🔄' },
  { id: 'repair_first', category: 'shopping', title: 'Repair before replacing', description: 'Fix broken items instead of buying new ones to reduce waste and emissions.', co2_saved_kg: 150, difficulty: 2, cost_impact: 'Save $200/year', icon: '🛠️' },
  { id: 'no_fast_fashion', category: 'shopping', title: 'Unsubscribe from fast fashion', description: 'Buy fewer, higher-quality clothing items that last longer.', co2_saved_kg: 300, difficulty: 1, cost_impact: 'Save $300/year', icon: '👗' },
  { id: 'quality_over_quantity', category: 'shopping', title: 'Buy quality over quantity', description: 'Invest in durable products that last years instead of months.', co2_saved_kg: 250, difficulty: 1, cost_impact: 'Varies', icon: '💎' },
  { id: 'digital_receipts', category: 'shopping', title: 'Digital receipts only', description: 'Skip paper receipts to save trees and reduce waste.', co2_saved_kg: 10, difficulty: 1, cost_impact: '🌱 Free', icon: '📱' },

  // ENERGY
  { id: 'switch_renewable_provider', category: 'energy', title: 'Switch energy provider to renewables', description: 'Choose an energy provider that sources 100% from wind, solar, or hydro.', co2_saved_kg: 1500, difficulty: 1, cost_impact: 'Save $0–50/year', icon: '🔋' },
  { id: 'double_glazing', category: 'energy', title: 'Install double glazing', description: 'Double-glazed windows reduce heat loss by up to 50%.', co2_saved_kg: 500, difficulty: 3, cost_impact: 'Save $150/year', icon: '🪟' },
  { id: 'aplus_appliances', category: 'energy', title: 'Upgrade to A+++ appliances', description: 'Energy-efficient appliances use 30–50% less electricity.', co2_saved_kg: 300, difficulty: 2, cost_impact: 'Save $80/year', icon: '🧊' },
  { id: 'lower_thermostat', category: 'energy', title: 'Set thermostat 1°C lower', description: 'Each degree lower saves about 3% on your heating bill.', co2_saved_kg: 250, difficulty: 1, cost_impact: 'Save $70/year', icon: '🌡️' },
];

export function getActionsByCategory(category) {
  if (!category || category === 'all') return ACTIONS;
  return ACTIONS.filter((a) => a.category === category);
}

export function getActionById(id) {
  return ACTIONS.find((a) => a.id === id);
}

export const ACTION_CATEGORIES = [
  { id: 'all', label: 'All', icon: '🌍' },
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'transport', label: 'Transport', icon: '🚗' },
  { id: 'food', label: 'Food', icon: '🥗' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'energy', label: 'Energy', icon: '⚡' },
];

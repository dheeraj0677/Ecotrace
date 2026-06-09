import { FACTORS } from './emissionFactors';

export function calculateFootprint(inputs) {
  const {
    country = 'WORLD',
    electricity_kwh = 300,
    renewable_percent = 0,
    gas_m3 = 50,
    home_size = 'medium',
    people_in_home = 1,
    car_type = 'none',
    car_km_weekly = 0,
    public_transit_km_weekly = 0,
    cycling_walking_percent = 0,
    domestic_flights = 0,
    short_haul_flights = 0,
    long_haul_flights = 0,
    diet = 'omnivore',
    food_waste = 'medium',
    local_food_percent = 20,
    meals_out_weekly = 3,
    online_orders_monthly = 5,
    new_clothing_yearly = 20,
    new_electronics_yearly = 2,
    streaming_hours_daily = 3,
    waste_kg_monthly = 30,
    recycling_percent = 30,
  } = inputs;

  const gridKey = `grid_${country.toLowerCase()}`;
  const gridFactor = FACTORS.electricity[gridKey] || FACTORS.electricity.grid_world_avg;

  // --- HOME ENERGY ---
  const renewableFraction = renewable_percent / 100;
  const gridElectricity = electricity_kwh * (1 - renewableFraction) * gridFactor;
  const renewableElectricity = electricity_kwh * renewableFraction * 0.03;
  const monthlyElectricity = gridElectricity + renewableElectricity;
  const monthlyGas = gas_m3 * FACTORS.gas_heating;
  const sizeMultiplier = FACTORS.home_size_multiplier[home_size] || 1.0;
  const safeOccupants = Math.max(people_in_home, 1);
  const homeEnergy = ((monthlyElectricity + monthlyGas) * 12 * sizeMultiplier) / safeOccupants;

  // --- TRANSPORT ---
  let transportAnnual = 0;
  if (car_type !== 'none' && FACTORS.transport[car_type]) {
    const adjustedCarKm = car_km_weekly * (1 - cycling_walking_percent / 100);
    transportAnnual += adjustedCarKm * 52 * FACTORS.transport[car_type];
  }
  transportAnnual += public_transit_km_weekly * 52 * FACTORS.transport.bus;

  // --- FLIGHTS ---
  const domesticFlightKg = domestic_flights * FACTORS.flight_distances.domestic * FACTORS.flights.domestic;
  const shortHaulKg = short_haul_flights * FACTORS.flight_distances.short_haul * FACTORS.flights.short_haul;
  const longHaulKg = long_haul_flights * FACTORS.flight_distances.long_haul * FACTORS.flights.long_haul;
  const flightsTotal = domesticFlightKg + shortHaulKg + longHaulKg;

  // --- FOOD ---
  const baseFoodDaily = FACTORS.food[diet] || FACTORS.food.omnivore;
  const wasteMultiplier = FACTORS.food_waste_multiplier[food_waste] || 1.1;
  const localReduction = 1 - (local_food_percent / 100) * FACTORS.local_food_reduction;
  const eatingOutExtra = meals_out_weekly * FACTORS.eating_out_extra * 52;
  const foodAnnual = baseFoodDaily * 365 * wasteMultiplier * localReduction + eatingOutExtra;

  // --- LIFESTYLE ---
  const shoppingEmissions =
    online_orders_monthly * 12 * FACTORS.shopping.online_order +
    new_clothing_yearly * FACTORS.shopping.new_clothing +
    new_electronics_yearly * FACTORS.shopping.electronics;
  const streamingEmissions = streaming_hours_daily * 365 * FACTORS.shopping.streaming_hour;
  const wasteMonthly = waste_kg_monthly;
  const recycledKg = wasteMonthly * (recycling_percent / 100);
  const landfillKg = wasteMonthly - recycledKg;
  const wasteEmissions = (landfillKg * FACTORS.waste.landfill + recycledKg * FACTORS.waste.recycled) * 12;
  const lifestyleTotal = shoppingEmissions + streamingEmissions + wasteEmissions;

  // --- TOTALS ---
  const totalKg = homeEnergy + transportAnnual + flightsTotal + foodAnnual + lifestyleTotal;
  const totalTons = totalKg / 1000;

  const breakdown = {
    home_energy: Math.round(homeEnergy),
    transport: Math.round(transportAnnual),
    flights: Math.round(flightsTotal),
    food: Math.round(foodAnnual),
    lifestyle: Math.round(lifestyleTotal),
  };

  const grade = getGrade(totalTons);
  const label = getLabel(grade);
  const percentile = getPercentile(totalTons);
  const treesNeeded = Math.ceil(totalKg / FACTORS.tree_absorption_kg_per_year);

  return {
    total_annual_tons: Math.round(totalTons * 100) / 100,
    total_annual_kg: Math.round(totalKg),
    breakdown,
    grade,
    label,
    percentile,
    trees_needed: treesNeeded,
    country,
    national_average: FACTORS.national_averages[country] || FACTORS.national_averages.WORLD,
    world_average: FACTORS.world_average_tons,
    paris_target: FACTORS.paris_target_tons,
  };
}

function getGrade(tons) {
  if (tons <= 2) return 'A';
  if (tons <= 4) return 'B';
  if (tons <= 6) return 'C';
  if (tons <= 8) return 'D';
  return 'F';
}

function getLabel(grade) {
  const labels = {
    A: 'Excellent',
    B: 'Good',
    C: 'Average',
    D: 'High',
    F: 'Critical',
  };
  return labels[grade] || 'Unknown';
}

function getPercentile(tons) {
  const worldAvg = FACTORS.world_average_tons;
  if (tons <= worldAvg * 0.3) return 95;
  if (tons <= worldAvg * 0.5) return 85;
  if (tons <= worldAvg * 0.7) return 70;
  if (tons <= worldAvg * 0.9) return 55;
  if (tons <= worldAvg * 1.1) return 45;
  if (tons <= worldAvg * 1.5) return 30;
  if (tons <= worldAvg * 2.0) return 15;
  if (tons <= worldAvg * 3.0) return 8;
  return 3;
}

export function getBreakdownPercentages(breakdown) {
  const total = Object.values(breakdown).reduce((s, v) => s + v, 0);
  if (total === 0) return {};
  const pcts = {};
  for (const [key, value] of Object.entries(breakdown)) {
    pcts[key] = Math.round((value / total) * 100);
  }
  return pcts;
}

export function getTopCategory(breakdown) {
  let max = 0;
  let top = 'home_energy';
  for (const [key, value] of Object.entries(breakdown)) {
    if (value > max) {
      max = value;
      top = key;
    }
  }
  return top;
}

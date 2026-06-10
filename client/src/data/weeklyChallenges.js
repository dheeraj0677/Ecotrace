import { ACTIONS } from './actions';

const WEEKLY_CHALLENGES = [
  { week: 1, action_id: 'meat_free_monday', bonus_message: 'Join thousands going meat-free every Monday!' },
  { week: 2, action_id: 'cycle_to_work', bonus_message: 'Swap four wheels for two this week!' },
  { week: 3, action_id: 'unplug_standby', bonus_message: 'Phantom power costs you money and CO₂!' },
  { week: 4, action_id: 'buy_secondhand', bonus_message: 'One person\'s trash is another\'s treasure!' },
  { week: 5, action_id: 'shorter_showers', bonus_message: '5-minute shower challenge — can you do it?' },
  { week: 6, action_id: 'meal_planning', bonus_message: 'Plan your meals, save food and carbon!' },
  { week: 7, action_id: 'public_transit', bonus_message: 'Leave the car at home this week!' },
  { week: 8, action_id: 'compost', bonus_message: 'Start composting — your garden will thank you!' },
  { week: 9, action_id: 'air_dry_laundry', bonus_message: 'Sun-dried clothes smell better anyway!' },
  { week: 10, action_id: 'no_fast_fashion', bonus_message: 'Break free from the fast fashion cycle!' },
  { week: 11, action_id: 'lower_thermostat', bonus_message: 'Just 1°C lower — you won\'t even notice!' },
  { week: 12, action_id: 'digital_receipts', bonus_message: 'Save trees, one receipt at a time!' },
  { week: 13, action_id: 'led_bulbs', bonus_message: 'LEDs last 25x longer than incandescent!' },
  { week: 14, action_id: 'vegan_week', bonus_message: 'A full vegan week — are you up for it?' },
  { week: 15, action_id: 'walk_short_trips', bonus_message: 'If it\'s under 2km, walk it!' },
  { week: 16, action_id: 'repair_first', bonus_message: 'Repair, don\'t replace!' },
  { week: 17, action_id: 'grow_herbs', bonus_message: 'Fresh basil from your windowsill!' },
  { week: 18, action_id: 'carpool', bonus_message: 'Share the ride, share the savings!' },
  { week: 19, action_id: 'quality_over_quantity', bonus_message: 'Invest in things that last!' },
  { week: 20, action_id: 'train_over_flight', bonus_message: 'The scenic route is the green route!' },
];

export function getCurrentWeekChallenge() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  const weekIndex = (weekNumber - 1) % WEEKLY_CHALLENGES.length;
  const challenge = WEEKLY_CHALLENGES[weekIndex];
  const action = ACTIONS.find((a) => a.id === challenge.action_id);

  return {
    ...challenge,
    action,
    weekNumber,
    communityProgress: Math.round(30 + Math.random() * 50),
  };
}

export default WEEKLY_CHALLENGES;

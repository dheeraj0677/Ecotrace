import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Footprint from '../models/Footprint.js';
import Action from '../models/Action.js';
import { connectDB } from '../config/db.js';

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
  'India', 'Australia', 'Japan', 'Brazil', 'South Africa',
  'Sweden', 'Norway', 'Denmark', 'Netherlands', 'Singapore'
];

const NAMES = [
  'Emma Watson', 'Liam Neeson', 'Olivia Wilde', 'Noah Centineo', 'Ava DuVernay',
  'Elijah Wood', 'Sophia Loren', 'James Corden', 'Isabella Rossellini', 'Benjamin Bratt',
  'Mia Farrow', 'Lucas Hedges', 'Charlotte Gainsbourg', 'Mason Mount', 'Amelia Earhart',
  'Ethan Hawke', 'Harper Lee', 'Oliver Stone', 'Evelyn Waugh', 'Jacob Elordi',
  'Abigail Breslin', 'Logan Lerman', 'Emily Blunt', 'Jackson Pollock', 'Elizabeth Taylor',
  'Aiden Gallagher', 'Sofia Vergara', 'Lucas Hedges', 'Avery Singer', 'Daniel Craig',
  'Ella Purnell', 'Matthew McConaughey', 'Madison Beer', 'Henry Cavill', 'Scarlett Johansson',
  'Joseph Gordon-Levitt', 'Chloe Grace Moretz', 'Samuel L. Jackson', 'Victoria Beckham', 'David Beckham',
  'Zoe Kravitz', 'Alexander Skarsgard', 'Lily Collins', 'Ryan Reynolds', 'Blake Lively',
  'Chris Evans', 'Robert Downey Jr.', 'Mark Ruffalo', 'Tom Holland', 'Zendaya Coleman'
];

const BADGES = ['🌱', '🔥', '💪', '🚴', '💡', '🥗', '✈️', '🌲', '🏆', '⭐'];

const ACTIONS = [
  { action_id: 'led_lights', co2_saved_kg: 150 },
  { action_id: 'meatless_days', co2_saved_kg: 350 },
  { action_id: 'bike_to_work', co2_saved_kg: 800 },
  { action_id: 'public_transport', co2_saved_kg: 1200 },
  { action_id: 'cold_wash', co2_saved_kg: 75 },
  { action_id: 'compost_waste', co2_saved_kg: 110 },
  { action_id: 'low_flow_shower', co2_saved_kg: 90 },
  { action_id: 'unplug_devices', co2_saved_kg: 50 },
  { action_id: 'local_food', co2_saved_kg: 180 },
  { action_id: 'reduce_heating', co2_saved_kg: 400 },
];

async function seed() {
  try {
    await connectDB();
    console.log('🧹 Clearing existing database data...');
    await User.deleteMany({});
    await Footprint.deleteMany({});
    await Action.deleteMany({});

    console.log('👤 Hashing template password...');
    const hashedPassword = await bcrypt.hash('password123', 12);

    console.log('🌱 Creating 50 fake users...');
    const usersData = [];
    for (let i = 0; i < 50; i++) {
      const name = NAMES[i] || `Eco Warrior ${i + 1}`;
      const email = `user${i + 1}@ecotrace.org`;
      const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      const currentStreak = Math.floor(Math.random() * 15);
      const longestStreak = Math.max(currentStreak, Math.floor(Math.random() * 30));
      
      const numBadges = Math.floor(Math.random() * 4) + 1;
      const badges_earned = [];
      const shuffledBadges = [...BADGES].sort(() => 0.5 - Math.random());
      for (let b = 0; b < numBadges; b++) {
        badges_earned.push({
          badge_id: shuffledBadges[b],
          earned_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        });
      }

      usersData.push({
        name,
        email,
        password: hashedPassword,
        country,
        avatar_color: `hsl(${Math.floor(Math.random() * 360)}, 60%, 45%)`,
        streak: {
          current: currentStreak,
          longest: longestStreak,
          last_checkin: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
        },
        preferences: {
          theme: Math.random() > 0.5 ? 'dark' : 'light',
          notifications: {
            weekly_report: true,
            streak_reminder: Math.random() > 0.3
          },
          email_opt_in: true
        },
        badges_earned,
        notifications: [
          {
            icon: '🏆',
            title: 'Welcome to EcoTrace!',
            message: 'You have successfully joined the green movement.',
            read: true,
            createdAt: new Date()
          }
        ]
      });
    }

    const createdUsers = await User.insertMany(usersData);
    console.log(`✅ Seeded ${createdUsers.length} users successfully.`);

    console.log('📊 Generating footprints for seeded users...');
    const footprintsData = [];
    const actionsData = [];

    for (const user of createdUsers) {
      // Generate footprint inputs
      const total_annual_tons = parseFloat((Math.random() * 8 + 2).toFixed(1));
      const total_annual_kg = Math.round(total_annual_tons * 1000);
      const home_energy = Math.round(total_annual_kg * 0.3);
      const transport = Math.round(total_annual_kg * 0.25);
      const flights = Math.round(total_annual_kg * 0.15);
      const food = Math.round(total_annual_kg * 0.2);
      const lifestyle = total_annual_kg - (home_energy + transport + flights + food);

      const grade = total_annual_tons < 3.0 ? 'A' : total_annual_tons < 5.0 ? 'B' : total_annual_tons < 7.0 ? 'C' : total_annual_tons < 9.0 ? 'D' : 'F';
      const label = total_annual_tons < 3.0 ? 'Eco Champion' : total_annual_tons < 5.0 ? 'Eco Friendly' : total_annual_tons < 7.0 ? 'Moderate Impact' : 'High Impact';

      footprintsData.push({
        user_id: user._id,
        submitted_at: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000),
        inputs: {
          electricity: 200, gas: 50, carMileage: 5000, diet: 'vegetarian'
        },
        results: {
          total_annual_tons,
          total_annual_kg,
          breakdown: {
            home_energy,
            transport,
            flights,
            food,
            lifestyle
          },
          grade,
          label,
          percentile: Math.floor(Math.random() * 100),
          trees_needed: Math.round(total_annual_tons * 48),
          country: user.country,
          national_average: 6.2,
          world_average: 4.7,
          paris_target: 2.0
        }
      });

      // Pledges
      const numPledges = Math.floor(Math.random() * 4) + 1;
      const shuffledActions = [...ACTIONS].sort(() => 0.5 - Math.random());
      for (let a = 0; a < numPledges; a++) {
        actionsData.push({
          user_id: user._id,
          action_id: shuffledActions[a].action_id,
          co2_saved_kg: shuffledActions[a].co2_saved_kg,
          pledged_at: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
          completed: Math.random() > 0.4,
          completed_at: Math.random() > 0.4 ? new Date() : null
        });
      }
    }

    await Footprint.insertMany(footprintsData);
    console.log(`✅ Seeded footprints for users.`);

    await Action.insertMany(actionsData);
    console.log(`✅ Seeded action pledges.`);

    console.log('🎉 Seeding successfully completed! Close the script.');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    mongoose.connection.close();
  }
}

seed();

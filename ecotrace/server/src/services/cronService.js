import cron from 'node-cron';
import User from '../models/User.js';
import Action from '../models/Action.js';
import { sendEmail } from '../config/email.js';
import { weeklyTemplate } from '../templates/weekly.js';

export function startCronJobs() {
  console.log('⏰ Initializing EcoTrace Cron Jobs...');

  // 1. Weekly Report (Sunday at 9:00 AM)
  cron.schedule('0 9 * * 0', async () => {
    console.log('⏰ Running weekly report cron job...');
    try {
      const users = await User.find({ 'preferences.notifications.weekly_report': true });
      for (const user of users) {
        // Find total CO2 saved from completed pledges
        const completedActions = await Action.find({ user_id: user._id, completed: true });
        const totalSavedKg = completedActions.reduce((sum, a) => sum + (a.co2_saved_kg || 0), 0);
        const pledgesCount = await Action.countDocuments({ user_id: user._id, completed: false });

        const stats = {
          currentStreak: user.streak.current,
          totalSavedKg,
          pledgesCount,
          badgesCount: user.badges_earned.length
        };

        await sendEmail({
          to: user.email,
          subject: 'Your Weekly EcoTrace Summary 🌿',
          html: weeklyTemplate(user.name, stats),
        });
      }
    } catch (err) {
      console.error('Weekly report cron failed:', err);
    }
  });

  // 2. Daily Streak Reminder (Daily at 6:00 PM)
  cron.schedule('0 18 * * *', async () => {
    console.log('⏰ Running daily streak reminder cron job...');
    try {
      const users = await User.find({
        'preferences.notifications.streak_reminder': true,
        'streak.current': { $gt: 0 },
      });

      const now = new Date();
      for (const user of users) {
        if (user.streak.last_checkin) {
          const hoursSinceCheckin = (now - new Date(user.streak.last_checkin)) / (1000 * 60 * 60);
          // If checkin was more than 24 hours ago, remind them
          if (hoursSinceCheckin >= 24) {
            await sendEmail({
              to: user.email,
              subject: 'Don\'t lose your EcoTrace streak! 🔥',
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg">
                  <h2 style="color: #2d9e6b;">EcoTrace Streak Reminder</h2>
                  <p>Hi ${user.name},</p>
                  <p>You have a <strong>${user.streak.current}-day streak</strong> going! Don't let it reset.</p>
                  <p>Log back in and complete your daily check-in to keep the momentum going.</p>
                  <br/>
                  <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard" style="background-color: #2d9e6b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Check In Now</a>
                </div>
              `,
            });
          }
        }
      }
    } catch (err) {
      console.error('Streak reminder cron failed:', err);
    }
  });
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDashboardStore = create(
  persist(
    (set, get) => ({
      pledgedActions: [],
      articlesRead: [],
      streak: { current: 0, longest: 0, lastCheckin: null },
      notifications: [],

      // Pledges
      pledgeAction: (actionId, co2Saved) => {
        const { pledgedActions } = get();
        if (pledgedActions.find((p) => p.actionId === actionId)) return;
        set({
          pledgedActions: [
            ...pledgedActions,
            { actionId, co2Saved, pledgedAt: new Date().toISOString() },
          ],
        });
      },

      unpledgeAction: (actionId) => {
        set((state) => ({
          pledgedActions: state.pledgedActions.filter((p) => p.actionId !== actionId),
        }));
      },

      isPledged: (actionId) => {
        return get().pledgedActions.some((p) => p.actionId === actionId);
      },

      getTotalCO2Saved: () => {
        return get().pledgedActions.reduce((sum, p) => sum + (p.co2Saved || 0), 0);
      },

      getPledgesByCategory: () => {
        const { pledgedActions } = get();
        const byCategory = {};
        for (const pledge of pledgedActions) {
          // This would need action data to determine category
          // For now, we track count
          byCategory[pledge.actionId] = (byCategory[pledge.actionId] || 0) + 1;
        }
        return byCategory;
      },

      // Articles
      markArticleRead: (articleId) => {
        const { articlesRead } = get();
        if (!articlesRead.includes(articleId)) {
          set({ articlesRead: [...articlesRead, articleId] });
        }
      },

      isArticleRead: (articleId) => {
        return get().articlesRead.includes(articleId);
      },

      // Streak
      checkIn: () => {
        const { streak } = get();
        const now = new Date();
        const lastCheckin = streak.lastCheckin ? new Date(streak.lastCheckin) : null;

        let newCurrent = 1;
        if (lastCheckin) {
          const diffHours = (now - lastCheckin) / (1000 * 60 * 60);
          if (diffHours < 24) return streak; // Already checked in today
          if (diffHours < 48) {
            newCurrent = streak.current + 1;
          }
        }

        const newStreak = {
          current: newCurrent,
          longest: Math.max(streak.longest, newCurrent),
          lastCheckin: now.toISOString(),
        };
        set({ streak: newStreak });
        return newStreak;
      },

      // Notifications
      addNotification: (notification) => {
        set((state) => ({
          notifications: [
            { id: Date.now(), read: false, createdAt: new Date().toISOString(), ...notification },
            ...state.notifications,
          ].slice(0, 50),
        }));
      },

      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },

      // User stats for badge checking
      getUserStats: () => {
        const state = get();
        const pledgesByCat = {};
        // Simple category mapping from action IDs
        for (const p of state.pledgedActions) {
          const cat = p.category || 'general';
          pledgesByCat[cat] = (pledgesByCat[cat] || 0) + 1;
        }
        return {
          total_co2_saved: state.pledgedActions.reduce((s, p) => s + (p.co2Saved || 0), 0),
          pledges_count: state.pledgedActions.length,
          pledges_by_category: pledgesByCat,
          articles_read: state.articlesRead.length,
          current_streak: state.streak.current,
          longest_streak: state.streak.longest,
        };
      },
    }),
    {
      name: 'ecotrace-dashboard',
    }
  )
);

export default useDashboardStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
        localStorage.setItem('ecotrace_token', token);
        set({ token });
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const res = await api.post('/auth/register', data);
          const { user, accessToken } = res.data.data;
          localStorage.setItem('ecotrace_token', accessToken);
          set({ user, token: accessToken, isAuthenticated: true, isLoading: false });
          toast.success('Welcome to EcoTrace! 🌱');
          return true;
        } catch (err) {
          set({ isLoading: false });
          toast.error(err.response?.data?.message || 'Registration failed');
          return false;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await api.post('/auth/login', { email, password });
          const { user, accessToken } = res.data.data;
          localStorage.setItem('ecotrace_token', accessToken);
          set({ user, token: accessToken, isAuthenticated: true, isLoading: false });
          toast.success(`Welcome back, ${user.name}! 🌿`);
          return true;
        } catch (err) {
          set({ isLoading: false });
          toast.error(err.response?.data?.message || 'Login failed');
          return false;
        }
      },

      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (e) {
          // ignore
        }
        localStorage.removeItem('ecotrace_token');
        set({ user: null, token: null, isAuthenticated: false });
        toast.success('Logged out successfully');
      },

      updateProfile: async (data) => {
        try {
          const res = await api.put('/user/profile', data);
          set({ user: res.data.data });
          toast.success('Profile updated');
        } catch (err) {
          toast.error('Failed to update profile');
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem('ecotrace_token');
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }
        try {
          const res = await api.get('/user/profile');
          set({ user: res.data.data, isAuthenticated: true, token });
        } catch {
          set({ isAuthenticated: false, user: null, token: null });
          localStorage.removeItem('ecotrace_token');
        }
      },

      // Demo mode for when backend is not available
      loginDemo: (name = 'Demo User') => {
        const demoUser = {
          _id: 'demo_user_001',
          name,
          email: 'demo@ecotrace.app',
          country: 'US',
          avatar_color: '#52b788',
          streak: { current: 5, longest: 12, last_checkin: new Date().toISOString() },
          preferences: { theme: 'light', notifications: { weekly_report: true, streak_reminder: true } },
          badges_earned: [
            { badge_id: 'first_step', earned_at: new Date().toISOString() },
          ],
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
        set({ user: demoUser, isAuthenticated: true, token: 'demo_token' });
        toast.success(`Welcome, ${name}! 🌱 (Demo Mode)`);
      },
    }),
    {
      name: 'ecotrace-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUiStore = create(
  persist(
    (set, get) => ({
      darkMode: false,
      sidebarOpen: false,
      mobileMenuOpen: false,
      showOnboarding: true,
      activeModal: null,
      modalData: null,

      toggleDarkMode: () => {
        const newMode = !get().darkMode;
        set({ darkMode: newMode });
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setDarkMode: (enabled) => {
        set({ darkMode: enabled });
        if (enabled) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      initDarkMode: () => {
        const { darkMode } = get();
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      completeOnboarding: () => set({ showOnboarding: false }),

      openModal: (name, data = null) => set({ activeModal: name, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),
    }),
    {
      name: 'ecotrace-ui',
      partialize: (state) => ({
        darkMode: state.darkMode,
        showOnboarding: state.showOnboarding,
      }),
    }
  )
);

export default useUiStore;

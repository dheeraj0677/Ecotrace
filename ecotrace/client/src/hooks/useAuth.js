import useAuthStore from '@/store/authStore';

export default function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout, register, loginDemo, updateProfile, checkAuth } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    loginDemo,
    updateProfile,
    checkAuth,
    userName: user?.name || 'Guest',
    userInitials: user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'G',
    avatarColor: user?.avatar_color || '#52b788',
  };
}

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Leaf, LogOut, User, Bell } from 'lucide-react';
import useUiStore from '@/store/uiStore';
import useAuthStore from '@/store/authStore';
import useDashboardStore from '@/store/dashboardStore';
import Button from '@/components/ui/Button';
import NotificationDropdown from '@/components/shared/NotificationDropdown';

const navLinks = [
  { path: '/calculate', label: 'Calculator' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/actions', label: 'Actions' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/learn', label: 'Learn' },
  { path: '/offset', label: 'Offset' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { darkMode, toggleDarkMode, mobileMenuOpen, setMobileMenuOpen } = useUiStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { streak, getUnreadCount } = useDashboardStore();
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = getUnreadCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-forest-900/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Leaf className="w-7 h-7 text-forest-500" />
              </motion.div>
              <span className="text-xl font-bold font-display text-gray-900 dark:text-dark-text">
                Eco<span className="text-forest-500">Trace</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${location.pathname === link.path
                      ? 'text-forest-600 bg-forest-50 dark:text-forest-300 dark:bg-forest-900/30'
                      : 'text-gray-600 hover:text-forest-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-forest-300 dark:hover:bg-forest-900/20'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Streak */}
              {isAuthenticated && streak.current > 0 && (
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-semibold">
                  🔥 {streak.current}
                </div>
              )}

              {/* Notifications */}
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-900/30 transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <NotificationDropdown onClose={() => setShowNotifications(false)} />
                  )}
                </div>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-900/30 transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-warn-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-forest-900/20 transition-colors"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: user?.avatar_color || '#52b788' }}
                    >
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-900/30 transition-colors text-gray-500"
                    aria-label="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Log in</Button>
                  </Link>
                  <Link to="/calculate">
                    <Button size="sm">Start Free</Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-900/30 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-forest-900/50 shadow-lg lg:hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-forest-600 bg-forest-50 dark:text-forest-300 dark:bg-forest-900/30'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-forest-900/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 dark:border-forest-900/50">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-forest-900/20">
                      <User className="w-4 h-4 inline mr-2" /> Profile
                    </Link>
                    <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-danger-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <LogOut className="w-4 h-4 inline mr-2" /> Log out
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1"><Button variant="secondary" size="sm" className="w-full">Log in</Button></Link>
                    <Link to="/calculate" className="flex-1"><Button size="sm" className="w-full">Start Free</Button></Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

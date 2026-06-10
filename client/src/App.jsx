import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { PageLoader } from '@/components/ui/Loader';
import useUiStore from '@/store/uiStore';
import OnboardingModal from '@/components/shared/OnboardingModal';

// Lazy-load pages for code splitting
const Landing = lazy(() => import('@/pages/Landing'));
const Calculator = lazy(() => import('@/pages/Calculator'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Actions = lazy(() => import('@/pages/Actions'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const Learn = lazy(() => import('@/pages/Learn'));
const OffsetMarket = lazy(() => import('@/pages/OffsetMarket'));
const Profile = lazy(() => import('@/pages/Profile'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const PublicScore = lazy(() => import('@/pages/PublicScore'));
const Compare = lazy(() => import('@/pages/Compare'));

import ProtectedRoute from '@/components/layout/ProtectedRoute';
import BackgroundDecorations from '@/components/shared/BackgroundDecorations';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

function PageWrapper({ children }) {
  return (
    <motion.div {...pageTransition}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const { initDarkMode, showOnboarding, completeOnboarding } = useUiStore();

  useEffect(() => {
    initDarkMode();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen flex flex-col bg-sand-50 dark:bg-dark-bg transition-colors duration-300">
        <BackgroundDecorations />
        <Navbar />
        <main className="flex-1 pt-16">
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
                <Route path="/calculate" element={<PageWrapper><Calculator /></PageWrapper>} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
                <Route path="/actions" element={<ProtectedRoute><PageWrapper><Actions /></PageWrapper></ProtectedRoute>} />
                <Route path="/leaderboard" element={<ProtectedRoute><PageWrapper><Leaderboard /></PageWrapper></ProtectedRoute>} />
                <Route path="/offset" element={<ProtectedRoute><PageWrapper><OffsetMarket /></PageWrapper></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>} />
                <Route path="/compare" element={<ProtectedRoute><PageWrapper><Compare /></PageWrapper></ProtectedRoute>} />
                
                {/* Public Routes */}
                <Route path="/learn" element={<PageWrapper><Learn /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                <Route path="/score/:userId" element={<PageWrapper><PublicScore /></PageWrapper>} />
                <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        {!isAuthPage && <Footer />}
        {showOnboarding && <OnboardingModal onComplete={completeOnboarding} />}
      </div>
    </ErrorBoundary>
  );
}

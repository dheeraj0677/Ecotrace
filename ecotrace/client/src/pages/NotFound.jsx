import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
          className="text-8xl mb-6">
          🌿
        </motion.div>
        <h1 className="text-6xl font-black font-display text-gray-200 dark:text-forest-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text mb-2">Page not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          This page seems to have been offset out of existence. Let's get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/"><Button icon={Home}>Go Home</Button></Link>
          <Link to="/calculate"><Button variant="secondary" icon={Search}>Calculate Footprint</Button></Link>
        </div>
      </motion.div>
    </div>
  );
}

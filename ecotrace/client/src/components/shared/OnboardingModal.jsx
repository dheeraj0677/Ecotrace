import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ChevronRight, Leaf, BarChart3, Target, X } from 'lucide-react';

const steps = [
  {
    icon: Leaf,
    title: 'Welcome to EcoTrace 🌱',
    description: 'Track, reduce, and offset your carbon footprint with personalized insights powered by real IPCC data.',
    color: 'from-forest-400 to-forest-600',
  },
  {
    icon: BarChart3,
    title: 'Know Your Impact',
    description: 'Answer 5 simple questions about your lifestyle and we\'ll calculate your annual carbon footprint with scientific precision.',
    color: 'from-sky-400 to-sky-600',
  },
  {
    icon: Target,
    title: 'Take Action',
    description: 'Get personalized tips, join challenges, track your streak, and see how you compare globally. Every action counts!',
    color: 'from-forest-500 to-sky-500',
  },
];

export default function OnboardingModal({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-white dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          aria-label="Skip onboarding"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <div className={`bg-gradient-to-br ${steps[currentStep].color} p-10 text-center`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center"
              >
                {(() => {
                  const Icon = steps[currentStep].icon;
                  return <Icon className="w-10 h-10 text-white" />;
                })()}
              </motion.div>
              <h2 className="text-2xl font-bold text-white font-display mb-2">
                {steps[currentStep].title}
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed mb-6">
                {steps[currentStep].description}
              </p>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentStep ? 'w-6 bg-forest-500' : 'bg-gray-200 dark:bg-forest-900'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="w-full"
                iconRight={currentStep < steps.length - 1 ? ChevronRight : undefined}
              >
                {currentStep < steps.length - 1 ? 'Next' : 'Get Started! 🚀'}
              </Button>

              {currentStep < steps.length - 1 && (
                <button
                  onClick={onComplete}
                  className="w-full mt-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 py-2"
                >
                  Skip tour
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

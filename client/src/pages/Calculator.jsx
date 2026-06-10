import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCalculator from '@/hooks/useCalculator';
import StepHome from '@/components/calculator/StepHome';
import StepTransport from '@/components/calculator/StepTransport';
import StepFlights from '@/components/calculator/StepFlights';
import StepFood from '@/components/calculator/StepFood';
import StepLifestyle from '@/components/calculator/StepLifestyle';
import LivePreview from '@/components/calculator/LivePreview';
import Button from '@/components/ui/Button';
import { GradeBadge } from '@/components/ui/Badge';
import { ChevronLeft, ChevronRight, Check, Share2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fireBigConfetti } from '@/components/shared/ConfettiBlast';
import { getGradeForTons } from '@/utils/gradeSystem';
import { generateInsights } from '@/utils/insightEngine';
import { getTopActions } from '@/utils/insightEngine';
import { ACTIONS } from '@/data/actions';
import useDashboardStore from '@/store/dashboardStore';

const stepComponents = [StepHome, StepTransport, StepFlights, StepFood, StepLifestyle];

export default function Calculator() {
  const { currentStep, setStep, nextStep, prevStep, calculate, result, stepLabels, isFirstStep, isLastStep, isComplete, liveResult, inputs, resetCalculator } = useCalculator();
  const { pledgeAction, isPledged } = useDashboardStore();

  const handleCalculate = () => {
    const res = calculate();
    if (res.grade === 'A' || res.grade === 'B') {
      setTimeout(() => fireBigConfetti(), 300);
    }
  };

  const topActions = useMemo(() => {
    if (!result) return [];
    return getTopActions(result, ACTIONS);
  }, [result]);

  const insights = useMemo(() => {
    if (!result) return [];
    return generateInsights(result);
  }, [result]);

  if (isComplete && result) {
    const gradeInfo = getGradeForTons(result.total_annual_tons);
    return (
      <div className="min-h-screen py-12">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 15 }} className="text-center mb-8">
            <motion.div initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', delay: 0.2, damping: 10 }}
              className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center text-7xl font-black font-display mb-4 shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${gradeInfo.hex}22, ${gradeInfo.hex}44)`, color: gradeInfo.hex, border: `3px solid ${gradeInfo.hex}66` }}
            >
              {gradeInfo.letter}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-dark-text mb-2">Your Carbon Footprint</h1>
              <p className="text-5xl font-bold gradient-text mb-2">{result.total_annual_tons} tons</p>
              <p className="text-gray-500 dark:text-gray-400">CO₂e per year · {gradeInfo.label}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">🌳 You need {result.trees_needed.toLocaleString()} trees to offset this</p>
            </motion.div>
          </motion.div>

          {/* Top 3 Actions — peak motivation moment */}
          {topActions.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4 text-center">
                ✨ Your top 3 actions to cut your footprint in half
              </h2>
              <div className="space-y-3">
                {topActions.map((action, i) => (
                  <motion.div key={action.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.15 }}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-forest-900/50 shadow-sm"
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-dark-text text-sm">{action.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-forest-500 font-bold">-{action.co2_saved_kg} kg/yr</p>
                      <Button size="sm" variant={isPledged(action.id) ? 'ghost' : 'primary'}
                        onClick={() => !isPledged(action.id) && pledgeAction(action.id, action.co2_saved_kg)}
                        className="mt-1"
                      >
                        {isPledged(action.id) ? '✓ Pledged' : 'Pledge'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Insights */}
          {insights.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-4 text-center">💡 Key Insights</h2>
              <div className="grid gap-3">
                {insights.map((insight, i) => (
                  <div key={insight.id} className="p-4 bg-forest-50/50 dark:bg-forest-900/20 rounded-xl border border-forest-100 dark:border-forest-800">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{insight.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-dark-text text-sm">{insight.headline}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insight.tip}</p>
                        <p className="text-xs text-forest-600 dark:text-forest-400 font-medium mt-1">💚 {insight.savings}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard"><Button icon={BarChart3} size="lg">View Full Dashboard</Button></Link>
            <Button variant="secondary" size="lg" onClick={resetCalculator}>Recalculate</Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-3">
            {stepLabels.map((label, i) => (
              <button key={i} onClick={() => i <= currentStep && setStep(i)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  i < currentStep ? 'text-forest-500' : i === currentStep ? 'text-forest-600 dark:text-forest-400' : 'text-gray-400 dark:text-gray-500'
                } ${i <= currentStep ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  i < currentStep ? 'bg-forest-500 border-forest-500 text-white' :
                  i === currentStep ? 'border-forest-500 text-forest-500 dark:border-forest-400 dark:text-forest-400' :
                  'border-gray-300 text-gray-400 dark:border-gray-600'
                }`}>
                  {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${((currentStep + 1) / 5) * 100}%` }} transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-forest-400 to-forest-600 rounded-full"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <StepComponent />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button variant="secondary" onClick={prevStep} disabled={isFirstStep} icon={ChevronLeft}>
                Back
              </Button>
              {isLastStep ? (
                <Button onClick={handleCalculate} size="lg" icon={Check}>
                  Calculate My Footprint
                </Button>
              ) : (
                <Button onClick={nextStep} iconRight={ChevronRight}>
                  Next
                </Button>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <LivePreview result={liveResult} />
            </div>
          </div>
        </div>

        {/* Mobile Live Preview */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-forest-900/50 p-3 shadow-2xl z-30">
          <div className="flex items-center justify-between container-custom">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Live estimate</p>
              <p className="text-lg font-bold text-forest-600 dark:text-forest-400">{liveResult.total_annual_tons} t/yr</p>
            </div>
            <GradeBadge grade={liveResult.grade} />
          </div>
        </div>
      </div>
    </div>
  );
}

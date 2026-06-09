import { useMemo } from 'react';
import useCalculatorStore from '@/store/calculatorStore';

export default function useCalculator() {
  const store = useCalculatorStore();

  const liveResult = useMemo(() => {
    return store.getLiveResult();
  }, [store.inputs]);

  return {
    ...store,
    liveResult,
    stepLabels: ['Home Energy', 'Transport', 'Flights', 'Food', 'Lifestyle'],
    totalSteps: 5,
    isFirstStep: store.currentStep === 0,
    isLastStep: store.currentStep === 4,
    isComplete: store.currentStep === 5,
  };
}

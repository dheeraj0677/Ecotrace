import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateFootprint } from '@/utils/carbonCalculator';

const defaultInputs = {
  country: 'WORLD',
  electricity_kwh: 300,
  renewable_percent: 20,
  gas_m3: 50,
  home_size: 'medium',
  people_in_home: 2,
  car_type: 'petrol_car',
  car_km_weekly: 150,
  public_transit_km_weekly: 30,
  cycling_walking_percent: 10,
  domestic_flights: 2,
  short_haul_flights: 1,
  long_haul_flights: 0,
  diet: 'omnivore',
  food_waste: 'medium',
  local_food_percent: 20,
  meals_out_weekly: 3,
  online_orders_monthly: 5,
  new_clothing_yearly: 20,
  new_electronics_yearly: 2,
  streaming_hours_daily: 3,
  waste_kg_monthly: 30,
  recycling_percent: 30,
};

const useCalculatorStore = create(
  persist(
    (set, get) => ({
      currentStep: 0,
      inputs: { ...defaultInputs },
      result: null,
      history: [],
      isCalculating: false,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

      updateInput: (key, value) => {
        set((state) => ({
          inputs: { ...state.inputs, [key]: value },
        }));
      },

      updateInputs: (updates) => {
        set((state) => ({
          inputs: { ...state.inputs, ...updates },
        }));
      },

      getLiveResult: () => {
        const { inputs } = get();
        return calculateFootprint(inputs);
      },

      calculate: () => {
        set({ isCalculating: true });
        const { inputs, history } = get();
        const result = calculateFootprint(inputs);
        const entry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          inputs: { ...inputs },
          ...result,
        };
        set({
          result: entry,
          history: [entry, ...history].slice(0, 50),
          isCalculating: false,
          currentStep: 5,
        });
        return entry;
      },

      resetCalculator: () => {
        set({
          currentStep: 0,
          inputs: { ...defaultInputs },
          result: null,
        });
      },

      deleteHistoryEntry: (id) => {
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        }));
      },

      getLatestResult: () => {
        const { history } = get();
        return history[0] || null;
      },
    }),
    {
      name: 'ecotrace-calculator',
      partialize: (state) => ({
        inputs: state.inputs,
        history: state.history,
        currentStep: state.currentStep,
      }),
    }
  )
);

export default useCalculatorStore;

import useCalculatorStore from '@/store/calculatorStore';
import { Minus, Plus } from 'lucide-react';

function Counter({ label, value, onChange, max, avgDistance, icon }) {
  return (
    <div className="p-4 bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-forest-900/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900 dark:text-dark-text text-sm">{icon} {label}</p>
          <p className="text-xs text-gray-400 mt-0.5">~{avgDistance}km avg per flight</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onChange(Math.max(0, value - 1))}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-forest-900/30 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-forest-900/50 transition-colors"
            aria-label={`Decrease ${label}`}>
            <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="text-xl font-bold text-forest-600 dark:text-forest-400 w-8 text-center tabular-nums">{value}</span>
          <button onClick={() => onChange(Math.min(max, value + 1))}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-forest-900/30 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-forest-900/50 transition-colors"
            aria-label={`Increase ${label}`}>
            <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      {value > 0 && (
        <p className="text-xs text-forest-500 mt-2">
          ≈ {Math.round(value * avgDistance * (label.includes('Domestic') ? 0.255 : label.includes('Short') ? 0.195 : 0.147))} kg CO₂/year
        </p>
      )}
    </div>
  );
}

export default function StepFlights() {
  const { inputs, updateInput } = useCalculatorStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text mb-1">✈️ Flights</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">How often do you fly?</p>
      </div>

      <div className="space-y-3">
        <Counter label="Domestic flights / year" value={inputs.domestic_flights}
          onChange={(v) => updateInput('domestic_flights', v)} max={20} avgDistance={800} icon="🛩️" />
        <Counter label="Short-haul international / year" value={inputs.short_haul_flights}
          onChange={(v) => updateInput('short_haul_flights', v)} max={20} avgDistance={2500} icon="✈️" />
        <Counter label="Long-haul international / year" value={inputs.long_haul_flights}
          onChange={(v) => updateInput('long_haul_flights', v)} max={10} avgDistance={8000} icon="🌍" />
      </div>

      <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-100 dark:border-sky-800">
        <p className="text-sm text-sky-700 dark:text-sky-300 font-medium">💡 Did you know?</p>
        <p className="text-xs text-sky-600 dark:text-sky-400 mt-1">
          One long-haul round-trip flight (16,000km) produces about 2.4 tonnes of CO₂ — that's more than the average Indian produces in an entire year.
        </p>
      </div>
    </div>
  );
}

import useCalculatorStore from '@/store/calculatorStore';

export default function StepLifestyle() {
  const { inputs, updateInput } = useCalculatorStore();

  const sliders = [
    { key: 'online_orders_monthly', label: 'Monthly online orders', value: inputs.online_orders_monthly, min: 0, max: 50, suffix: 'orders/mo', icon: '📦' },
    { key: 'new_clothing_yearly', label: 'New clothing items/year', value: inputs.new_clothing_yearly, min: 0, max: 100, suffix: 'items/yr', icon: '👕' },
    { key: 'new_electronics_yearly', label: 'New electronics/year', value: inputs.new_electronics_yearly, min: 0, max: 10, suffix: 'items/yr', icon: '📱' },
    { key: 'streaming_hours_daily', label: 'Daily streaming hours', value: inputs.streaming_hours_daily, min: 0, max: 12, suffix: 'hrs/day', icon: '📺' },
    { key: 'waste_kg_monthly', label: 'Monthly waste', value: inputs.waste_kg_monthly, min: 0, max: 100, suffix: 'kg/mo', icon: '🗑️' },
    { key: 'recycling_percent', label: 'Recycling rate', value: inputs.recycling_percent, min: 0, max: 100, suffix: '%', icon: '♻️' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text mb-1">🛍️ Lifestyle</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Shopping, streaming, and waste habits</p>
      </div>

      <div className="space-y-5">
        {sliders.map((s) => (
          <div key={s.key}>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>{s.icon} {s.label}</span>
              <span className="text-forest-500 font-bold">{s.value} {s.suffix}</span>
            </label>
            <input type="range" min={s.min} max={s.max} value={s.value}
              onChange={(e) => updateInput(s.key, Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{s.min}</span><span>{s.max} {s.suffix}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

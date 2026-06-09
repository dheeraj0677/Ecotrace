import useCalculatorStore from '@/store/calculatorStore';

const diets = [
  { id: 'vegan', label: 'Vegan', icon: '🌱', co2: '1.5 kg/day', color: 'border-forest-500 bg-forest-50 dark:bg-forest-900/30' },
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥗', co2: '2.5 kg/day', color: 'border-forest-400 bg-forest-50 dark:bg-forest-900/20' },
  { id: 'flexitarian', label: 'Flexitarian', icon: '🍽️', co2: '3.8 kg/day', color: 'border-sky-400 bg-sky-50 dark:bg-sky-900/20' },
  { id: 'omnivore', label: 'Omnivore', icon: '🥩', co2: '5.5 kg/day', color: 'border-warn-400 bg-yellow-50 dark:bg-yellow-900/20' },
  { id: 'meat_heavy', label: 'Meat Heavy', icon: '🍖', co2: '7.2 kg/day', color: 'border-danger-400 bg-red-50 dark:bg-red-900/20' },
];

const wasteLevels = [
  { id: 'low', label: 'Low', desc: 'I rarely throw away food', icon: '✅' },
  { id: 'medium', label: 'Medium', desc: 'Some food waste weekly', icon: '⚖️' },
  { id: 'high', label: 'High', desc: 'Significant waste', icon: '⚠️' },
];

export default function StepFood() {
  const { inputs, updateInput } = useCalculatorStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text mb-1">🥗 Food</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">What does your diet look like?</p>
      </div>

      {/* Diet type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Diet type</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {diets.map((d) => (
            <button key={d.id} onClick={() => updateInput('diet', d.id)}
              className={`p-3 rounded-xl text-center border-2 transition-all ${
                inputs.diet === d.id ? d.color : 'border-gray-200 dark:border-forest-900 hover:border-forest-300'
              }`}>
              <span className="text-2xl block mb-1">{d.icon}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block">{d.label}</span>
              <span className="text-[10px] text-gray-400">{d.co2}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Food waste */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Food waste level</label>
        <div className="grid grid-cols-3 gap-2">
          {wasteLevels.map((w) => (
            <button key={w.id} onClick={() => updateInput('food_waste', w.id)}
              className={`p-3 rounded-xl text-center border-2 transition-all ${
                inputs.food_waste === w.id
                  ? 'border-forest-500 bg-forest-50 dark:bg-forest-900/30'
                  : 'border-gray-200 dark:border-forest-900 hover:border-forest-300'
              }`}>
              <span className="text-lg block">{w.icon}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block">{w.label}</span>
              <span className="text-[10px] text-gray-400">{w.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Local food */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Locally sourced food: <span className="text-forest-500 font-bold">{inputs.local_food_percent}%</span>
        </label>
        <input type="range" min="0" max="100" value={inputs.local_food_percent}
          onChange={(e) => updateInput('local_food_percent', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500" />
      </div>

      {/* Meals out */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Meals eaten out per week: <span className="text-forest-500 font-bold">{inputs.meals_out_weekly}</span>
        </label>
        <input type="range" min="0" max="21" value={inputs.meals_out_weekly}
          onChange={(e) => updateInput('meals_out_weekly', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500" />
      </div>
    </div>
  );
}

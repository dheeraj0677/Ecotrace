import useCalculatorStore from '@/store/calculatorStore';
import { COUNTRIES } from '@/data/countries';

export default function StepHome() {
  const { inputs, updateInput } = useCalculatorStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text mb-1">🏠 Home Energy</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Tell us about your home energy usage</p>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country / Region</label>
        <select value={inputs.country} onChange={(e) => updateInput('country', e.target.value)}
          className="input-field" id="country-select">
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
          ))}
        </select>
      </div>

      {/* Electricity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Monthly electricity usage: <span className="text-forest-500 font-bold">{inputs.electricity_kwh} kWh</span>
        </label>
        <input type="range" min="0" max="1000" step="10" value={inputs.electricity_kwh}
          onChange={(e) => updateInput('electricity_kwh', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500"
          id="electricity-slider" />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0 kWh</span><span>1000 kWh</span></div>
      </div>

      {/* Renewable */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Renewable energy: <span className="text-forest-500 font-bold">{inputs.renewable_percent}%</span>
        </label>
        <input type="range" min="0" max="100" value={inputs.renewable_percent}
          onChange={(e) => updateInput('renewable_percent', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500"
          id="renewable-slider" />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0%</span><span>100%</span></div>
      </div>

      {/* Gas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Monthly gas/heating: <span className="text-forest-500 font-bold">{inputs.gas_m3} m³</span>
        </label>
        <input type="range" min="0" max="200" step="5" value={inputs.gas_m3}
          onChange={(e) => updateInput('gas_m3', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500"
          id="gas-slider" />
      </div>

      {/* Home size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Home size</label>
        <div className="grid grid-cols-5 gap-2">
          {['apartment', 'small', 'medium', 'large', 'mansion'].map((size) => (
            <button key={size} onClick={() => updateInput('home_size', size)}
              className={`p-2 rounded-xl text-xs font-medium border-2 transition-all capitalize ${
                inputs.home_size === size
                  ? 'border-forest-500 bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-300'
                  : 'border-gray-200 dark:border-forest-900 text-gray-600 dark:text-gray-400 hover:border-forest-300'
              }`}>
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* People */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          People sharing home: <span className="text-forest-500 font-bold">{inputs.people_in_home}</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <button key={n} onClick={() => updateInput('people_in_home', n)}
              className={`w-10 h-10 rounded-xl font-medium text-sm transition-all ${
                inputs.people_in_home === n
                  ? 'bg-forest-500 text-white'
                  : 'bg-gray-100 dark:bg-forest-900/30 text-gray-600 dark:text-gray-400 hover:bg-forest-100'
              }`}>
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

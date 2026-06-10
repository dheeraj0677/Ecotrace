import useCalculatorStore from '@/store/calculatorStore';

const carTypes = [
  { id: 'none', label: 'No Car', icon: '🚶', emission: '0' },
  { id: 'petrol_car', label: 'Petrol', icon: '⛽', emission: '192g/km' },
  { id: 'diesel_car', label: 'Diesel', icon: '🛢️', emission: '171g/km' },
  { id: 'hybrid', label: 'Hybrid', icon: '🔋', emission: '105g/km' },
  { id: 'electric_car', label: 'Electric', icon: '⚡', emission: '53g/km' },
];

export default function StepTransport() {
  const { inputs, updateInput } = useCalculatorStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text mb-1">🚗 Transport</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">How do you get around?</p>
      </div>

      {/* Car type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary vehicle</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {carTypes.map((car) => (
            <button key={car.id} onClick={() => updateInput('car_type', car.id)}
              className={`p-3 rounded-xl text-center border-2 transition-all ${
                inputs.car_type === car.id
                  ? 'border-forest-500 bg-forest-50 dark:bg-forest-900/30'
                  : 'border-gray-200 dark:border-forest-900 hover:border-forest-300'
              }`}>
              <span className="text-xl block mb-1">{car.icon}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block">{car.label}</span>
              <span className="text-[10px] text-gray-400">{car.emission}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly km */}
      {inputs.car_type !== 'none' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Weekly km driven: <span className="text-forest-500 font-bold">{inputs.car_km_weekly} km</span>
          </label>
          <input type="range" min="0" max="1000" step="10" value={inputs.car_km_weekly}
            onChange={(e) => updateInput('car_km_weekly', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0 km</span><span>1000 km</span></div>
        </div>
      )}

      {/* Public transit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Weekly public transit: <span className="text-forest-500 font-bold">{inputs.public_transit_km_weekly} km</span>
        </label>
        <input type="range" min="0" max="200" step="5" value={inputs.public_transit_km_weekly}
          onChange={(e) => updateInput('public_transit_km_weekly', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500" />
      </div>

      {/* Cycling/walking */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cycling/walking for short trips: <span className="text-forest-500 font-bold">{inputs.cycling_walking_percent}%</span>
        </label>
        <input type="range" min="0" max="100" value={inputs.cycling_walking_percent}
          onChange={(e) => updateInput('cycling_walking_percent', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-forest-900/40 rounded-lg appearance-none cursor-pointer accent-forest-500" />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0% 🚗</span><span>100% 🚲</span></div>
      </div>
    </div>
  );
}

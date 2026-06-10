export const COUNTRIES = [
  { code: 'US', name: 'United States', gridKey: 'grid_us', flag: '🇺🇸', avg: 15.5 },
  { code: 'IN', name: 'India', gridKey: 'grid_india', flag: '🇮🇳', avg: 1.9 },
  { code: 'CN', name: 'China', gridKey: 'grid_china', flag: '🇨🇳', avg: 7.4 },
  { code: 'GB', name: 'United Kingdom', gridKey: 'grid_uk', flag: '🇬🇧', avg: 5.5 },
  { code: 'DE', name: 'Germany', gridKey: 'grid_germany', flag: '🇩🇪', avg: 8.1 },
  { code: 'FR', name: 'France', gridKey: 'grid_france', flag: '🇫🇷', avg: 4.6 },
  { code: 'JP', name: 'Japan', gridKey: 'grid_japan', flag: '🇯🇵', avg: 8.7 },
  { code: 'BR', name: 'Brazil', gridKey: 'grid_brazil', flag: '🇧🇷', avg: 2.3 },
  { code: 'AU', name: 'Australia', gridKey: 'grid_australia', flag: '🇦🇺', avg: 15.4 },
  { code: 'CA', name: 'Canada', gridKey: 'grid_canada', flag: '🇨🇦', avg: 14.2 },
  { code: 'KR', name: 'South Korea', gridKey: 'grid_south_korea', flag: '🇰🇷', avg: 11.6 },
  { code: 'MX', name: 'Mexico', gridKey: 'grid_mexico', flag: '🇲🇽', avg: 3.6 },
  { code: 'ZA', name: 'South Africa', gridKey: 'grid_south_africa', flag: '🇿🇦', avg: 7.4 },
  { code: 'RU', name: 'Russia', gridKey: 'grid_world_avg', flag: '🇷🇺', avg: 11.4 },
  { code: 'ID', name: 'Indonesia', gridKey: 'grid_world_avg', flag: '🇮🇩', avg: 2.0 },
  { code: 'EU', name: 'European Union (avg)', gridKey: 'grid_eu', flag: '🇪🇺', avg: 6.4 },
  { code: 'SE', name: 'Sweden', gridKey: 'grid_eu', flag: '🇸🇪', avg: 3.5 },
  { code: 'NO', name: 'Norway', gridKey: 'grid_eu', flag: '🇳🇴', avg: 7.1 },
  { code: 'NZ', name: 'New Zealand', gridKey: 'grid_australia', flag: '🇳🇿', avg: 6.2 },
  { code: 'WORLD', name: 'Global Average', gridKey: 'grid_world_avg', flag: '🌍', avg: 4.7 },
];

export function getCountryByCode(code) {
  return COUNTRIES.find((c) => c.code === code) || COUNTRIES[COUNTRIES.length - 1];
}

export function getGridKeyForCountry(code) {
  const country = getCountryByCode(code);
  return country?.gridKey || 'grid_world_avg';
}

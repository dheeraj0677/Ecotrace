export const GRADES = {
  A: {
    letter: 'A',
    label: 'Excellent',
    color: 'forest-500',
    bgClass: 'grade-a',
    hex: '#2d9e6b',
    darkHex: '#52b788',
    range: '0–2 tons',
    description: 'Outstanding! You\'re well below the global average.',
    emoji: '🌟',
  },
  B: {
    letter: 'B',
    label: 'Good',
    color: 'sky-600',
    bgClass: 'grade-b',
    hex: '#0096c7',
    darkHex: '#4cc9f0',
    range: '2–4 tons',
    description: 'Great job! You\'re below the global average.',
    emoji: '👍',
  },
  C: {
    letter: 'C',
    label: 'Average',
    color: 'warn-600',
    bgClass: 'grade-c',
    hex: '#d97706',
    darkHex: '#fbbf24',
    range: '4–6 tons',
    description: 'You\'re around the global average. Room for improvement.',
    emoji: '📊',
  },
  D: {
    letter: 'D',
    label: 'High',
    color: 'orange-500',
    bgClass: 'grade-d',
    hex: '#f97316',
    darkHex: '#fb923c',
    range: '6–8 tons',
    description: 'Above average. Consider reducing your footprint.',
    emoji: '⚠️',
  },
  F: {
    letter: 'F',
    label: 'Critical',
    color: 'danger-600',
    bgClass: 'grade-f',
    hex: '#dc2626',
    darkHex: '#f87171',
    range: '8+ tons',
    description: 'Well above average. Significant changes needed.',
    emoji: '🔴',
  },
};

export function getGradeInfo(grade) {
  return GRADES[grade] || GRADES.C;
}

export function getGradeForTons(tons) {
  if (tons <= 2) return GRADES.A;
  if (tons <= 4) return GRADES.B;
  if (tons <= 6) return GRADES.C;
  if (tons <= 8) return GRADES.D;
  return GRADES.F;
}

export function getGradeColor(grade, isDark = false) {
  const info = GRADES[grade];
  return isDark ? info?.darkHex : info?.hex;
}

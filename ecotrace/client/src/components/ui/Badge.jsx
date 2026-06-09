const badgeVariants = {
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  forest: 'bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-300',
  sky: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  warn: 'bg-yellow-50 text-warn-600 dark:bg-yellow-900/30 dark:text-warn-400',
  danger: 'bg-red-50 text-danger-600 dark:bg-red-900/30 dark:text-danger-400',
  earth: 'bg-orange-50 text-earth-600 dark:bg-orange-900/30 dark:text-earth-400',
  success: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

const badgeSizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${badgeVariants[variant]} ${badgeSizes[size]} ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}

export function GradeBadge({ grade, size = 'lg' }) {
  const gradeMap = {
    A: { variant: 'forest', label: 'A' },
    B: { variant: 'sky', label: 'B' },
    C: { variant: 'warn', label: 'C' },
    D: { variant: 'earth', label: 'D' },
    F: { variant: 'danger', label: 'F' },
  };
  const info = gradeMap[grade] || gradeMap.C;
  return (
    <Badge variant={info.variant} size={size} className="font-bold">
      Grade {info.label}
    </Badge>
  );
}

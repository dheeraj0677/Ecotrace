export function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  return (
    <div className={`${sizes[size]} ${className}`} role="status" aria-label="Loading">
      <svg className="animate-spin text-forest-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  );
}

export function Skeleton({ className = '', variant = 'rect' }) {
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  };
  return (
    <div className={`animate-shimmer ${variants[variant]} ${className}`} aria-hidden="true" />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-forest-200 dark:border-forest-800" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-forest-500 animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-xl">🌿</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 border border-gray-100 dark:border-forest-900/50">
      <Skeleton className="w-3/4 h-5 mb-3" />
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-5/6 h-4 mb-4" />
      <Skeleton className="w-1/3 h-8" />
    </div>
  );
}

export default function Loader({ type = 'spinner', ...props }) {
  switch (type) {
    case 'spinner': return <Spinner {...props} />;
    case 'skeleton': return <Skeleton {...props} />;
    case 'page': return <PageLoader />;
    case 'card': return <CardSkeleton />;
    default: return <Spinner {...props} />;
  }
}

export const SkeletonCard = () => (
  <div className="card-depth card-hover-ring bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5">
    <div className="skeleton h-5 w-2/3 mb-3" />
    <div className="skeleton h-3 w-1/3 mb-4" />
    <div className="skeleton h-3 w-full mb-2" />
    <div className="skeleton h-3 w-5/6 mb-5" />
    <div className="flex gap-2 mb-3">
      <div className="skeleton h-5 w-16 rounded-full" />
      <div className="skeleton h-5 w-20 rounded-full" />
    </div>
    <div className="skeleton h-1.5 w-full rounded-full" />
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

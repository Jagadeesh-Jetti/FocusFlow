export const MilestonesProgress = ({ milestones }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4">
        Milestones progress
      </h2>
      {milestones.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-slate-600 italic">
          No milestones yet. Open a goal and add one to track progress.
        </p>
      ) : (
        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                <span className="truncate">{m.name}</span>
                <span className="text-gray-500 dark:text-slate-500 shrink-0 ml-2">
                  {m.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-[width] duration-500 ease-out ${
                    m.progress > 0 && m.progress < 100
                      ? 'progress-shimmer'
                      : ''
                  }`}
                  style={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

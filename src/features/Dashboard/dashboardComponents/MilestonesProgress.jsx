export const MilestonesProgress = ({ milestones }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Milestones progress
      </h2>
      {milestones.length === 0 ? (
        <p className="text-sm text-gray-400 italic">
          No milestones yet. Open a goal and add one to track progress.
        </p>
      ) : (
        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span className="truncate">{m.name}</span>
                <span className="text-gray-500 shrink-0 ml-2">
                  {m.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all"
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

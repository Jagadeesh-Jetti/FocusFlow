export const MilestonesProgress = ({ milestones }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        MIlestones Progress
      </h2>
      <div className="space-y-5">
        {milestones.map((m, idx) => (
          <div key={idx}>
            <div className="flex m-1 justify-between text-md font-medium text-gray-600">
              <span>{m.name}</span>
              <span>{m.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className={`h-2 rounded-full ${
                  m.progress > 80
                    ? 'bg-green-500'
                    : m.progress > 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${m.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

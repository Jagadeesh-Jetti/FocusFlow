export const MilestoneFilters = ({ goals, filterMilestonesByGoals }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select
        name="goals filter"
        onChange={(e) => filterMilestonesByGoals(e)}
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        aria-label="Filter by goal"
      >
        <option value="all">All goals</option>
        {goals?.length > 0 ? (
          goals.map((goal) => (
            <option key={goal._id} value={goal._id}>
              {goal.title}
            </option>
          ))
        ) : (
          <option disabled>No goals available</option>
        )}
      </select>
    </div>
  );
};

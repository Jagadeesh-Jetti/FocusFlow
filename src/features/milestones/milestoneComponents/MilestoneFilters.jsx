export const MilestoneFilters = ({ goals, filterMilestonesByGoals }) => {
  return (
    <div className="flex px-3 justify-center">
      <div className="">
        <select
          name="goals filter"
          onChange={(e) => filterMilestonesByGoals(e)}
          className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="all">All Goals</option>
          {goals?.length > 0 ? (
            goals?.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal.title}
              </option>
            ))
          ) : (
            <option disabled>No goals available</option>
          )}
        </select>
      </div>
    </div>
  );
};

export const GoalFilters = ({
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="m-2 flex gap-2 justify-center">
      <div>
        <select
          name="priority"
          id=""
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="all">All Priorities</option>
          <option value="Low"> Low </option>
          <option value="Medium"> Medium </option>
          <option value="High"> High </option>
        </select>
      </div>
      <div>
        <select
          name="status"
          id=""
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

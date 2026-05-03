const SELECT_CLASS =
  'px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500';

export const GoalFilters = ({
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select
        name="priority"
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className={SELECT_CLASS}
        aria-label="Filter by priority"
      >
        <option value="all">All priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        name="status"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className={SELECT_CLASS}
        aria-label="Filter by status"
      >
        <option value="all">All statuses</option>
        <option value="Not Started">Not started</option>
        <option value="In Progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

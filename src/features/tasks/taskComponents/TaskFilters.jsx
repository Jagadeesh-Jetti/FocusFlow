const SELECT_CLASS =
  'px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';

export const TaskFilters = ({
  selectedGoal,
  goals,
  setSelectedGoal,
  milestones,
  selectedMilestone,
  setSelectedMilestone,
  selectedPriority,
  setSelectedPriority,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select
        value={selectedGoal}
        onChange={(e) => setSelectedGoal(e.target.value)}
        className={SELECT_CLASS}
        aria-label="Filter by goal"
      >
        <option value="all">All goals</option>
        {goals?.map((goal) => (
          <option key={goal._id} value={goal.title}>
            {goal?.title}
          </option>
        ))}
      </select>

      <select
        value={selectedMilestone}
        onChange={(e) => setSelectedMilestone(e.target.value)}
        className={SELECT_CLASS}
        aria-label="Filter by milestone"
      >
        <option value="all">All milestones</option>
        {milestones.map((milestone) => (
          <option key={milestone._id} value={milestone.title}>
            {milestone.title}
          </option>
        ))}
      </select>

      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className={SELECT_CLASS}
        aria-label="Filter by priority"
      >
        <option value="all">All priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};

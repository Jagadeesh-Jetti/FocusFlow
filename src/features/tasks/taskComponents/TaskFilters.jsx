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
    <div className="ml-4 flex justify-center gap-2">
      <select
        value={selectedGoal}
        onChange={(e) => {
          console.log(e.target.value), setSelectedGoal(e.target.value);
        }}
        className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        name=""
        id=""
      >
        <option value="all"> All Goals </option>
        {goals?.map((goal) => (
          <option key={goal._id} value={goal.title}>
            {goal?.title}
          </option>
        ))}
      </select>

      <select
        value={selectedMilestone}
        onChange={(e) => {
          console.log(e.target.value), setSelectedMilestone(e.target.value);
        }}
        className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        name=""
        id=""
      >
        <option value="all">All Milestones</option>
        {milestones.map((milestone) => (
          <option key={milestone._id} value={milestone.title}>
            {milestone.title}
          </option>
        ))}
      </select>

      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        name=""
        id=""
      >
        <option value="all"> All Priorities</option>
        <option value="High"> High </option>
        <option value="Medium"> Medium </option>
        <option value="Low"> Low </option>
      </select>
    </div>
  );
};

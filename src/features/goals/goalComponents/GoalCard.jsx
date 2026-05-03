import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../../../components/ActionButton';

const priorityColor = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

const statusColor = {
  'Not Started': 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
};

const progressFor = (goal) => {
  const milestoneTasks = (goal.milestones || []).flatMap((m) => m.tasks || []);
  const total = milestoneTasks.length;
  const completed = milestoneTasks.filter(
    (t) => t.status === 'completed'
  ).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return { completed, total, pct };
};

export const GoalCard = ({ goal, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { completed, total, pct } = progressFor(goal);

  const stopAnd = (handler) => (e) => {
    e.stopPropagation();
    handler?.();
  };

  return (
    <div
      key={goal._id}
      onClick={() => navigate(`/goals/${goal._id}`)}
      className="p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white border border-gray-200"
    >
      <div className="text-xl font-semibold mb-1">{goal.title}</div>
      {goal.category && (
        <div className="text-sm text-gray-600 mb-2">{goal.category}</div>
      )}
      {goal.description && (
        <div className="text-gray-700 line-clamp-2 mb-3">
          {goal.description}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        {goal.status && (
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              statusColor[goal.status] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {goal.status}
          </span>
        )}
        {goal.priority && (
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              priorityColor[goal.priority] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {goal.priority}
          </span>
        )}
        {goal.dueDate && (
          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            Due {new Date(goal.dueDate).toLocaleDateString('en-GB')}
          </span>
        )}
      </div>

      {total > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>
              {completed} / {total} tasks
            </span>
            <span>{pct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex mt-4 gap-2">
        <ActionButton title="EDIT" onClick={stopAnd(onEdit)} color="blue" />
        <ActionButton title="DELETE" onClick={stopAnd(onDelete)} color="red" />
      </div>
    </div>
  );
};

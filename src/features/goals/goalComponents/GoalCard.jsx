import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../../../components/ActionButton';
import { goalHealth, healthToneClass } from '../../../utils/goalHealth';

const priorityColor = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

const statusColor = {
  'Not Started': 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300',
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
  const health = goalHealth(goal);

  const stopAnd = (handler) => (e) => {
    e.stopPropagation();
    handler?.();
  };

  return (
    <div
      key={goal._id}
      onClick={() => navigate(`/goals/${goal._id}`)}
      className="card-depth card-hover-ring group p-5 rounded-2xl cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-200 hover:-translate-y-0.5"
    >
      <div className="text-xl font-semibold mb-1">{goal.title}</div>
      {goal.category && (
        <div className="text-sm text-gray-600 dark:text-slate-400 mb-2">{goal.category}</div>
      )}
      {goal.description && (
        <div className="text-gray-700 dark:text-slate-300 line-clamp-2 mb-3">
          {goal.description}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        <span
          title={health.reason}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${healthToneClass(health.tone)}`}
        >
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${
              health.tone === 'emerald'
                ? 'bg-emerald-500'
                : health.tone === 'amber'
                ? 'bg-amber-500'
                : health.tone === 'red'
                ? 'bg-red-500'
                : 'bg-slate-400'
            } ${health.tone === 'amber' || health.tone === 'red' ? 'animate-pulse' : ''}`}
          />
          {health.label}
        </span>
        {goal.status && (
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              statusColor[goal.status] || 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300'
            }`}
          >
            {goal.status}
          </span>
        )}
        {goal.priority && (
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              priorityColor[goal.priority] || 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300'
            }`}
          >
            {goal.priority}
          </span>
        )}
        {goal.dueDate && (
          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300">
            Due {new Date(goal.dueDate).toLocaleDateString('en-GB')}
          </span>
        )}
      </div>

      {total > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5 tnum">
            <span>
              {completed} / {total} tasks
            </span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{pct}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-[width] duration-500 ease-out ${
                pct > 0 && pct < 100 ? 'progress-shimmer' : ''
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex mt-4 gap-1">
        <ActionButton title="Edit" onClick={stopAnd(onEdit)} color="blue" />
        <ActionButton title="Delete" onClick={stopAnd(onDelete)} color="red" />
      </div>
    </div>
  );
};

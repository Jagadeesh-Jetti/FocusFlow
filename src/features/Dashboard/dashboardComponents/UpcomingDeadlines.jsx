import { Link, useNavigate } from 'react-router-dom';

export const UpcomingDeadlines = ({ deadlines }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4">
        Upcoming deadlines
      </h2>
      {deadlines.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-slate-500">
          <p className="mb-2">Nothing due in the next few days.</p>
          <Link
            to="/tasks"
            className="text-emerald-600 hover:underline font-medium"
          >
            Add a task →
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {deadlines.map((d, idx) => {
            const canNavigate = Boolean(d.goalId);
            return (
              <li
                key={idx}
                onClick={
                  canNavigate ? () => navigate(`/goals/${d.goalId}`) : undefined
                }
                className={`flex justify-between items-center text-sm py-1.5 ${
                  canNavigate
                    ? 'cursor-pointer hover:text-emerald-700 transition-colors'
                    : ''
                }`}
              >
                <span className="text-gray-700 dark:text-slate-300 truncate">{d.title}</span>
                <span className="text-xs text-gray-500 dark:text-slate-500 shrink-0 ml-2">
                  {d.date}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

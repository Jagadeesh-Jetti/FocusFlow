import { Pencil, Trash2 } from 'lucide-react';

export const MilestoneCard = ({ milestone, onEdit, onDelete }) => {
  return (
    <div className="card-depth card-hover-ring bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 hover:border-emerald-200 hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          {milestone?.goal?.title && (
            <div className="text-xs text-gray-500 dark:text-slate-500 mb-1 truncate">
              {milestone.goal.title}
            </div>
          )}
          <h3 className="font-semibold text-gray-900 dark:text-slate-100 break-words">
            {milestone.title}
          </h3>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
          <button
            onClick={onEdit}
            aria-label="Edit milestone"
            className="p-1.5 text-gray-500 dark:text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete milestone"
            className="p-1.5 text-gray-500 dark:text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {milestone?.description && (
        <p className="text-sm text-gray-500 dark:text-slate-500 mb-3 break-words">
          {milestone.description}
        </p>
      )}

      {milestone?.targetDate && (
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300">
            Target{' '}
            {new Date(milestone.targetDate).toLocaleDateString('en-GB')}
          </span>
        </div>
      )}
    </div>
  );
};

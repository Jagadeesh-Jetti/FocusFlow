import { Check, Pencil, Trash2 } from 'lucide-react';

const priorityColor = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isCompleted = task.status === 'completed';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition group">
      <div className="flex items-start gap-3">
        <button
          onClick={onToggleComplete}
          aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition shrink-0 ${
            isCompleted
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-gray-300 hover:border-emerald-500'
          }`}
        >
          {isCompleted && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-gray-900 break-words ${
              isCompleted ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 break-words">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            {task.priority && (
              <span
                className={`px-2 py-0.5 rounded-full font-medium ${
                  priorityColor[task.priority] || 'bg-gray-100 text-gray-700'
                }`}
              >
                {task.priority}
              </span>
            )}
            {task.dueDate && (
              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                Due {new Date(task.dueDate).toLocaleDateString('en-GB')}
              </span>
            )}
            {task.goal?.title && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                {task.goal.title}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
          <button
            onClick={onEdit}
            aria-label="Edit task"
            className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete task"
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { ChevronDown, ChevronRight, Pencil, Trash2, Plus } from 'lucide-react';
import { TaskRow } from './TaskRow';

export const MilestoneSection = ({
  milestone,
  onEditMilestone,
  onDeleteMilestone,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: milestone.title,
    description: milestone.description || '',
    targetDate: milestone.targetDate
      ? milestone.targetDate.split('T')[0]
      : '',
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  const tasks = milestone.tasks || [];
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const total = tasks.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const saveEdit = () => {
    if (!editForm.title.trim()) return;
    onEditMilestone(milestone._id, editForm);
    setIsEditing(false);
  };

  const submitNewTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim() || !newTask.dueDate) {
      return;
    }
    onAddTask(milestone._id, newTask);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
    });
    setShowAddTask(false);
  };

  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-950">
        <button
          onClick={() => setIsExpanded((v) => !v)}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          className="text-gray-500 dark:text-slate-500 hover:text-gray-800 dark:text-slate-200"
        >
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              className="flex-1 px-2 py-1 border rounded text-sm"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />
            <input
              type="date"
              className="px-2 py-1 border rounded text-sm"
              value={editForm.targetDate}
              onChange={(e) =>
                setEditForm({ ...editForm, targetDate: e.target.value })
              }
            />
            <button
              onClick={saveEdit}
              className="bg-emerald-600 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 dark:text-slate-200">
                {milestone.title}
              </div>
              {milestone.description && (
                <div className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">
                  {milestone.description}
                </div>
              )}
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-slate-500">
                {milestone.targetDate && (
                  <span>
                    Target{' '}
                    {new Date(milestone.targetDate).toLocaleDateString('en-GB')}
                  </span>
                )}
                <span>
                  {completed}/{total} tasks · {pct}%
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              aria-label="Edit milestone"
              className="p-1 text-gray-500 dark:text-slate-500 hover:text-emerald-600"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteMilestone(milestone._id)}
              aria-label="Delete milestone"
              className="p-1 text-gray-500 dark:text-slate-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {isExpanded && (
        <div className="p-3 space-y-1 border-t border-gray-100 dark:border-slate-800">
          {tasks.length === 0 && !showAddTask && (
            <div className="text-sm text-gray-400 dark:text-slate-600 italic px-3 py-2">
              No tasks yet.
            </div>
          )}
          {tasks.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onUpdate={onUpdateTask}
            />
          ))}

          {showAddTask ? (
            <form
              onSubmit={submitNewTask}
              className="border border-emerald-200 bg-emerald-50/50 rounded-lg p-3 space-y-2 mt-2"
            >
              <input
                autoFocus
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
              />
              <textarea
                className="w-full px-2 py-1 border rounded text-sm"
                rows={2}
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                required
              />
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  className="px-2 py-1 border rounded text-sm"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  required
                />
                <select
                  className="px-2 py-1 border rounded text-sm"
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  type="submit"
                  className="ml-auto bg-emerald-600 text-white px-3 py-1 rounded text-sm"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddTask(true)}
              className="w-full flex items-center justify-center gap-1 mt-2 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg border border-dashed border-emerald-200"
            >
              <Plus className="w-4 h-4" /> Add task
            </button>
          )}
        </div>
      )}
    </div>
  );
};

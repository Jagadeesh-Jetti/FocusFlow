import { Trash2, Pencil, Check, X } from 'lucide-react';
import { useState } from 'react';

const priorityColor = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export const TaskRow = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
    priority: task.priority || 'medium',
  });

  const isCompleted = task.status === 'completed';

  const saveEdit = () => {
    if (!editForm.title.trim()) return;
    onUpdate(task._id, editForm);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border border-emerald-200 bg-emerald-50/50 rounded-lg p-3 space-y-2">
        <input
          className="w-full px-2 py-1 border rounded text-sm"
          value={editForm.title}
          placeholder="Title"
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
        />
        <textarea
          className="w-full px-2 py-1 border rounded text-sm"
          rows={2}
          value={editForm.description}
          placeholder="Description"
          onChange={(e) =>
            setEditForm({ ...editForm, description: e.target.value })
          }
        />
        <div className="flex gap-2">
          <input
            type="date"
            className="px-2 py-1 border rounded text-sm"
            value={editForm.dueDate}
            onChange={(e) =>
              setEditForm({ ...editForm, dueDate: e.target.value })
            }
          />
          <select
            className="px-2 py-1 border rounded text-sm"
            value={editForm.priority}
            onChange={(e) =>
              setEditForm({ ...editForm, priority: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={saveEdit}
            className="ml-auto bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 group">
      <button
        onClick={() => onToggle(task)}
        aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
          isCompleted
            ? 'bg-emerald-600 border-emerald-600 text-white'
            : 'border-gray-300 hover:border-emerald-500'
        }`}
      >
        {isCompleted && <Check className="w-3 h-3" />}
      </button>
      <div className="flex-1 min-w-0">
        <div
          className={`font-medium ${
            isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {task.title}
        </div>
        {task.description && (
          <div className="text-sm text-gray-500 mt-0.5">{task.description}</div>
        )}
        <div className="flex items-center gap-3 mt-1 text-xs">
          {task.dueDate && (
            <span className="text-gray-500">
              Due {new Date(task.dueDate).toLocaleDateString('en-GB')}
            </span>
          )}
          {task.priority && (
            <span
              className={`px-2 py-0.5 rounded-full font-medium ${
                priorityColor[task.priority] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {task.priority}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => setIsEditing(true)}
          aria-label="Edit task"
          className="p-1 text-gray-500 hover:text-emerald-600"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
          className="p-1 text-gray-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

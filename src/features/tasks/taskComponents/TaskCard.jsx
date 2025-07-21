import { ActionButton } from '../../../components/ActionButton';

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <div
      key={task._id}
      className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3 items-start">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={onToggleComplete}
            className="w-5 h-5 accent-green-600 mt-1"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            <div className="mt-3 text-sm text-gray-600">
              <div>
                <strong>Due:</strong>
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Priority:</strong>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-white text-xs font-bold ${
                    task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <ActionButton title="EDIT" onClick={onEdit} color="blue" />

          <ActionButton title="DELETE" onClick={onDelete} color="red" />
        </div>
      </div>
    </div>
  );
};

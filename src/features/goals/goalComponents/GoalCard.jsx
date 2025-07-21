import { ActionButton } from '../../../components/ActionButton';

export const GoalCard = ({ goal, onEdit, onDelete }) => {
  return (
    <div
      key={goal._id}
      className="p-4  rounded-lg shadow-sm hover:shadow-md transition"
    >
      <div className="text-xl font-semibold mb-1">{goal.title}</div>
      <div className="text-sm text-gray-600 mb-2">{goal.category}</div>
      <div className="text-gray-700">{goal.description}</div>

      <div className="flex mt-4 gap-2">
        <ActionButton title="EDIT" onClick={onEdit} color="blue" />

        <ActionButton title="DELETE" onClick={onDelete} color="red" />
      </div>
    </div>
  );
};

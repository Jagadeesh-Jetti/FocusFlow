import { ActionButton } from '../../../components/ActionButton';

export const MilestoneCard = ({ milestone, onEdit, onDelete }) => {
  return (
    <div
      key={milestone._id}
      className="flex flex-col justify-between h-full m-3 rounded-md shadow-md "
    >
      <div className="">
        <div className="text-sm  text-gray-600 p-3 bg-gray-50">
          Goal: {milestone?.goal?.title}
        </div>
        <div className="font-semibold text-xl p-3">{milestone.title}</div>
      </div>
      <div className="flex justify-between p-4 ">
        <div className="">
          <div className="text-sm text-gray-500">Due Date</div>
          <div className="font-semibold  text-gray-500 text-opacity-100">
            {new Date(milestone.targetDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
        <div className="flex m-2 gap-1">
          <ActionButton title="EDIT" onClick={onEdit} color="blue" />
          <ActionButton title="DELETE" onClick={onDelete} color="red" />
        </div>
      </div>
    </div>
  );
};

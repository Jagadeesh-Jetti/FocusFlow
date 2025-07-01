import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../components/Modal';
import { useEffect, useState } from 'react';
import {
  createMilestone,
  deleteMilestoneById,
  getMilestones,
  updateMilestoneById,
} from './milestoneThunk';
import { getGoals } from '../goals/goalThunk';

export const Milestones = () => {
  const milestones = useSelector((state) => state.milestone.milestoneList);
  const goals = useSelector((state) => state.goal.goalsList);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    targetDate: '',
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      targetDate: '',
    });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await dispatch(updateMilestoneById({ id: editId, updatedData: form }));
    } else {
      await dispatch(createMilestone(form));
    }

    dispatch(getMilestones());

    resetForm();
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteMilestoneById(id));
    await dispatch(getMilestones());
  };

  useEffect(() => {
    dispatch(getMilestones());
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-4  w-screen ">
        <div className="text-4xl m-4 font-bold">Milestones</div>

        <div className="flex justify-between px-4 ">
          <div className="text-2xl border m-2">
            <select name="goals filter" className="rounded-md w-30 m-2">
              <option value="all">All Goals</option>
              {goals?.length > 0 ? (
                goals?.map((goal) => (
                  <option key={goal._id} value={goal._id}>
                    {goal.title}
                  </option>
                ))
              ) : (
                <option disabled>No goals available</option>
              )}
            </select>
          </div>

          <button
            className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2"
            onClick={() => setShowModal(true)}
          >
            Add Milestone
          </button>

          <Modal
            isOpen={showModal}
            onClose={resetForm}
            title={isEditing ? 'Edit Milestone' : 'Add New Milestone'}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <select
                value={form.goalId}
                onChange={(e) => setForm({ ...form, goalId: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Goal</option>
                {goals?.length > 0 ? (
                  goals.map((goal) => (
                    <option key={goal._id} value={goal._id}>
                      {goal.title}
                    </option>
                  ))
                ) : (
                  <option disabled>No goals available</option>
                )}
              </select>

              <input
                type="date"
                value={form.targetDate}
                onChange={(e) =>
                  setForm({ ...form, targetDate: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save Milestone
              </button>
            </form>
          </Modal>
        </div>

        <div>
          {milestones.map((milestone) => (
            <div
              key={milestone._id}
              className="border flex justify-between p-3 m-3 rounded-md shadow-sm"
            >
              <div>
                <div className="font-semibold text-xl">{milestone.title}</div>
                <div className="text-sm text-gray-600">
                  Goal: {milestone?.goal?.title}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Due Date</div>
                <div className="font-semibold">{milestone.dueDate}</div>
              </div>
              <div className="flex">
                <div
                  className="border bg-gray-200 font-black p-1 m-2 rounded-md cursor-pointer hover:scale-110"
                  onClick={() => {
                    setIsEditing(true);
                    setEditId(milestone._id);
                    setForm({
                      title: milestone.title,
                      description: milestone.description,
                      targetDate: milestone.targetDate,
                    });
                    setShowModal(true);
                  }}
                >
                  Edit
                </div>
                <div
                  className="border bg-gray-200 font-black p-1 m-2 rounded-md cursor-pointer hover:scale-110"
                  onClick={() => deleteHandler(milestone._id)}
                >
                  Delete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

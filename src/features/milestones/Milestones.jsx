import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../components/Modal';
import { useEffect, useState } from 'react';
import { createMilestone, getMilestones } from './milestoneThunk';
import { getGoals } from '../goals/goalThunk';

export const Milestones = () => {
  const milestones = useSelector((state) => state.milestone.milestoneList);
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goal.goalsList);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    targetDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createMilestone(form));
    await dispatch(getMilestones());

    setForm({
      title: '',
      description: '',
      targetDate: '',
    });
    setShowModal(false);
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
            onClose={() => setShowModal(false)}
            title="Add New Milestone"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

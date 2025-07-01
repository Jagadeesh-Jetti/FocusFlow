import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import {
  getGoals,
  createGoal,
  deleteGoalById,
  updateGoalById,
} from './goalThunk';
import { Modal } from '../../components/Modal';

export const Goals = () => {
  const goals = useSelector((state) => state.goal.goalsList);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
  });

  const resetForm = () => {
    setForm({ title: '', description: '', category: '' });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const editHandler = (goal) => {
    setShowModal(true);
    setIsEditing(true);
    setEditId(goal._id);
    setForm({
      title: goal.title,
      description: goal.description,
      category: goal.category,
    });
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteGoalById(id));
    await dispatch(getGoals());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await dispatch(updateGoalById({ id: editId, updatedData: form }));
    } else {
      await dispatch(createGoal(form));
    }

    await dispatch(getGoals());
    resetForm();
  };

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-4 w-full">
        <div className="flex justify-between items-center">
          <div className="text-4xl font-semibold m-3">Goals</div>
          <button
            className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2"
            onClick={() => setShowModal(true)}
          >
            Add New Goal
          </button>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setIsEditing(false), setEditId(null);
            setForm({ title: '', description: '', category: '' });
          }}
          title={isEditing ? 'Edit Goal' : 'Add New Goal'}
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
              rows={4}
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save Goal
            </button>
          </form>
        </Modal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {goals?.length > 0 ? (
            goals.map((goal) => (
              <div
                key={goal._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="text-xl font-semibold mb-1">{goal.title}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {goal.category}
                </div>
                <div className="text-gray-700">{goal.description}</div>
                <div>
                  <button
                    className="bg-gray-600 text-gray-50 font-semibold  rounded-md p-2 m-2"
                    onClick={() => editHandler(goal)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gray-600 text-gray-50 font-semibold  rounded-md p-2 m-2"
                    onClick={() => deleteHandler(goal._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No goals found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

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
import axios from 'axios';

export const Goals = () => {
  const goals = useSelector((state) => state.goal.goalsList);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [aiPlan, setAiPlan] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setAiPlan(null);
    setIsSaved(false);
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

  const generateWithAI = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/goals/generate-plan',
        { goal: form.title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAiPlan(res.data);
    } catch (err) {
      console.error('AI generation failed', err);
    } finally {
      setLoading(false);
    }
  };

  const saveAIPlan = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/goals/save-ai-plan', aiPlan, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsSaved(true);
      await dispatch(getGoals());
      resetForm();
    } catch (err) {
      console.error('❌ Error saving AI Plan:', err);
    }
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
          onClose={resetForm}
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

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save Goal
              </button>
              <button
                type="button"
                disabled={!form.title || loading}
                onClick={generateWithAI}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                {loading ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>

            {aiPlan && !isSaved && (
              <div className="mt-6 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  AI-Generated Plan
                </h4>
                <div className="bg-gray-100 p-3 rounded-md">
                  <h5 className="text-md font-bold">{aiPlan.goal}</h5>
                  {aiPlan?.milestones?.map((milestone, i) => (
                    <div key={i} className="mt-2">
                      <p className="font-medium text-gray-700">
                        Milestone: {milestone.title}
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {milestone.tasks.map((task, j) => (
                          <li key={j}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={saveAIPlan}
                  className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Confirm & Save AI Plan
                </button>
              </div>
            )}
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
                {goal.milestones?.length > 0 && (
                  <div className="mt-3">
                    {goal.milestones.map((ms) => (
                      <div
                        key={ms._id}
                        className="ml-2 mt-3 border-l pl-4 border-gray-400"
                      >
                        <div className="font-medium text-blue-700">
                          📌 {ms.title}
                        </div>
                        {ms.tasks?.map((task) => (
                          <div
                            key={task._id}
                            className="ml-4 text-sm text-gray-700"
                          >
                            ▸ {task.title}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  <button
                    className="bg-gray-600 text-white font-semibold rounded-md p-2 m-2"
                    onClick={() => editHandler(goal)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gray-600 text-white font-semibold rounded-md p-2 m-2"
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

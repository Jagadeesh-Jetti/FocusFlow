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
import { AddButton } from '../../components/AddButton';
import { ActionButton } from '../../components/ActionButton';

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
        { goalTitle: form.title, goalDescription: form.description },
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
      <div className="m-4 w-screen">
        <div className="flex justify-between m-2 ">
          <div className="text-3xl font-bold m-3">GOALS</div>
          <AddButton text="ADD GOAL" setShowModal={setShowModal} />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 m-2">
          {goals?.length > 0 ? (
            goals.map((goal) => (
              <div
                key={goal._id}
                className="p-4  rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="text-xl font-semibold mb-1">{goal.title}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {goal.category}
                </div>
                <div className="text-gray-700">{goal.description}</div>

                <div className="flex mt-4 gap-2">
                  <ActionButton
                    title="EDIT"
                    onClick={() => editHandler(goal)}
                    color="blue"
                  />

                  <ActionButton
                    title="DELETE"
                    onClick={() => deleteHandler(goal._id)}
                    color="red"
                  />
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

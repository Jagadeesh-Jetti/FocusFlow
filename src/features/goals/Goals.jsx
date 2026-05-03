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
import { ConfirmDialog } from '../../components/ConfirmDialog';
import axiosInstance from '../../utils/api';

import { PageHeader } from '../../components/PageHeader';
import { GoalForm } from './goalComponents/GoalForm';
import { GoalCard } from './goalComponents/GoalCard';
import { GoalFilters } from './goalComponents/GoalFilters';

export const Goals = () => {
  const goals = useSelector((state) => state.goal.goalsList);
  const dispatch = useDispatch();
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [aiPlan, setAiPlan] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    status: '',
    priority: '',
    dueDate: '',
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category: '',
      status: '',
      priority: '',
      dueDate: '',
    });
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
      status: goal.status,
      priority: goal.priority,
      dueDate: goal.dueDate,
    });
  };

  const deleteHandler = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
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
      const res = await axiosInstance.post('/goals/generate-plan', {
        goalTitle: form.title,
        goalDescription: form.description,
      });
      setAiPlan(res.data);
    } catch (err) {
      console.error('AI generation failed', err);
    } finally {
      setLoading(false);
    }
  };

  const saveAIPlan = async () => {
    try {
      await axiosInstance.post('/goals/save-ai-plan', aiPlan);
      setIsSaved(true);
      await dispatch(getGoals());
      resetForm();
    } catch (err) {
      console.error('Error saving AI Plan:', err);
    }
  };

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-10 max-w-7xl w-full">
        <PageHeader
          title="Your goals"
          subtitle="The big things you're working toward."
          buttonLabel="Add goal"
          setShowModal={setShowModal}
        />
        <GoalFilters
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
        <Modal
          isOpen={showModal}
          onClose={resetForm}
          title={isEditing ? 'Edit goal' : 'Add a goal'}
        >
          <GoalForm
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            isSaved={isSaved}
            loading={loading}
            generateWithAI={generateWithAI}
            saveAIPlan={saveAIPlan}
            aiPlan={aiPlan}
          />
        </Modal>

        {goals?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {goals
              .filter((goal) => {
                const matchesPriority =
                  selectedPriority === 'all' ||
                  goal.priority === selectedPriority;

                const matchesStatus =
                  selectedStatus === 'all' || goal.status === selectedStatus;

                return matchesPriority && matchesStatus;
              })
              .map((goal) => (
                <GoalCard
                  key={goal._id}
                  goal={goal}
                  onEdit={() => editHandler(goal)}
                  onDelete={() => deleteHandler(goal._id)}
                />
              ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No goals yet
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Set your first goal and let AI break it into milestones and
              tasks.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-lg"
            >
              + Add your first goal
            </button>
          </div>
        )}

        <ConfirmDialog
          isOpen={!!confirmDeleteId}
          title="Delete this goal?"
          message="The goal will be permanently removed. Milestones and tasks under it will become unassigned."
          confirmLabel="Delete goal"
          destructive
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      </div>
    </div>
  );
};

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

import { PageHeader } from '../../components/PageHeader';
import { GoalForm } from './goalComponents/goalForm';
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
      <div className="flex-1 m-2 w-screen">
        <PageHeader
          title="GOALS"
          buttonLabel="ADD GOAL"
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
          title={isEditing ? 'Edit Goal' : 'Add New Goal'}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 m-2">
          {goals?.length > 0 ? (
            goals
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
              ))
          ) : (
            <div className="text-gray-500">No goals found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

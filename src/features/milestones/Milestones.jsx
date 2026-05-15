import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { useEffect, useState } from 'react';
import {
  createMilestone,
  deleteMilestoneById,
  getMilestones,
  updateMilestoneById,
} from './milestoneThunk';
import { getGoals } from '../goals/goalThunk';

import { MilestoneCard } from './milestoneComponents/MilestoneCard';
import { MilestoneForm } from './milestoneComponents/MilestoneForm';
import { PageHeader } from '../../components/PageHeader';
import { MilestoneFilters } from './milestoneComponents/MilestoneFilters';
import { SkeletonGrid } from '../../components/Skeleton';

export const Milestones = () => {
  const milestones = useSelector((state) => state.milestone.milestoneList);
  const milestonesLoading = useSelector((state) => state.milestone.loading);
  const goals = useSelector((state) => state.goal.goalsList);
  const dispatch = useDispatch();

  const [filteredMilestones, setFilteredMilestones] = useState(
    milestones || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    targetDate: '',
    goal: '',
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      targetDate: '',
      goal: '',
    });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const filterMilestonesByGoals = (e) => {
    const selectedGoalId = e.target.value;

    if (selectedGoalId === 'all') {
      setFilteredMilestones(milestones);
    } else {
      const filtered = milestones.filter(
        (m) => m.goal && m.goal._id === selectedGoalId
      );
      setFilteredMilestones(filtered);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await dispatch(updateMilestoneById({ id: editId, updatedData: form }));
    } else {
      await dispatch(createMilestone(form));
    }

    await dispatch(getMilestones());

    resetForm();
  };

  const deleteHandler = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
    await dispatch(deleteMilestoneById(id));
    await dispatch(getMilestones());
  };

  useEffect(() => {
    dispatch(getMilestones());
    dispatch(getGoals());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMilestones(milestones);
  }, [milestones]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 p-4 md:p-10 max-w-7xl w-full">
        <PageHeader
          title="Milestones"
          subtitle="Bite-size checkpoints between you and the goal."
          buttonLabel="Add milestone"
          setShowModal={setShowModal}
        />

        <MilestoneFilters
          goals={goals}
          filterMilestonesByGoals={filterMilestonesByGoals}
        />

        <Modal
          isOpen={showModal}
          onClose={resetForm}
          title={isEditing ? 'Edit milestone' : 'Add a milestone'}
        >
          <MilestoneForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            goals={goals}
          />
        </Modal>

        {milestonesLoading && filteredMilestones.length === 0 ? (
          <SkeletonGrid count={6} />
        ) : filteredMilestones.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMilestones.map((milestone) => (
              <MilestoneCard
                key={milestone._id}
                milestone={milestone}
                onEdit={() => {
                  setIsEditing(true);
                  setEditId(milestone._id);
                  setForm({
                    title: milestone?.title,
                    description: milestone?.description,
                    targetDate: milestone?.targetDate?.split('T')[0],
                    goal: milestone.goal?._id || '',
                  });
                  setShowModal(true);
                }}
                onDelete={() => deleteHandler(milestone._id)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 dark:border-slate-600 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-2">
              No milestones yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">
              Milestones help you break a goal into manageable chunks.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-lg"
            >
              + Add a milestone
            </button>
          </div>
        )}

        <ConfirmDialog
          isOpen={!!confirmDeleteId}
          title="Delete this milestone?"
          message="Tasks under it will become unassigned, not deleted."
          confirmLabel="Delete milestone"
          destructive
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      </div>
    </div>
  );
};

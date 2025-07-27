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

import { MilestoneCard } from './milestoneComponents/MilestoneCard';
import { MilestoneForm } from './milestoneComponents/MilestoneForm';
import { PageHeader } from '../../components/PageHeader';
import { MilestoneFilters } from './milestoneComponents/MilestoneFilters';

export const Milestones = () => {
  const milestones = useSelector((state) => state.milestone.milestoneList);
  const goals = useSelector((state) => state.goal.goalsList);
  const dispatch = useDispatch();

  const [filteredMilestones, setFilteredMilestones] = useState(
    milestones || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const deleteHandler = async (id) => {
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
    <div className="flex">
      <Sidebar />
      <div className="m-2 w-screen ">
        <PageHeader
          title="MILESTONES"
          buttonLabel="ADD MILESTONE"
          setShowModal={setShowModal}
        />

        <div className="flex  px-3 ">
          <div className="text-xl shadow-md m-2 ">
            <select
              name="goals filter"
              className="rounded-md w-25 m-2 cursor-pointer"
              onChange={(e) => filterMilestonesByGoals(e)}
            >
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

          <div className="m-2 px-2 py-2 bg-amber-100">
            <MilestoneFilters />
          </div>

          <Modal
            isOpen={showModal}
            onClose={resetForm}
            title={isEditing ? 'Edit Milestone' : 'Add New Milestone'}
          >
            <MilestoneForm
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              goals={goals}
            />
          </Modal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 m-2">
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
      </div>
    </div>
  );
};

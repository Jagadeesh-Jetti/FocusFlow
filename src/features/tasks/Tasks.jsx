import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../components/Modal';
import { Sidebar } from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import {
  createTask,
  deleteTaskById,
  getTasks,
  updateTaskById,
} from './taskThunk';
import { getMilestones } from '../milestones/milestoneThunk';
import { PageHeader } from '../../components/PageHeader';
import { TaskForm } from './taskComponents/TaskForm';
import { TaskCard } from './taskComponents/TaskCard';
import { getGoals } from '../goals/goalThunk';
import { TaskFilters } from './taskComponents/TaskFilters';

export const Tasks = () => {
  const tasks = useSelector((state) => state.task.taskList);
  const goals = useSelector((state) => state.goal.goalsList);
  const milestones = useSelector((state) => state.milestone.milestoneList);
  const dispatch = useDispatch();
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [selectedMilestone, setSelectedMilestone] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    goal: '',
    milestone: '',
    priority: 'medium',
    dueDate: '',
    status: '',
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      goal: '',
      milestone: '',
      priority: 'medium',
      dueDate: '',
      status: '',
    });
    setEditId(null);
    setIsEditing(false);
    setShowModal(false);
  };

  const editHandler = async (id, task) => {
    setShowModal(true);
    setIsEditing(true);
    setEditId(id);
    setForm({
      title: task.title,
      description: task.description,
      goal: task.goal,
      milestone: task.milestone,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status,
    });
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteTaskById(id));
    await dispatch(getTasks());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await dispatch(updateTaskById({ id: editId, updatedTask: form }));
    } else {
      await dispatch(createTask(form));
    }

    await dispatch(getTasks());

    resetForm();
  };

  const toggleCompleteHandler = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    const updatedTask = {
      ...task,
      status: newStatus,
    };

    await dispatch(updateTaskById({ id: task._id, updatedTask }));
    await dispatch(getTasks());
  };

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getMilestones());
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 md:p-10 max-w-7xl">
        <PageHeader
          title="Tasks"
          subtitle="Today's actionable steps toward your goals."
          buttonLabel="Add task"
          setShowModal={setShowModal}
        />
        <TaskFilters
          goals={goals}
          milestones={milestones}
          selectedGoal={selectedGoal}
          selectedMilestone={selectedMilestone}
          setSelectedGoal={setSelectedGoal}
          setSelectedMilestone={setSelectedMilestone}
          setSelectedPriority={setSelectedPriority}
        />
        <Modal
          isOpen={showModal}
          onClose={() => resetForm()}
          title={isEditing ? 'Edit task' : 'Add a task'}
        >
          <TaskForm
            form={form}
            setForm={setForm}
            milestones={milestones}
            goals={goals}
            handleSubmit={handleSubmit}
          />
        </Modal>
        {(() => {
          const visible = tasks.filter((task) => {
            const matchesGoal =
              selectedGoal === 'all' || task.goal?.title === selectedGoal;
            const matchesMilestone =
              selectedMilestone === 'all' ||
              task.milestone?.title === selectedMilestone;
            const matchesPriority =
              selectedPriority === 'all' ||
              task.priority?.toLowerCase() ===
                selectedPriority.toLowerCase();
            return (
              task.status !== 'completed' &&
              matchesGoal &&
              matchesMilestone &&
              matchesPriority
            );
          });
          if (visible.length === 0) {
            return (
              <div className="border border-dashed border-gray-300 rounded-2xl p-10 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No open tasks
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Either everything's done, or you haven't added any tasks
                  matching the current filters yet.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg"
                >
                  + Add a task
                </button>
              </div>
            );
          }
          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {visible.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggleComplete={() => toggleCompleteHandler(task)}
                  onEdit={() => editHandler(task._id, task)}
                  onDelete={() => deleteHandler(task._id)}
                />
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
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
import { celebrate } from '../../utils/celebrate';

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
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
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

  const deleteHandler = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setConfirmDeleteId(null);
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

    const res = await dispatch(updateTaskById({ id: task._id, updatedTask }));
    if (updateTaskById.fulfilled.match(res) && newStatus === 'completed') {
      celebrate('task');
    }
    await dispatch(getTasks());
  };

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getMilestones());
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 p-4 md:p-10 max-w-7xl w-full">
        <PageHeader
          title="Tasks"
          subtitle="Today's actionable steps toward your goals."
          buttonLabel="Add task"
          setShowModal={setShowModal}
        />
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <TaskFilters
            goals={goals}
            milestones={milestones}
            selectedGoal={selectedGoal}
            selectedMilestone={selectedMilestone}
            setSelectedGoal={setSelectedGoal}
            setSelectedMilestone={setSelectedMilestone}
            setSelectedPriority={setSelectedPriority}
          />
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 cursor-pointer select-none px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="w-4 h-4 accent-emerald-600"
            />
            Show completed
          </label>
        </div>
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
            const matchesStatus =
              showCompleted || task.status !== 'completed';
            return (
              matchesStatus &&
              matchesGoal &&
              matchesMilestone &&
              matchesPriority
            );
          });
          if (visible.length === 0) {
            return (
              <div className="border border-dashed border-gray-300 dark:border-slate-600 rounded-2xl p-10 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-2">
                  {showCompleted ? 'No tasks match' : 'No open tasks'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">
                  {showCompleted
                    ? 'Try clearing the filters above.'
                    : "Either everything's done, or you haven't added any tasks matching the current filters yet."}
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-lg"
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

        <ConfirmDialog
          isOpen={!!confirmDeleteId}
          title="Delete this task?"
          message="This action cannot be undone."
          confirmLabel="Delete task"
          destructive
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      </div>
    </div>
  );
};

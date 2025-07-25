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
import { ActionButton } from '../../components/ActionButton';
import { PageHeader } from '../../components/PageHeader';
import { TaskForm } from './taskComponents/TaskForm';
import { TaskCard } from './taskComponents/TaskCard';
import { getGoals } from '../goals/goalThunk';

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
    milestone: '',
    priority: 'medium',
    dueDate: '',
    isCompleted: false,
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      milestone: '',
      priority: 'medium',
      dueDate: '',
      isCompleted: false,
    });
    setEditId(null);
    setIsEditing(false);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();

    if (isEditing) {
      await dispatch(updateTaskById({ id: editId, updatedData: form }));
    } else {
      await dispatch(createTask(form));
    }

    await dispatch(getTasks());

    resetForm();
  };

  const editHandler = async (id, task) => {
    setShowModal(true);
    setIsEditing(true);
    setEditId(id);
    setForm({
      title: task.title,
      description: task.description,
      milestone: task.milestone,
      priority: task.priority,
      dueDate: task.dueDate,
      isCompleted: task.isCompleted,
    });
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteTaskById(id));
    await dispatch(getTasks());
  };

  const toggleCompleteHandler = async (task) => {
    const updatedTask = {
      ...task,
      isCompleted: true,
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
    <div className="flex">
      <Sidebar />
      <div className="m-2 w-screen ">
        <PageHeader
          title="TASKS"
          buttonLabel="ADD TASK"
          setShowModal={setShowModal}
        />

        <div flex flex-wrap gap-4 bg-blue-200 mb-6 px-2>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name=""
            id=""
          >
            <option value="all"> All Goals </option>
            {goals.map((goal) => (
              <option key={goal._id} value={goal.title}>
                {goal.title}
              </option>
            ))}
          </select>

          <select
            value={selectedMilestone}
            onChange={(e) => setSelectedMilestone(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name=""
            id=""
          >
            <option value="all">All Milestones</option>
            {milestones.map((milestone) => (
              <option key={milestone._id} value={milestone.title}>
                {milestone.title}
              </option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name=""
            id=""
          >
            <option value="all"> All Priorities</option>
            <option value="High"> High </option>
            <option value="Medium"> Medium </option>
            <option value="Low"> Low </option>
          </select>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => resetForm()}
          title={isEditing ? 'EDIT TASK' : 'ADD NEW TASK'}
        >
          <TaskForm
            form={form}
            setForm={setForm}
            milestones={milestones}
            handleSubmit={handleSubmit}
          />
        </Modal>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 m-4">
            {tasks
              .filter((task) => !task.isCompleted)
              .map((task) => (
                <TaskCard
                  task={task}
                  onToggleComplete={() => toggleCompleteHandler(task)}
                  onEdit={() => editHandler(task._id, task)}
                  onDelete={() => deleteHandler(task._id)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

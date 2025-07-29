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
    isCompleted: false,
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      goal: '',
      milestone: '',
      priority: 'medium',
      dueDate: '',
      isCompleted: false,
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
      isCompleted: task.isCompleted,
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
          title={isEditing ? 'EDIT TASK' : 'ADD NEW TASK'}
        >
          <TaskForm
            form={form}
            setForm={setForm}
            milestones={milestones}
            goals={goals}
            handleSubmit={handleSubmit}
          />
        </Modal>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 m-4">
          {tasks
            .filter((task) => {
              // console.log('Task:', task);
              // console.log('Task Goal:', task.goal);
              // console.log('Selected Goal:', selectedGoal);
              const matchesGoal =
                selectedGoal === 'all' || task.goal?.title === selectedGoal;

              const matchesMilestone =
                selectedMilestone === 'all' ||
                task.milestone?.title === selectedMilestone;

              const matchesPriority =
                selectedPriority === 'all' ||
                task.priority?.toLowerCase() === selectedPriority.toLowerCase();

              return (
                !task.isCompleted &&
                matchesGoal &&
                matchesMilestone &&
                matchesPriority
              );
            })
            .map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggleComplete={() => toggleCompleteHandler(task)}
                onEdit={() => editHandler(task._id, task)}
                onDelete={() => deleteHandler(task._id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

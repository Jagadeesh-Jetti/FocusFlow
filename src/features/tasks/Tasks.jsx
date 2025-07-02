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

export const Tasks = () => {
  const milestones = useSelector((state) => state.milestone.milestoneList);
  const tasks = useSelector((state) => state.task.taskList);
  console.log(milestones);
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getMilestones());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-4 w-screen">
        <div className="flex justify-between m-4">
          <div className="text-4xl m-3 font-bold"> Tasks</div>
          <button
            className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2"
            onClick={() => setShowModal(true)}
          >
            Add New Task
          </button>
        </div>
        <Modal
          isOpen={showModal}
          onClose={() => resetForm()}
          title="Add New Task"
        >
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <input
              type="text"
              name="title"
              value={form.title}
              placeholder="Task Title"
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <textarea
              name="description"
              placeholder="Task Description"
              rows={4}
              value={form.description}
              className="w-full p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <select
              name="milestone"
              className="w-full p-2 border rounded"
              required
              value={form.milestone}
              onChange={(e) => setForm({ ...form, milestone: e.target.value })}
            >
              <option value="">Select Milestone</option>
              {milestones.map((milestone) => (
                <option key={milestone._id} value={milestone._id}>
                  {milestone.title}
                </option>
              ))}
            </select>

            <select
              name="priority"
              className="w-full p-2 border rounded"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              required
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate?.split('T')[0] || ''}
              className="w-full p-2 border rounded"
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              required
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isCompleted"
                checked={form.isCompleted}
                id="isCompleted"
                className="w-5 h-5 accent-green-600"
                onChange={(e) =>
                  setForm({ ...form, isCompleted: e.target.checked })
                }
              />
              <label htmlFor="isCompleted" className="text-sm text-gray-700">
                Mark as Completed
              </label>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              Save Task
            </button>
          </form>
        </Modal>

        <div>
          {tasks?.map((task) => (
            <div className="flex gap-x-4  border m-2 p-6 w-180 rounded-md">
              <input
                type="checkbox"
                className="w-6 h-6 accent-green-600 cursor-pointer"
              />
              <div className="text-2xl">
                <div> {task.title} </div>
              </div>
              <div className="flex">
                <div
                  className="border bg-gray-200 font-black p-1 m-2 rounded-md cursor-pointer hover:scale-110"
                  onClick={() => editHandler(task._id, task)}
                >
                  Edit
                </div>
                <div
                  className="border bg-gray-200  font-black p-1 m-2 rounded-md cursor-pointer hover:scale-110"
                  onClick={() => deleteHandler(task._id)}
                >
                  Delete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
import { AddButton } from '../../components/AddButton';
import { ActionButton } from '../../components/ActionButton';

export const Tasks = () => {
  const milestones = useSelector((state) => state.milestone.milestoneList);
  const tasks = useSelector((state) => state.task.taskList);
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
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-2 w-screen ">
        <div className="flex justify-between m-2  ">
          <div className="text-3xl m-3 font-bold"> TASKS</div>
          <AddButton text="ADD TASK" setShowModal={setShowModal} />
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => resetForm()}
          title={isEditing ? 'EDIT TASK' : 'ADD NEW TASK'}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 m-4">
            {tasks
              .filter((task) => !task.isCompleted)
              .map((task) => (
                <div
                  key={task._id}
                  className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3 items-start">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => toggleCompleteHandler(task)}
                        className="w-5 h-5 accent-green-600 mt-1"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {task.description}
                        </p>
                        <div className="mt-3 text-sm text-gray-600">
                          <div>
                            <strong>Due:</strong>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div>
                            <strong>Priority:</strong>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-white text-xs font-bold ${
                                task.priority === 'high'
                                  ? 'bg-red-500'
                                  : task.priority === 'medium'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <ActionButton
                        title="EDIT"
                        onClick={() => editHandler(task._id, task)}
                        color="blue"
                      />

                      <ActionButton
                        title="DELETE"
                        onClick={() => deleteHandler(task._id)}
                        color="red"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

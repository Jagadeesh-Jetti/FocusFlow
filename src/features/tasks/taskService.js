import axios from '../../utils/api';

export const getTasksAPI = async () => {
  const response = await axios.get('/tasks');
  return response.data.tasks;
};
export const createTaskAPI = async (taskData) => {
  const response = await axios.post('/tasks', taskData);
  return response.data.task;
};

export const getTaskByIdAPI = async (id) => {
  const response = await axios.get(`/tasks/${id}`);
  return response.data.task;
};

export const updateTaskByIdAPI = async (id, updatedTask) => {
  const response = await axios.put(`/tasks/${id}`, updatedTask);
  return response.data.task;
};

export const deleteTaskByIdAPI = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data.task;
};

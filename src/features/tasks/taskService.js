import axios from '../../utils/api';

export const getTasksAPI = async () => {
  const response = await axios.get('/tasks');
  return response.data;
};
export const createTaskAPI = async (userData) => {
  const response = await axios.post('/tasks', userData);
  return response.data;
};

export const getTaskByIdAPI = async (id) => {
  const response = await axios.get(`/tasks/${id}`);
  return response.data;
};

export const updateTaskByIdAPI = async (id, updatedData) => {
  const response = await axios.put('/tasks/${id}', updatedData);
  return response.data;
};

export const deleteTaskByIdAPI = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data;
};

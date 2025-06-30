import axios from '../../utils/api';

export const getGoalsAPI = async () => {
  const response = await axios.get('/goals');
  console.log(response.data);
  return response.data.goals;
};

export const createGoalAPI = async (userData) => {
  const response = await axios.post('/goals', userData);
  return response.data.goal;
};

export const getGoalByIdAPI = async (id) => {
  const response = await axios.get(`/goals/${id}`);
  return response.data;
};

export const updateGoalByIdAPI = async (id, userData) => {
  const response = await axios.put('/goals/${id}', userData);
  return response.data;
};

export const deleteGoalByIdAPI = async (id) => {
  const response = await axios.delete(`/goals/${id}`);
  return response.data;
};

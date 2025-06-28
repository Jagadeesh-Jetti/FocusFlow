import axios from '../../utils/api';

export const getMilestonesAPI = async () => {
  const response = await axios.get('/');
  return response;
};

export const createMilestoneAPI = async (userData) => {
  const response = await axios.post('/milestones', userData);
  return response;
};

export const getMilestoneByIdAPI = async (id) => {
  const response = await axios.get(`/milestones/${id}`);
  return response;
};

export const updateMilestoneByIdAPI = async (id, userData) => {
  const response = await axios.put('/milestones/${id}', userData);
  return response;
};

export const deleteMilestoneByIdAPI = async (id) => {
  const response = await axios.delete(`/milestones/${id}`);
  return response;
};

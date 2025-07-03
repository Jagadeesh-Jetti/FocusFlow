import axios from '../../utils/api';

export const loginUserAPI = async (userData) => {
  const response = await axios.post('/auth/login', userData);
  return response.data;
};

export const registerUserAPI = async (userData) => {
  const response = await axios.post('/auth/register', userData);

  return response.data;
};

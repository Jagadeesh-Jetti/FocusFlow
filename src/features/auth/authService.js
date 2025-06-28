import axios from '../../utils/api';

export const loginUserAPI = async (userData) => {
  const response = await axios.post('/auth/login', userData);
  console.log(response);
  return response.data;
};

export const registerUserAPI = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  console.log(response);
  return response.data;
};

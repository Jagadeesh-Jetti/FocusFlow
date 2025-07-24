import axios from '../../utils/api';

export const getUserProfileAPI = async (id) => {
  const response = await axios.get(`/users/${id}/profile`);
  return response.data.user;
};

export const getAllUsersAPI = async () => {
  const response = await axios.get('/users/all');
  return response.data.users;
};

export const getFollowersAPI = async (id) => {
  const response = await axios.get(`/users/${id}/followers`);
  return response.data.followers;
};

export const getFollowingAPI = async (id) => {
  const response = await axios.get(`/users/${id}/following`);
  return response.data.following;
};

export const followUserAPI = async (id) => {
  const response = await axios.post(`/users/${id}/follow`);
  return response.data;
};

export const unfollowUserAPI = async (id) => {
  const response = await axios.post(`/users/${id}/unfollow`);
  return response.data;
};

export const updateUserProfileAPI = async (id, updatedProfile) => {
  const response = await axios.put(`/users/${id}/update`, updatedProfile);
  return response.data.updatedUser;
};

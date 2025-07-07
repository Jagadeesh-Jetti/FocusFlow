import axios from '../../utils/api';

export const getPostsAPI = async () => {
  const response = await axios.get('/posts');
  return response.data.posts;
};

export const createPostAPI = async (postData) => {
  const response = await axios.post('/posts', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.post;
};

export const getPostByIdAPI = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data.post;
};

export const toggleLikePostAPI = async (id) => {
  const response = await axios.patch(`/posts/${id}/like`);
  return response.data.post;
};

export const commentPostAPI = async (id, comment) => {
  const response = await axios.post(`/posts/${id}/comment`, { comment });
  return response.data.post;
};

export const deletePostAPI = async (id) => {
  const response = await axios.delete(`/posts/${id}`);
  return response.data.post;
};

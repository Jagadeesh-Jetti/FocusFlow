import axios from '../../utils/api';

export const getPostsAPI = async () => {
  const response = await axios.get('/posts');
  console.log('this is the getPost', response);
  return response.data.posts;
};

export const createPostAPI = async (postData) => {
  console.log(postData);
  const response = await axios.post('/posts', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('this is d response from createPost', response);
  return response.data.post;
};

export const getPostByIdAPI = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data.post;
};

export const toggleLikePostAPI = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data.post;
};

export const commentPostAPI = async (id, comment) => {
  const response = await axios.get(`/posts/${id}`, comment);
  return response.data.post;
};

export const deletePostAPI = async (id) => {
  const response = await axios.delete(`/posts/${id}`);
  return response.data.post;
};

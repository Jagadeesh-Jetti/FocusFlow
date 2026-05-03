import axios from '../../utils/api';

export const coachChatAPI = async (messages) => {
  const response = await axios.post('/coach/chat', { messages });
  return response.data;
};

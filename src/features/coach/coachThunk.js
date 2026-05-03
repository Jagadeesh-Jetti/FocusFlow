import { createAsyncThunk } from '@reduxjs/toolkit';
import { coachChatAPI } from './coachService';

export const sendCoachMessage = createAsyncThunk(
  'coach/send',
  async (userMessage, thunkAPI) => {
    const state = thunkAPI.getState();
    const history = state.coach.messages;
    const nextHistory = [
      ...history,
      { role: 'user', content: userMessage, ts: Date.now() },
    ];

    try {
      const data = await coachChatAPI(
        nextHistory.map(({ role, content }) => ({ role, content }))
      );
      return {
        nextHistory,
        assistantMessage: {
          role: 'assistant',
          content: data.reply,
          ts: Date.now(),
        },
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Coach request failed'
      );
    }
  }
);

import { createSlice } from '@reduxjs/toolkit';
import { sendCoachMessage } from './coachThunk';

const STORAGE_KEY = 'focusflow.coach.messages';

const loadMessages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveMessages = (messages) => {
  try {
    const trimmed = messages.slice(-40);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore storage errors
  }
};

const initialState = {
  messages: loadMessages(),
  loading: false,
  error: null,
};

const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    clearCoachHistory: (state) => {
      state.messages = [];
      state.error = null;
      saveMessages([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCoachMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.messages.push({
          role: 'user',
          content: action.meta.arg,
          ts: Date.now(),
        });
        saveMessages(state.messages);
      })
      .addCase(sendCoachMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload.assistantMessage);
        saveMessages(state.messages);
      })
      .addCase(sendCoachMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCoachHistory } = coachSlice.actions;
export default coachSlice.reducer;

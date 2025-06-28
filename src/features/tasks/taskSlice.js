import { createSlice } from '@reduxjs/toolkit';
import {
  createTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from './taskThunk';

const initialState = {
  task: null,
  loading: false,
  error: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addState(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addState(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
        state.error = action.payload;
      })
      .addState(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addState(createTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addState(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
        state.error = action.payload;
      })
      .addState(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addState(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addState(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
        state.error = action.payload;
      })
      .addState(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addState(updateTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addState(updateTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
        state.error = action.payload;
      })
      .addState(updateTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addState(deleteTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addState(deleteTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
        state.error = action.payload;
      })
      .addState(deleteTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;

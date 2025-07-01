import { createSlice } from '@reduxjs/toolkit';
import {
  createTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from './taskThunk';

const initialState = {
  taskList: [],
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
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = action.payload;
        state.error = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
        state.error = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
        state.error = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
        state.error = action.payload;
      })
      .addCase(updateTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
        state.error = action.payload;
      })
      .addCase(deleteTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;

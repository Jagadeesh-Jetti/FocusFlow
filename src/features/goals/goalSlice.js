import { createSlice } from '@reduxjs/toolkit';
import {
  createGoal,
  deleteGoalById,
  getGoalById,
  getGoalFull,
  getGoals,
  updateGoalById,
} from './goalThunk';

const initialState = {
  goalsList: [],
  goal: null,
  goalDetail: null,
  unassignedTasks: [],
  detailLoading: false,
  loading: false,
  error: null,
};

const applyTaskUpdate = (task, updates) =>
  task && task._id === updates._id ? { ...task, ...updates } : task;

const goalSlice = createSlice({
  name: 'goal',
  initialState,

  reducers: {
    clearGoalDetail: (state) => {
      state.goalDetail = null;
      state.unassignedTasks = [];
      state.detailLoading = false;
    },
    patchDetailTask: (state, action) => {
      const updates = action.payload;
      if (!updates || !updates._id || !state.goalDetail) return;

      state.goalDetail.milestones = state.goalDetail.milestones.map((m) => ({
        ...m,
        tasks: m.tasks.map((t) => applyTaskUpdate(t, updates)),
      }));
      state.unassignedTasks = state.unassignedTasks.map((t) =>
        applyTaskUpdate(t, updates)
      );
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goalsList = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.goal = action.payload.goal;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getGoalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGoalById.fulfilled, (state, action) => {
        state.loading = false;
        state.goal = action.payload.goal;
      })
      .addCase(getGoalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getGoalFull.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(getGoalFull.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.goalDetail = action.payload.goal;
        state.unassignedTasks = action.payload.unassignedTasks;
      })
      .addCase(getGoalFull.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
        state.goalDetail = null;
        state.unassignedTasks = [];
      })

      .addCase(updateGoalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGoalById.fulfilled, (state, action) => {
        state.loading = false;
        state.goal = action.payload.goal;
      })
      .addCase(updateGoalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteGoalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGoalById.fulfilled, (state) => {
        state.loading = false;
        state.goal = null;
      })
      .addCase(deleteGoalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGoalDetail, patchDetailTask } = goalSlice.actions;
export default goalSlice.reducer;

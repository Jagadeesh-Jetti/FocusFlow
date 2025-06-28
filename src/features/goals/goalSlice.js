import { createSlice } from '@reduxjs/toolkit';
import {
  createGoal,
  deleteGoalById,
  getGoalById,
  getGoals,
  updateGoalById,
} from './goalThunk';

const initialState = {
  goal: null,
  loading: false,
  error: null,
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(getGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goal = action.payload;
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
        state.goal = null; // goal is deleted
      })
      .addCase(deleteGoalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default goalSlice.reducer;

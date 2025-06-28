import { createSlice } from '@reduxjs/toolkit';
import {
  createMilestone,
  deleteMilestoneById,
  getMilestoneById,
  getMilestones,
  updateMilestoneById,
} from './milestoneThunk';

const initialState = {
  milestone: null,
  loading: false,
  error: null,
};

const milestoneSlice = createSlice({
  name: 'milestone',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMilestones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMilestones.fulfilled, (state, action) => {
        state.loading = false;
        state.milestone = action.payload.milestone;
        state.error = action.payload;
      })
      .addCase(getMilestones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createMilestone.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createMilestone.fulfilled, (state, action) => {
        state.loading = false;
        state.milestone = action.payload.milestone;
        state.error = action.payload;
      })
      .addCase(createMilestone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMilestoneById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMilestoneById.fulfilled, (state, action) => {
        state.loading = false;
        state.milestone = action.payload.milestone;
        state.error = action.payload;
      })
      .addCase(getMilestoneById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateMilestoneById.pending, (state, action) => {
        state.loading = true;
        state.milestone = action.payload.milestone;
        state.error = null;
      })
      .addCase(updateMilestoneById.fulfilled, (state, action) => {
        state.loading = false;
        state.milestone = action.payload.milestone;
        state.error = action.payload;
      })
      .addCase(updateMilestoneById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteMilestoneById.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(deleteMilestoneById.fulfilled, (state, action) => {
        state.loading = false;
        state.milestone = action.payload;
        state.error = action.payload;
      })
      .addCase(deleteMilestoneById.rejected, (state, action) => {
        state.loading = false;
        state.milestone = action.payload;
        state.error = action.payload;
      });
  },
});

export default milestoneSlice.reducer;

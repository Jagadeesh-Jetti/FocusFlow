import { createSlice } from '@reduxjs/toolkit';
import {
  createMilestone,
  deleteMilestoneById,
  getMilestoneById,
  getMilestones,
  updateMilestoneById,
} from './milestoneThunk';

const initialState = {
  milestoneList: [],
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
        state.milestoneList = action.payload;
        state.error = null;
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
        state.milestone = action.payload;
        state.error = null;
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
        state.milestone = action.payload;
        state.error = null;
      })
      .addCase(getMilestoneById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateMilestoneById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMilestoneById.fulfilled, (state, action) => {
        state.loading = false;
        state.milestone = action.payload;
        state.error = null;
      })
      .addCase(updateMilestoneById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteMilestoneById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMilestoneById.fulfilled, (state, action) => {
        state.loading = false;
        state.milestone = action.payload;
        state.error = null;
      })
      .addCase(deleteMilestoneById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default milestoneSlice.reducer;

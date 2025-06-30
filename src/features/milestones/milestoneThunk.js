import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createMilestoneAPI,
  deleteMilestoneByIdAPI,
  getMilestoneByIdAPI,
  getMilestonesAPI,
  updateMilestoneByIdAPI,
} from './milestoneService';

export const getMilestones = createAsyncThunk(
  'milestone/getAll',
  async (_, thunkAPI) => {
    try {
      return await getMilestonesAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Milestones retrieval failed'
      );
    }
  }
);

export const createMilestone = createAsyncThunk(
  'milestone/create',
  async (milestoneData, thunkAPI) => {
    try {
      return await createMilestoneAPI(milestoneData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Milestone creation failed'
      );
    }
  }
);

export const getMilestoneById = createAsyncThunk(
  'milestone/getById',
  async (id, thunkAPI) => {
    try {
      const data = await getMilestoneByIdAPI(id);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Milestone retrival by Id is failed'
      );
    }
  }
);

export const updateMilestoneById = createAsyncThunk(
  'milestone/updateById',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const updated = await updateMilestoneByIdAPI(id, updatedData);
      return updated;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Milestone updation by Id is failed'
      );
    }
  }
);

export const deleteMilestoneById = createAsyncThunk(
  'milestone/deleteById',
  async (id, thunkAPI) => {
    try {
      const deleted = await deleteMilestoneByIdAPI(id);
      return deleted;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Goal deletion by Id is failed'
      );
    }
  }
);

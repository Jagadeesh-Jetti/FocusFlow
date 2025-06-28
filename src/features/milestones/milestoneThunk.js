import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createMilestoneAPI,
  getMilestoneByIdAPI,
  getMilestonesAPI,
  updateMilestoneByIdAPI,
} from './milestoneService';

export const getMilestones = createAsyncThunk(
  '/milestone/create',
  async (userData, thunkAPI) => {
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
  '/milestone/create',
  async (userData, thunkAPI) => {
    try {
      return await createMilestoneAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Milestone creation failed'
      );
    }
  }
);

export const getMilestoneById = createAsyncThunk(
  '/milestone/getById',
  async (userData, thunkAPI) => {
    try {
      return await getMilestoneByIdAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Milestone retrival by Id is failed'
      );
    }
  }
);

export const updateMilestoneById = createAsyncThunk(
  '/milestone/updateById',
  async (userData, thunkAPI) => {
    try {
      return await updateMilestoneByIdAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Milestone updation by Id is failed'
      );
    }
  }
);

export const deleteMilestoneById = createAsyncThunk(
  '/milestone/deleteById',
  async (userData, thunkAPI) => {
    try {
      return await deleteMilestoneById(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Goal deletion by Id is failed'
      );
    }
  }
);

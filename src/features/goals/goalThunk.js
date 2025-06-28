import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createGoalAPI,
  deleteGoalByIdAPI,
  getGoalByIdAPI,
  getGoalsAPI,
} from './goalService';

export const getGoals = createAsyncThunk(
  'goal/getAll',
  async (userData, thunkAPI) => {
    try {
      return await getGoalsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Goals retrieval failed'
      );
    }
  }
);

export const getGoalById = createAsyncThunk(
  'goal/getById',
  async (userData, thunkAPI) => {
    try {
      return await getGoalByIdAPI(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Goal retrieval by id failed'
      );
    }
  }
);

export const createGoal = createAsyncThunk(
  '/goal/create',
  async (userData, thunkAPI) => {
    try {
      return await createGoalAPI(userData);
    } catch (err) {
      return thunkAPI.rejectedWithValue(
        err.response.data.message || 'Goal creation failed'
      );
    }
  }
);

export const updateGoalById = createAsyncThunk(
  '/goal/updatedById',
  async (userData, thunkAPI) => {
    try {
      return await updateGoalById(userData);
    } catch (err) {
      return thunkAPI.rejectedWithValue(
        err.response.data.message || 'Goal updation by id is failed'
      );
    }
  }
);

export const deleteGoalById = createAsyncThunk(
  '/goal/deleteById',
  async (userData, thunkAPI) => {
    try {
      return await deleteGoalByIdAPI(userData);
    } catch (err) {
      return thunkAPI.rejectedWithValue(
        err.response.data.message || 'Goal deletion by id is failed'
      );
    }
  }
);

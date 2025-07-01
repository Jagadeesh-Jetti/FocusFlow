import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createGoalAPI,
  deleteGoalByIdAPI,
  getGoalByIdAPI,
  getGoalsAPI,
  updateGoalByIdAPI,
} from './goalService';

export const getGoals = createAsyncThunk('goal/getAll', async (_, thunkAPI) => {
  try {
    return await getGoalsAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response.data.message || 'Goals retrieval failed'
    );
  }
});

export const createGoal = createAsyncThunk(
  'goal/create',
  async (goalData, thunkAPI) => {
    try {
      return await createGoalAPI(goalData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Goal creation failed'
      );
    }
  }
);

export const getGoalById = createAsyncThunk(
  'goal/getById',
  async (id, thunkAPI) => {
    try {
      return await getGoalByIdAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Goal retrieval by id failed'
      );
    }
  }
);

export const updateGoalById = createAsyncThunk(
  'goal/updatedById',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      return await updateGoalByIdAPI(id, updatedData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Goal updation by id is failed'
      );
    }
  }
);

export const deleteGoalById = createAsyncThunk(
  'goal/deleteById',
  async (goalData, thunkAPI) => {
    try {
      return await deleteGoalByIdAPI(goalData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Goal deletion by id is failed'
      );
    }
  }
);

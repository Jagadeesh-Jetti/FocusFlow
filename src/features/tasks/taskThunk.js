import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTaskAPI,
  deleteTaskByIdAPI,
  getTaskByIdAPI,
  getTasksAPI,
  updateTaskByIdAPI,
} from './taskService';

export const getTasks = createAsyncThunk(
  '/task/getAll',
  async (userData, thunkAPI) => {
    try {
      return await getTasksAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Tasks retrievel failed'
      );
    }
  }
);

export const createTask = createAsyncThunk(
  '/task/create',
  async (userData, thunkAPI) => {
    try {
      return await createTaskAPI(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Task creation failed'
      );
    }
  }
);

export const getTaskById = createAsyncThunk(
  '/task/getById',
  async (userData, thunkAPI) => {
    try {
      return await getTaskByIdAPI(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Task retrieval by Id is failed'
      );
    }
  }
);

export const updateTaskById = createAsyncThunk(
  '/task/update',
  async (userData, thunkAPI) => {
    try {
      return await updateTaskByIdAPI(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Task updation by Id is failed'
      );
    }
  }
);

export const deleteTaskById = createAsyncThunk(
  '/task/delete',
  async (userData, thunkAPI) => {
    try {
      return await deleteTaskByIdAPI(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Task deletion by Id is failed'
      );
    }
  }
);

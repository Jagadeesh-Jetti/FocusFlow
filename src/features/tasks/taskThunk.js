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
  async (_, thunkAPI) => {
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
  'task/create',
  async (taskData, thunkAPI) => {
    try {
      return await createTaskAPI(taskData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Task creation failed'
      );
    }
  }
);

export const getTaskById = createAsyncThunk(
  'task/getById',
  async (id, thunkAPI) => {
    try {
      return await getTaskByIdAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Task retrieval by Id is failed'
      );
    }
  }
);

export const updateTaskById = createAsyncThunk(
  'task/updateById',
  async ({ id, updatedTask }, thunkAPI) => {
    try {
      return await updateTaskByIdAPI(id, updatedTask);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Task updation by Id is failed'
      );
    }
  }
);

export const deleteTaskById = createAsyncThunk(
  'task/deleteById',
  async (id, thunkAPI) => {
    try {
      return await deleteTaskByIdAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Task deletion by Id is failed'
      );
    }
  }
);

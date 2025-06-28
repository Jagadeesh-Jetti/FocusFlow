import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI, registerUserAPI } from './authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await loginUserAPI(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Login failed'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await registerUserAPI(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Signup failed'
      );
    }
  }
);

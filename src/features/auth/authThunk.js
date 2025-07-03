import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI, registerUserAPI } from './authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await loginUserAPI(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || err.message || 'Login failed'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      console.log(userData);

      const response = await registerUserAPI(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || err.message || 'Signup failed'
      );
    }
  }
);

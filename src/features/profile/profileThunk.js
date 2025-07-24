import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  followUserAPI,
  getAllUsersAPI,
  getFollowersAPI,
  getFollowingAPI,
  getUserProfileAPI,
  unfollowUserAPI,
  updateUserProfileAPI,
} from './profileService';

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (_, thunkAPI) => {
    try {
      return await getAllUsersAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Users retrieval failed'
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'users/getUserProfile',
  async (id, thunkAPI) => {
    try {
      return await getUserProfileAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'User profile retrieval failed'
      );
    }
  }
);

export const getFollowers = createAsyncThunk(
  'users/getFollowers',
  async (id, thunkAPI) => {
    try {
      return await getFollowersAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'User followers retrieval failed'
      );
    }
  }
);

export const getFollowing = createAsyncThunk(
  'users/getFollowing',
  async (id, thunkAPI) => {
    try {
      return await getFollowingAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message ||
          'Getting the User following retieval failed'
      );
    }
  }
);

export const followUser = createAsyncThunk(
  'users/follow',
  async (id, thunkAPI) => {
    try {
      return await followUserAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.messsage || 'Following user has failed'
      );
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'users/unfollow',
  async (id, thunkAPI) => {
    try {
      return await unfollowUserAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Unfollowing user has failed'
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'users/update',
  async ({ id, updatedProfile }, thunkAPI) => {
    try {
      return await updateUserProfileAPI(id, updatedProfile);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Updating profile has failed'
      );
    }
  }
);

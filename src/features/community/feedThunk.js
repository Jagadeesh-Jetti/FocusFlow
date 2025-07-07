import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  commentPostAPI,
  createPostAPI,
  deletePostAPI,
  getPostByIdAPI,
  getPostsAPI,
  toggleLikePostAPI,
} from './feedService';

export const getPosts = createAsyncThunk('post/getAll', async (_, thunkAPI) => {
  try {
    return await getPostsAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response.data.message || 'Posts retrieval failed'
    );
  }
});

export const createPost = createAsyncThunk(
  'post/create',
  async (postData, thunkAPI) => {
    try {
      return await createPostAPI(postData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Post creation failed'
      );
    }
  }
);

export const getPostById = createAsyncThunk(
  'post/getById',
  async (id, thunkAPI) => {
    try {
      return await getPostByIdAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Post retrieval by id is failed'
      );
    }
  }
);

export const toggleLikePost = createAsyncThunk(
  'post/toggleLike',
  async (id, thunkAPI) => {
    try {
      return await toggleLikePostAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Toggle like is failed'
      );
    }
  }
);

export const commentPost = createAsyncThunk(
  'post/comment',
  async ({ id, comment }, thunkAPI) => {
    try {
      return await commentPostAPI(id, comment);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Commenting post failed'
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/delete',
  async (id, thunkAPI) => {
    try {
      return await deletePostAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || 'Deleting post failed'
      );
    }
  }
);

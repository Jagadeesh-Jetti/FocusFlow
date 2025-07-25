import { createSlice } from '@reduxjs/toolkit';
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from './profileThunk';

const initialState = {
  allUsers: [],
  profile: null,
  followers: [],
  following: [],
  status: 'idle',
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(followUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(unfollowUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getFollowers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(getFollowing.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import milestoneReducer from '../features/milestones/milestoneSlice';
import taskReducer from '../features/tasks/taskSlice';
import postReducer from '../features/community/feedSlice';
import profileReducer from '../features/profile/profileSlice';
import { toastMiddleware } from '../utils/toastMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
    milestone: milestoneReducer,
    task: taskReducer,
    post: postReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toastMiddleware),
});

export default store;

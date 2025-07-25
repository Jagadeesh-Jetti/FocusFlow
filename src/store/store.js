import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import milestoneReducer from '../features/milestones/milestoneSlice';
import taskReducer from '../features/tasks/taskSlice';
import postReducer from '../features/community/feedSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
    milestone: milestoneReducer,
    task: taskReducer,
    post: postReducer,
    profile: profileReducer,
  },
});

export default store;

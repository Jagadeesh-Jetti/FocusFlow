import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import milestoneReducer from '../features/milestones/milestoneSlice';
import taskReducer from '../features/tasks/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
    milestone: milestoneReducer,
    task: taskReducer,
  },
});

export default store;

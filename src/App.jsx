import './App.css';
import { Dashboard } from './features/Dashboard/Dashboard';
import { Signup } from './features/auth/Signup';
import { Login } from './features/auth/Login';
import { Goals } from './features/goals/Goals';
import { GoalDetail } from './features/goals/GoalDetail';
import { Milestones } from './features/milestones/Milestones';
import { Tasks } from './features/tasks/Tasks';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Profile } from './features/profile/Profile';
import { Feed } from './features/community/feed';
import { PostDetailPage } from './features/community/PostDetailPage';
import { NotFound } from './components/NotFound';
import { Landing } from './features/landing/Landing';
import { Coach } from './features/coach/Coach';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals/:id"
          element={
            <ProtectedRoute>
              <GoalDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/milestones"
          element={
            <ProtectedRoute>
              <Milestones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coach"
          element={
            <ProtectedRoute>
              <Coach />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed/:id"
          element={
            <ProtectedRoute>
              <PostDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

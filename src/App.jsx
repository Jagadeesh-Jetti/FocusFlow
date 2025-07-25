import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Signup } from './features/auth/Signup';
import { Login } from './features/auth/Login';
import { Goals } from './features/goals/Goals';
import { Milestones } from './features/milestones/Milestones';
import { Tasks } from './features/tasks/Tasks';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Profile } from './features/profile/Profile';
import { Feed } from './features/community/feed';
import { PostDetailPage } from './features/community/PostDetailPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
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
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<PostDetailPage />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

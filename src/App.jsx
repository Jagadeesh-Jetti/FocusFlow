import './App.css';
import { Dashboard } from './features/Dashboard/Dashboard';
import { Signup } from './features/auth/Signup';
import { Login } from './features/auth/Login';
import { Goals } from './features/goals/Goals';
import { GoalDetail } from './features/goals/GoalDetail';
import { Milestones } from './features/milestones/Milestones';
import { Tasks } from './features/tasks/Tasks';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AnonRoute } from './components/AnonRoute';
import { Profile } from './features/profile/Profile';
import { Feed } from './features/community/feed';
import { PostDetailPage } from './features/community/PostDetailPage';
import { NotFound } from './components/NotFound';
import { Landing } from './features/landing/Landing';
import { Coach } from './features/coach/Coach';
import { CommandPalette } from './components/CommandPalette';
import { Settings } from './features/settings/Settings';
import { Privacy, Terms } from './features/legal/Legal';
import { useSelector } from 'react-redux';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((s) => s.auth);
  return (
    <div key={location.pathname} className="fade-up">
      {isAuthenticated && <CommandPalette />}
      <Routes>
        <Route
          path="/"
          element={
            <AnonRoute>
              <Landing />
            </AnonRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AnonRoute>
              <Signup />
            </AnonRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AnonRoute>
              <Login />
            </AnonRoute>
          }
        />
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
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

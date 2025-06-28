import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Signup } from './features/auth/Signup';
import { Login } from './features/auth/Login';
import { Goals } from './features/goals/Goals';
import { Milestones } from './features/milestones/Milestones';
import { Tasks } from './features/tasks/Tasks';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;

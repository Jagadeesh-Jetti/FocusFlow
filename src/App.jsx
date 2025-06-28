import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Goals } from './pages/Goals';
import { Login } from './pages/Login';
import { Milestones } from './pages/Milestones';
import { Signup } from './pages/SIgnup';
import { Routes, Route } from 'react-router-dom';
import { Tasks } from './pages/Tasks';

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

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { getTasks } from '../tasks/taskThunk';
import { getGoals } from '../goals/goalThunk';
import { WeeklyBarChart } from './dashboardComponents/WeeklyBarChart';
import { TaskStatusPieChart } from './dashboardComponents/TaskStatusPieChart';
import { MilestonesProgress } from './dashboardComponents/MilestonesProgress';
import { UpcomingDeadlines } from './dashboardComponents/UpcomingDeadlines';
import axiosInstance from '@/utils/api';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [stats, setStats] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getGoals());
    fetchDashboardData();
  }, [dispatch]);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await axiosInstance.get('/dashboard/stats');
      const historyRes = await axiosInstance.get('/dashboard/history');
      const progressRes = await axiosInstance.get('/dashboard/progress');
      const deadlinesRes = await axiosInstance.get('/dashboard/deadlines');

      setStats(statsRes.data);
      setWeeklyData(historyRes.data);
      setMilestones(progressRes.data);
      setDeadlines(
        deadlinesRes.data.map((d) => ({
          date: new Date(d.dueDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          title: d.title,
        }))
      );
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-whitesmoke">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          👋 Welcome, {user?.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Goals" count={stats.totalGoals || 0} />
          <StatCard title="Tasks Done" count={stats.completedTasks} />
          <StatCard title="Tasks Pending" count={stats.pendingTasks} />
          <StatCard title="Goals In Progress" count={stats.activeGoals} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Weekly Task Completion
            </h2>
            <WeeklyBarChart data={weeklyData} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Task Status
            </h2>
            <TaskStatusPieChart
              completed={stats.completedTasks || 0}
              pending={stats.pendingTasks || 0}
              overdue={stats.overdueTasks || 0}
            />
          </div>
          <div>
            <MilestonesProgress milestones={milestones} />
          </div>
          <div>
            <UpcomingDeadlines deadlines={deadlines} />
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, count }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300">
    <h3 className="text-md font-semibold text-gray-500 mb-1">{title}</h3>
    <p className="text-4xl font-extrabold text-indigo-600">{count}</p>
  </div>
);

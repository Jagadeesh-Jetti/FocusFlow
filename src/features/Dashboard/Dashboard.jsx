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
          goalId: d.goal,
        }))
      );
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const firstName = user?.name?.split(' ')[0] || user?.name || '';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-10 max-w-7xl w-full">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Welcome back{firstName ? `, ${firstName}` : ''}
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Here&apos;s how your week is shaping up.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total goals" count={stats.totalGoals ?? 0} />
          <StatCard title="Tasks done" count={stats.completedTasks ?? 0} />
          <StatCard title="Tasks pending" count={stats.pendingTasks ?? 0} />
          <StatCard
            title="Goals in progress"
            count={stats.activeGoals ?? 0}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard title="Weekly task completion">
            <WeeklyBarChart data={weeklyData} />
          </DashboardCard>

          <DashboardCard title="Task status">
            <TaskStatusPieChart
              completed={stats.completedTasks || 0}
              pending={stats.pendingTasks || 0}
              overdue={stats.overdueTasks || 0}
            />
          </DashboardCard>

          <MilestonesProgress milestones={milestones} />

          <UpcomingDeadlines deadlines={deadlines} />
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, count }) => (
  <div className="card-depth bg-white rounded-2xl border border-slate-200/80 p-5 hover:-translate-y-0.5 hover:border-emerald-200">
    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.08em]">
      {title}
    </div>
    <div className="text-3xl md:text-4xl font-bold text-slate-900 mt-1.5 tnum tracking-tight">
      {count}
    </div>
  </div>
);

const DashboardCard = ({ title, children }) => (
  <div className="card-depth bg-white p-6 rounded-2xl border border-slate-200/80">
    <h2 className="text-base font-semibold text-slate-900 mb-4 tracking-tight">
      {title}
    </h2>
    {children}
  </div>
);

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { getTasks } from '../tasks/taskThunk';
import { getGoals } from '../goals/goalThunk';
import { WeeklyBarChart } from './dashboardComponents/WeeklyBarChart';
import { TaskStatusPieChart } from './dashboardComponents/TaskStatusPieChart';
import { MilestonesProgress } from './dashboardComponents/MilestonesProgress';
import { UpcomingDeadlines } from './dashboardComponents/UpcomingDeadlines';
import { Onboarding } from '../onboarding/Onboarding';
import { isOnboarded } from '../onboarding/onboardingStorage';
import axiosInstance from '@/utils/api';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const goalsList = useSelector((state) => state.goal.goalsList);

  const [stats, setStats] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getGoals());
    fetchDashboardData();
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(goalsList) && goalsList.length === 0 && !isOnboarded()) {
      const t = setTimeout(() => setShowOnboarding(true), 400);
      return () => clearTimeout(t);
    }
  }, [goalsList]);

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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-4 md:p-10 max-w-7xl w-full">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Welcome back{firstName ? `, ${firstName}` : ''}
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Here&apos;s how your week is shaping up.
            </p>
          </div>
          {stats.streakCount > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 ring-1 ring-amber-200/60 dark:ring-amber-800/60">
              <span className="text-xl">🔥</span>
              <div className="text-sm">
                <div className="font-semibold text-amber-700 dark:text-amber-300 tnum">
                  {stats.streakCount} day{stats.streakCount === 1 ? '' : 's'}
                </div>
                <div className="text-xs text-amber-600/80 dark:text-amber-400/80">
                  Don&apos;t break it.
                </div>
              </div>
            </div>
          )}
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

      <Onboarding
        open={showOnboarding}
        onDismiss={() => setShowOnboarding(false)}
        userName={firstName}
      />
    </div>
  );
};

const StatCard = ({ title, count }) => (
  <div className="card-depth card-hover-ring bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 hover:-translate-y-0.5 hover:border-emerald-200">
    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.08em]">
      {title}
    </div>
    <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mt-1.5 tnum tracking-tight">
      {count}
    </div>
  </div>
);

const DashboardCard = ({ title, children }) => (
  <div className="card-depth card-hover-ring bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
      {title}
    </h2>
    {children}
  </div>
);

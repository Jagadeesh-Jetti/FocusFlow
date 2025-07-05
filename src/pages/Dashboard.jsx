import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { getTasks } from '../features/tasks/taskThunk';
import { getGoals } from '../features/goals/goalThunk';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.taskList);
  const goals = useSelector((state) => state.goal.goalList);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getGoals());
  }, [dispatch]);

  const today = new Date().toISOString().split('T')[0];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const dueToday = tasks.filter(
    (task) => task.dueDate?.split('T')[0] === today
  );
  const upcoming = tasks.filter((task) => {
    const due = new Date(task.dueDate);
    const now = new Date();
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 3;
  });
  const inProgressGoals = goals?.filter((g) => !g.isCompleted);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          👋 Welcome, {user?.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Tasks" count={totalTasks} />
          <StatCard title="Completed" count={completedTasks} />
          <StatCard title="Pending" count={totalTasks - completedTasks} />
          <StatCard title="Goals In Progress" count={inProgressGoals?.length} />
        </div>

        <TaskSection title="🗓️ Tasks Due Today" items={dueToday} />
        <TaskSection title="⏳ Upcoming Tasks (Next 3 Days)" items={upcoming} />
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

const TaskSection = ({ title, items }) => (
  <section className="mb-8 bg-white rounded-2xl p-6 shadow-md">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    {items.length === 0 ? (
      <p className="text-gray-400 italic">Nothing scheduled 🎉</p>
    ) : (
      <ul className="space-y-2 list-disc list-inside text-gray-700">
        {items.map((item) => (
          <li key={item._id} className="font-medium">
            {item.title}
          </li>
        ))}
      </ul>
    )}
  </section>
);

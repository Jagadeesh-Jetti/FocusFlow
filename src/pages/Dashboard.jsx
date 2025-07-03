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
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name} 👋</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card title="Total Tasks" count={totalTasks} />
          <Card title="Completed" count={completedTasks} />
          <Card title="Pending" count={totalTasks - completedTasks} />
          <Card title="Goals In Progress" count={inProgressGoals?.length} />
        </div>

        <Section title="Tasks Due Today" items={dueToday} />
        <Section title="Upcoming Tasks (3 days)" items={upcoming} />
      </div>
    </div>
  );
};

const Card = ({ title, count }) => (
  <div className="bg-white shadow-md rounded-lg p-4 text-center">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

const Section = ({ title, items }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {items.length === 0 ? (
      <p className="text-gray-500">No items to show</p>
    ) : (
      <ul className="list-disc ml-5">
        {items.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    )}
  </div>
);

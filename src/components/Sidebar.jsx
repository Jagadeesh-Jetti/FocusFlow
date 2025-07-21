import {
  Home,
  Target,
  CheckCircle,
  Users,
  BarChart,
  User,
  Moon,
} from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex  flex-col justify-between h-screen w-64  text-black px-6 py-8 shadow-lg">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-yellow-400 mb-10">
          🎯 GoalDeck
        </h1>

        <nav className="space-y-2 text-base font-medium">
          <SidebarItem href="/dashboard" icon={<Home />} label="Dashboard" />
          <SidebarItem href="/goals" icon={<Target />} label="Goals" />
          <SidebarItem
            href="/milestones"
            icon={<Target />}
            label="Milestones"
          />
          <SidebarItem href="/tasks" icon={<CheckCircle />} label="Tasks" />
          <SidebarItem href="/feed" icon={<Users />} label="Circles" />
          <SidebarItem href="/progress" icon={<BarChart />} label="Progress" />
        </nav>
      </div>

      <div className="space-y-2">
        <SidebarItem href="/profile" icon={<User />} label="Profile" />
        <SidebarItem href="/mode" icon={<Moon />} label="Dark Mode" />
      </div>
    </aside>
  );
};

const SidebarItem = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-yellow-400 transition-all duration-200"
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </a>
  );
};

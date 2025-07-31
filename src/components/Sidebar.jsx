import {
  Home,
  Target,
  CheckCircle,
  Users,
  User,
  Moon,
  MapPin,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const { user } = useSelector((s) => s.auth);
  const { pathname } = useLocation();

  const menuItems = [
    { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/goals', icon: <Target />, label: 'Goals' },
    { href: '/milestones', icon: <MapPin />, label: 'Milestones' },
    { href: '/tasks', icon: <CheckCircle />, label: 'Tasks' },
    { href: '/feed', icon: <Users />, label: 'Community' },
  ];

  const bottomItems = [
    user?._id && {
      href: `/profile/${user._id}`,
      icon: <User />,
      label: 'Profile',
    },
    { href: '/mode', icon: <Moon />, label: 'Change Mood' },
  ].filter(Boolean);

  return (
    <aside className="hidden md:flex  flex-col justify-between h-screen w-64  text-black px-6 py-8 shadow-lg">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-yellow-400 mb-10">
          🎯 GoalDeck
        </h1>

        <nav className="space-y-2 text-base font-medium">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </div>

      <div className="space-y-2">
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname === item.href}
          />
        ))}
      </div>
    </aside>
  );
};

const SidebarItem = ({ href, icon, label, active }) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg  transition-all duration-200  ${
        active
          ? 'bg-gray-800 text-yellow-400'
          : 'hover:bg-gray-800 hover:text-yellow-400'
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

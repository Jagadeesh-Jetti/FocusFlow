import {
  Home,
  Target,
  CheckCircle,
  Users,
  User,
  MapPin,
  LogOut,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

export const Sidebar = () => {
  const { user } = useSelector((s) => s.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { href: '/dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { href: '/goals', icon: <Target className="w-5 h-5" />, label: 'Goals' },
    { href: '/milestones', icon: <MapPin className="w-5 h-5" />, label: 'Milestones' },
    { href: '/tasks', icon: <CheckCircle className="w-5 h-5" />, label: 'Tasks' },
    { href: '/feed', icon: <Users className="w-5 h-5" />, label: 'Community' },
  ];

  const bottomItems = [
    user?._id && {
      href: `/profile/${user._id}`,
      icon: <User className="w-5 h-5" />,
      label: 'Profile',
    },
  ].filter(Boolean);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const isActive = (href) =>
    href === '/dashboard'
      ? pathname === href
      : pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="hidden md:flex flex-col justify-between h-screen w-64 bg-white border-r border-gray-200 px-4 py-6">
      <div>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-2 mb-8"
          aria-label="FocusFlow home"
        >
          <span className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Target className="w-5 h-5" />
          </span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            FocusFlow
          </span>
        </Link>

        <nav className="space-y-1 text-sm font-medium">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={isActive(item.href)}
            />
          ))}
        </nav>
      </div>

      <div className="space-y-1 border-t border-gray-100 pt-4">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
          </div>
        )}
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            Icon={item.icon}
            label={item.label}
            active={isActive(item.href)}
          />
        ))}
        {user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

const SidebarItem = ({ href, icon, label, active }) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

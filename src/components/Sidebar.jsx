import {
  Home,
  Target,
  CheckCircle,
  Users,
  User,
  MapPin,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { Avatar } from './Avatar';

export const Sidebar = () => {
  const { user } = useSelector((s) => s.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const menuItems = [
    {
      href: '/dashboard',
      icon: <Home className="w-5 h-5" />,
      label: 'Dashboard',
    },
    {
      href: '/goals',
      icon: <Target className="w-5 h-5" />,
      label: 'Goals',
    },
    {
      href: '/milestones',
      icon: <MapPin className="w-5 h-5" />,
      label: 'Milestones',
    },
    {
      href: '/tasks',
      icon: <CheckCircle className="w-5 h-5" />,
      label: 'Tasks',
    },
    {
      href: '/feed',
      icon: <Users className="w-5 h-5" />,
      label: 'Community',
    },
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

  const SidebarContent = (
    <>
      <div>
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-2"
            aria-label="FocusFlow home"
          >
            <span className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Target className="w-5 h-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              FocusFlow
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="md:hidden p-2 text-gray-500 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
            <Avatar user={user} size="sm" />
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
            icon={item.icon}
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
    </>
  );

  return (
    <>
      <aside className="hidden md:flex flex-col justify-between h-screen sticky top-0 w-64 bg-white border-r border-gray-200 px-4 py-6">
        {SidebarContent}
      </aside>

      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <Link
          to="/dashboard"
          className="flex items-center gap-2"
          aria-label="FocusFlow home"
        >
          <span className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center">
            <Target className="w-4 h-4" />
          </span>
          <span className="text-base font-bold tracking-tight text-gray-900">
            FocusFlow
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-72 max-w-[85%] bg-white px-4 py-6 flex flex-col justify-between shadow-xl">
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

const SidebarItem = ({ href, icon, label, active }) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-emerald-50 text-emerald-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

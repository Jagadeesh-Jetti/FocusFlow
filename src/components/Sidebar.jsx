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
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { Avatar } from './Avatar';
import { useTheme } from '../hooks/useTheme';

export const Sidebar = () => {
  const { user } = useSelector((s) => s.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

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
      href: '/coach',
      icon: <Sparkles className="w-5 h-5" />,
      label: 'Coach',
      badge: 'AI',
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
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/25 ring-1 ring-inset ring-white/20">
              <Target className="w-5 h-5" strokeWidth={2.25} />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              FocusFlow
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="md:hidden p-2 text-gray-500 dark:text-slate-500 hover:text-gray-900 dark:hover:text-slate-100"
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
              badge={item.badge}
              active={isActive(item.href)}
            />
          ))}
        </nav>
      </div>

      <div className="space-y-1 border-t border-gray-100 dark:border-slate-800 pt-4">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <Avatar user={user} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-slate-500 truncate">{user.email}</div>
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
        <button
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>
        {user && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
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
      <aside className="hidden md:flex flex-col justify-between h-screen sticky top-0 w-64 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800/80 px-4 py-6">
        {SidebarContent}
      </aside>

      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80">
        <Link
          to="/dashboard"
          className="flex items-center gap-2"
          aria-label="FocusFlow home"
        >
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-sm ring-1 ring-inset ring-white/20">
            <Target className="w-4 h-4" strokeWidth={2.25} />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
            FocusFlow
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 rounded-md transition-colors active:scale-95"
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
          <aside className="relative h-full w-72 max-w-[85%] bg-white dark:bg-slate-900 px-4 py-6 flex flex-col justify-between shadow-xl">
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

const SidebarItem = ({ href, icon, label, badge, active }) => {
  return (
    <Link
      to={href}
      className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
        active
          ? 'bg-emerald-50 text-emerald-700'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100'
      }`}
    >
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-gradient-to-b from-emerald-500 to-teal-600"
        />
      )}
      <span
        className={`transition-transform duration-150 ${
          active ? '' : 'group-hover:scale-110'
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            active
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
};

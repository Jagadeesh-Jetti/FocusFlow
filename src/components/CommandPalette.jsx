import { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Target,
  CheckCircle,
  MapPin,
  Users,
  User,
  Home,
  Sparkles,
  Plus,
  ArrowRight,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react';
import { logout } from '../features/auth/authSlice';
import { useTheme } from '../hooks/useTheme';

const NAV_ITEMS = [
  { id: 'nav-dashboard', label: 'Go to Dashboard', icon: Home, to: '/dashboard', group: 'Navigate' },
  { id: 'nav-goals', label: 'Go to Goals', icon: Target, to: '/goals', group: 'Navigate' },
  { id: 'nav-tasks', label: 'Go to Tasks', icon: CheckCircle, to: '/tasks', group: 'Navigate' },
  { id: 'nav-milestones', label: 'Go to Milestones', icon: MapPin, to: '/milestones', group: 'Navigate' },
  { id: 'nav-coach', label: 'Open AI Coach', icon: Sparkles, to: '/coach', group: 'Navigate' },
  { id: 'nav-feed', label: 'Open Community', icon: Users, to: '/feed', group: 'Navigate' },
];

const ACTION_ITEMS = [
  { id: 'new-goal', label: 'New goal', icon: Plus, to: '/goals?new=1', group: 'Quick actions' },
  { id: 'new-task', label: 'New task', icon: Plus, to: '/tasks?new=1', group: 'Quick actions' },
  { id: 'new-milestone', label: 'New milestone', icon: Plus, to: '/milestones?new=1', group: 'Quick actions' },
  { id: 'ask-coach', label: 'Ask the Coach…', icon: Sparkles, to: '/coach', group: 'Quick actions' },
];

const score = (q, text) => {
  if (!q) return 1;
  const lq = q.toLowerCase();
  const lt = (text || '').toLowerCase();
  if (lt.startsWith(lq)) return 3;
  if (lt.includes(lq)) return 2;
  // fuzzy: every char in q appears in lt in order
  let i = 0;
  for (const c of lt) {
    if (c === lq[i]) i++;
    if (i === lq.length) return 1;
  }
  return 0;
};

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggle: toggleTheme } = useTheme();

  const goals = useSelector((s) => s.goal.goalsList) || [];
  const tasks = useSelector((s) => s.task?.taskList) || [];
  const milestones = useSelector((s) => s.milestone?.milestoneList) || [];
  const user = useSelector((s) => s.auth.user);

  // Global hotkey
  useEffect(() => {
    const handler = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      } else if (
        e.key === '/' &&
        !open &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) &&
        !document.activeElement?.isContentEditable
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const dataItems = useMemo(() => {
    const items = [];
    for (const g of goals.slice(0, 50)) {
      items.push({
        id: `goal-${g._id}`,
        label: g.title,
        sub: g.category || 'Goal',
        icon: Target,
        to: `/goals/${g._id}`,
        group: 'Goals',
      });
    }
    for (const m of milestones.slice(0, 50)) {
      items.push({
        id: `ms-${m._id}`,
        label: m.title,
        sub: m.goal?.title ? `Milestone of ${m.goal.title}` : 'Milestone',
        icon: MapPin,
        to: m.goal?._id ? `/goals/${m.goal._id}` : '/milestones',
        group: 'Milestones',
      });
    }
    for (const t of tasks.slice(0, 100)) {
      items.push({
        id: `task-${t._id}`,
        label: t.title,
        sub: t.goal?.title ? `Task in ${t.goal.title}` : 'Task',
        icon: CheckCircle,
        to: t.goal?._id ? `/goals/${t.goal._id}` : '/tasks',
        group: 'Tasks',
      });
    }
    return items;
  }, [goals, milestones, tasks]);

  const systemItems = useMemo(() => {
    const items = [
      {
        id: 'toggle-theme',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        icon: theme === 'dark' ? Sun : Moon,
        action: () => toggleTheme(),
        group: 'Settings',
      },
    ];
    if (user?._id) {
      items.push({
        id: 'view-profile',
        label: 'Open your profile',
        icon: User,
        to: `/profile/${user._id}`,
        group: 'Settings',
      });
    }
    items.push({
      id: 'log-out',
      label: 'Log out',
      icon: LogOut,
      action: () => {
        dispatch(logout());
        navigate('/login', { replace: true });
      },
      group: 'Settings',
    });
    return items;
  }, [theme, user, toggleTheme, dispatch, navigate]);

  const allItems = useMemo(
    () => [...ACTION_ITEMS, ...NAV_ITEMS, ...dataItems, ...systemItems],
    [dataItems, systemItems]
  );

  const filtered = useMemo(() => {
    const q = query.trim();
    const scored = allItems
      .map((it) => ({
        ...it,
        _score: Math.max(score(q, it.label), score(q, it.sub) * 0.8),
      }))
      .filter((it) => it._score > 0)
      .sort((a, b) => b._score - a._score);
    return scored.slice(0, 30);
  }, [query, allItems]);

  // Group results for display while preserving order
  const grouped = useMemo(() => {
    const map = new Map();
    for (const it of filtered) {
      if (!map.has(it.group)) map.set(it.group, []);
      map.get(it.group).push(it);
    }
    return Array.from(map.entries());
  }, [filtered]);

  // Flat index for keyboard nav
  const flat = useMemo(() => grouped.flatMap(([, items]) => items), [grouped]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx, open]);

  const select = (item) => {
    if (!item) return;
    setOpen(false);
    if (item.action) item.action();
    else if (item.to) navigate(item.to);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      select(flat[activeIdx]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[10vh] bg-slate-900/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="fade-up w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl ring-1 ring-slate-200/60 dark:ring-slate-800/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search goals, tasks, milestones, actions…"
            className="flex-1 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none text-slate-900 dark:text-slate-100"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            esc
          </kbd>
        </div>

        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto py-2"
          role="listbox"
        >
          {grouped.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-slate-500">
              No matches. Try a different search.
            </div>
          ) : (
            (() => {
              let idx = -1;
              return grouped.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <div className="px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {group}
                  </div>
                  {items.map((it) => {
                    idx += 1;
                    const Icon = it.icon || ArrowRight;
                    const active = idx === activeIdx;
                    return (
                      <button
                        key={it.id}
                        data-idx={idx}
                        role="option"
                        aria-selected={active}
                        onClick={() => select(it)}
                        onMouseEnter={() => setActiveIdx(idx)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          active
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-200'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="flex-1 text-left truncate">
                          {it.label}
                        </span>
                        {it.sub && (
                          <span className="text-xs text-slate-400 truncate max-w-[40%]">
                            {it.sub}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ));
            })()
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-2 text-[11px] text-slate-500 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">↑↓</kbd>
              navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">↵</kbd>
              select
            </span>
          </div>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">⌘K</kbd>
            to toggle
          </span>
        </div>
      </div>
    </div>
  );
};

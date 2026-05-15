import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  Download,
  Trash2,
  User as UserIcon,
  Palette,
  Database,
  ShieldAlert,
} from 'lucide-react';
import { Sidebar } from '../../components/Sidebar';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { useTheme } from '../../hooks/useTheme';
import { logout } from '../auth/authSlice';
import axiosInstance from '../../utils/api';
import { toast } from 'sonner';

const SECTIONS = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'data', label: 'Data', icon: Database },
  { id: 'danger', label: 'Danger zone', icon: ShieldAlert },
];

export const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { theme, toggle } = useTheme();
  const [section, setSection] = useState('profile');
  const [exporting, setExporting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleExport = async () => {
    try {
      setExporting(true);
      const res = await axiosInstance.get('/users/me/export');
      const blob = new Blob([JSON.stringify(res.data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `focusflow-export-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('Export downloaded');
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axiosInstance.delete('/users/me');
      dispatch(logout());
      navigate('/', { replace: true });
      toast.success('Account deleted');
    } catch {
      toast.error('Account deletion failed');
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-4 md:p-10 max-w-5xl w-full">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Manage your profile, appearance and data.
          </p>
        </header>

        <div className="grid md:grid-cols-[200px_1fr] gap-6">
          <nav
            role="tablist"
            aria-label="Settings sections"
            className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible"
          >
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const active = section === s.id;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSection(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-200'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </nav>

          <div className="card-depth card-hover-ring bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 min-h-[20rem]">
            {section === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Profile
                </h2>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Editing your bio, location and photos lives on your public
                  profile page.
                </div>
                <button
                  onClick={() =>
                    user?._id && navigate(`/profile/${user._id}`)
                  }
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-lg active:scale-[0.97] transition-all"
                >
                  Edit on profile
                </button>

                <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-4 mt-4">
                  <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                    Account
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <div>Name: {user?.name}</div>
                    <div>Email: {user?.email}</div>
                  </div>
                </div>
              </div>
            )}

            {section === 'appearance' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Appearance
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Pick the theme that suits your eyes.
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    onClick={() => theme === 'dark' && toggle()}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      theme === 'light'
                        ? 'border-emerald-400 ring-2 ring-emerald-200/60 dark:ring-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-200'
                    }`}
                  >
                    <Sun className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Light
                    </span>
                  </button>
                  <button
                    onClick={() => theme === 'light' && toggle()}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      theme === 'dark'
                        ? 'border-emerald-400 ring-2 ring-emerald-200/60 dark:ring-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-200'
                    }`}
                  >
                    <Moon className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Dark
                    </span>
                  </button>
                </div>
              </div>
            )}

            {section === 'data' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Your data
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Download everything you&apos;ve created in FocusFlow. JSON,
                  one file, yours to keep.
                </p>
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium text-sm px-4 py-2 rounded-lg active:scale-[0.97] transition-all"
                >
                  <Download className="w-4 h-4" />
                  {exporting ? 'Preparing…' : 'Export my data (JSON)'}
                </button>
              </div>
            )}

            {section === 'danger' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
                  Danger zone
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Deleting your account is permanent. All your goals,
                  milestones, tasks, posts, and follow relationships will be
                  removed.
                </p>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm px-4 py-2 rounded-lg active:scale-[0.97] transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete my account
                </button>
              </div>
            )}
          </div>
        </div>

        <ConfirmDialog
          isOpen={confirmDelete}
          title="Delete your account?"
          message="This is permanent. Everything you've created will be gone. There's no undo."
          confirmLabel={deleting ? 'Deleting…' : 'Delete forever'}
          destructive
          onConfirm={handleDelete}
          onCancel={() => !deleting && setConfirmDelete(false)}
        />
      </main>
    </div>
  );
};

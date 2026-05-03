import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target } from 'lucide-react';
import { loginUser } from './authThunk';
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);

  const [input, setInput] = useState({ email: '', password: '' });

  const loginHandler = async (e) => {
    e?.preventDefault?.();
    const result = await dispatch(loginUser(input));
    if (loginUser.fulfilled.match(result)) {
      setInput({ email: '', password: '' });
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-1/2 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </span>
          <span className="text-xl font-bold tracking-tight">FocusFlow</span>
        </div>
        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Welcome back.
          </h1>
          <p className="text-lg text-emerald-100/90 max-w-md">
            Pick up where you left off. Your goals, milestones and daily focus —
            all in one place.
          </p>
        </div>
        <div className="text-sm text-emerald-100/70">
          Plan it. Break it down. Ship it.
        </div>
      </aside>

      <main className="flex w-full md:w-1/2 items-center justify-center p-6 md:p-12 bg-white dark:bg-slate-900">
        <form onSubmit={loginHandler} className="w-full max-w-sm space-y-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Log in</h2>
            <p className="text-sm text-gray-500 dark:text-slate-500 mt-1">
              Enter your details to continue.
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-gray-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-gray-700 dark:text-slate-300"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-sm text-gray-600 dark:text-slate-400 text-center">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-emerald-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

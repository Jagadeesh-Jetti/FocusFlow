import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Target } from 'lucide-react';
import { registerUser } from './authThunk';
import { useState } from 'react';

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);

  const [input, setInput] = useState({ name: '', email: '', password: '' });

  const signupHandler = async (e) => {
    e?.preventDefault?.();
    const result = await dispatch(registerUser(input));
    if (registerUser.fulfilled.match(result)) {
      setInput({ name: '', email: '', password: '' });
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
            Get into your<br />
            focus flow.
          </h1>
          <p className="text-lg text-emerald-100/90 max-w-md">
            Set ambitious goals. Break them into milestones and tasks. Let AI
            do the planning so you can do the work.
          </p>
        </div>
        <div className="text-sm text-emerald-100/70">
          Plan it. Break it down. Ship it.
        </div>
      </aside>

      <main className="flex w-full md:w-1/2 items-center justify-center p-6 md:p-12 bg-white">
        <form onSubmit={signupHandler} className="w-full max-w-sm space-y-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
            <p className="text-sm text-gray-500 mt-1">
              Start planning in under a minute.
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-name"
              className="text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              required
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              required
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signup-password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

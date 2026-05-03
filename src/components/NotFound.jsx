import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
          <Target className="w-5 h-5" />
        </span>
        <span className="text-xl font-bold tracking-tight text-gray-900">
          FocusFlow
        </span>
      </div>

      <div className="text-center max-w-md">
        <div className="text-7xl font-bold text-emerald-600 mb-3">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          We can't find that page
        </h1>
        <p className="text-gray-500 mb-6">
          The link might be broken, or the page may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Go to dashboard
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 dark:bg-slate-950 text-gray-700 font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

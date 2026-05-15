import React from 'react';
import { Link } from 'react-router-dom';
import { Target, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[FocusFlow] crash:', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/25 ring-1 ring-inset ring-white/20">
            <Target className="w-5 h-5" strokeWidth={2.25} />
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            FocusFlow
          </span>
        </div>

        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Something went wrong.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            We hit an unexpected error. Your data is safe — try reloading the
            page.
          </p>
          {this.state.error?.message && (
            <pre className="text-xs text-left bg-slate-100 dark:bg-slate-900 ring-1 ring-slate-200/60 dark:ring-slate-800/60 rounded-lg p-3 mb-6 overflow-x-auto text-slate-700 dark:text-slate-300">
              {this.state.error.message}
            </pre>
          )}
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors active:scale-[0.97]"
            >
              <RefreshCw className="w-4 h-4" />
              Reload
            </button>
            <Link
              to="/dashboard"
              onClick={() => this.setState({ error: null })}
              className="inline-flex items-center justify-center border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

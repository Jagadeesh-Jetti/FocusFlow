import { Link } from 'react-router-dom';
import { Target, ArrowLeft } from 'lucide-react';

const LegalShell = ({ title, lastUpdated, children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-sm shadow-emerald-600/30 ring-1 ring-inset ring-white/20">
            <Target className="w-4 h-4" strokeWidth={2.25} />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            FocusFlow
          </span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>
      </div>
    </header>

    <main className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h1>
      <p className="text-sm text-slate-500 mb-10">
        Last updated {lastUpdated}
      </p>

      <article className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
        {children}
      </article>
    </main>
  </div>
);

export const Privacy = () => (
  <LegalShell title="Privacy policy" lastUpdated="May 2026">
    <p>
      FocusFlow is a personal productivity app. We only collect the data you
      give us directly: your account info (name, email, password hash), the
      goals/milestones/tasks/posts you create, and the AI Coach conversations
      you choose to send.
    </p>
    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
      What we store
    </h2>
    <ul className="list-disc ml-5 space-y-2">
      <li>Account: name, email, hashed password, optional avatar and bio.</li>
      <li>Content: goals, milestones, tasks, posts (and any images).</li>
      <li>Coach chat history is stored locally in your browser (localStorage).</li>
    </ul>
    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
      Who we share with
    </h2>
    <p>
      We use Cohere for AI plan generation and the Coach. The text of your
      goals and tasks is sent to Cohere when those features are invoked. We do
      not sell your data, anywhere, ever.
    </p>
    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
      Your controls
    </h2>
    <p>
      You can export every byte of your data as JSON from Settings → Data. You
      can permanently delete your account from Settings → Danger zone.
    </p>
    <p>
      Questions: <a className="text-emerald-700 hover:underline" href="mailto:hello@focusflow.app">hello@focusflow.app</a>.
    </p>
  </LegalShell>
);

export const Terms = () => (
  <LegalShell title="Terms of service" lastUpdated="May 2026">
    <p>
      By using FocusFlow you agree to use it for personal productivity, not to
      harm or harass anyone, and not to abuse the AI features (rate-limit
      bypass, scraping, etc.).
    </p>
    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
      Your content
    </h2>
    <p>
      You own everything you create. We host it so you can use it across
      devices and (optionally) share it with the community.
    </p>
    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
      Termination
    </h2>
    <p>
      You can delete your account anytime from Settings. We can suspend
      accounts that violate these terms.
    </p>
    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
      No warranty
    </h2>
    <p>
      FocusFlow is provided as-is. We aim for high uptime and correct
      behavior, but we&apos;re not liable for missed deadlines or lost data —
      please export your data periodically (Settings → Data).
    </p>
    <p>
      Questions: <a className="text-emerald-700 hover:underline" href="mailto:hello@focusflow.app">hello@focusflow.app</a>.
    </p>
  </LegalShell>
);

import { Link } from 'react-router-dom';
import {
  Target,
  Sparkles,
  BarChart3,
  Users,
  MessageSquare,
  Smartphone,
  ArrowRight,
  Check,
  Github,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Target,
    title: 'Goal-first planning',
    body: 'Start with the destination. Break it into milestones and tasks that actually move the needle.',
  },
  {
    icon: Sparkles,
    title: 'AI plans your goals',
    body: 'Type a goal, get milestones and tasks in seconds. Edit, save, and get to work.',
  },
  {
    icon: MessageSquare,
    title: 'Coach chat — talk to your plan',
    body: 'Stuck? Ask the AI coach what to work on, what is at risk, or to summarize your week.',
  },
  {
    icon: BarChart3,
    title: 'Progress at a glance',
    body: 'Live progress bars, weekly history, deadlines. Always know what to do next.',
  },
  {
    icon: Users,
    title: 'Built-in accountability',
    body: 'Share progress on your community feed. Cheer each other on. Stay public, stay honest.',
  },
  {
    icon: Smartphone,
    title: 'Works on any device',
    body: 'Mobile-first responsive design. Plan from the couch, check off from the bus.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Set a goal you actually care about',
    body: 'Run a marathon. Ship a side project. Land a new job. Anything ambitious enough to matter.',
  },
  {
    n: '02',
    title: 'Let AI break it down',
    body: 'Powered by Cohere. You get milestones, tasks and a plan in seconds. Edit anything you want.',
  },
  {
    n: '03',
    title: 'Check things off and watch progress climb',
    body: 'A satisfying click. A progress bar that fills up. The feeling of actually shipping.',
  },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top nav */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="FocusFlow home">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-sm shadow-emerald-600/30 ring-1 ring-inset ring-white/20">
              <Target className="w-4 h-4" strokeWidth={2.25} />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              FocusFlow
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] text-white px-4 py-2 rounded-lg shadow-sm shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all duration-150 ring-1 ring-inset ring-white/10"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 dot-grid"
        />
        {/* Gradient blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-emerald-300/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 -right-24 w-[28rem] h-[28rem] rounded-full bg-teal-300/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/3 w-[22rem] h-[22rem] rounded-full bg-amber-200/40 blur-3xl"
        />

        <div className="relative max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-32 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-6 hover:bg-emerald-100 transition-colors"
          >
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              NEW
            </span>
            AI Coach chat — talk to your plan
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Turn ambitious goals into{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              daily wins
            </span>
            .
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Set goals, get AI-generated plans, and chat with your personal coach
            when you&apos;re stuck. FocusFlow keeps you moving.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all duration-200 ring-1 ring-inset ring-white/15"
            >
              Start free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium px-6 py-3 transition-colors"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            No credit card · Free for personal use
          </p>
        </div>
      </section>

      {/* Product mockup */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-8 md:-mt-12 pb-20 md:pb-28">
          <ProductMockup />
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need to actually finish things.
            </h2>
            <p className="mt-3 text-gray-600 text-lg">
              Stop managing yet another to-do list. FocusFlow connects the dots
              from goal to milestone to task to done.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-emerald-200 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {f.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Three steps from foggy ambition to a plan you can actually follow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="relative">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                {s.n}
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {s.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 md:px-8 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 px-6 py-16 md:py-20 text-center text-white relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-24 -left-12 w-72 h-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-teal-300/20 blur-3xl"
          />

          <h2 className="relative text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Stop drifting. Start shipping.
          </h2>
          <p className="relative text-emerald-50/90 text-lg max-w-xl mx-auto mb-8">
            Join FocusFlow and turn the goals you keep thinking about into the
            ones you actually finish.
          </p>
          <Link
            to="/signup"
            className="relative inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-700 font-semibold px-7 py-3.5 rounded-xl shadow-lg transition-colors"
          >
            Get started for free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-gray-900">FocusFlow</span>
          </Link>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Jagadeesh-Jetti/FocusFlow"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-gray-900"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <span>© {new Date().getFullYear()} FocusFlow</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProductMockup = () => {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-2xl shadow-emerald-900/10 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-300" />
          <span className="w-3 h-3 rounded-full bg-yellow-300" />
          <span className="w-3 h-3 rounded-full bg-emerald-300" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-xs text-gray-400 bg-white border border-gray-200 rounded-md px-3 py-1">
            focusflow.app/goals/run-marathon
          </span>
        </div>
      </div>

      {/* Mock content */}
      <div className="p-5 md:p-7">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="text-xs text-gray-500 mb-1">Fitness</div>
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              Run a half marathon
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
            In progress
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          21k in 6 months. Slow but consistent.
        </p>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-600 mb-1.5">
            <span>Progress</span>
            <span>4 / 9 tasks · 44%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="h-full w-[44%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          <MilestoneMock
            title="Build a base"
            tasks={[
              { title: 'Run 5k three times a week', done: true },
              { title: 'Two strength sessions', done: true },
              { title: 'Sleep 7+ hours', done: false },
            ]}
          />
          <MilestoneMock
            title="Add distance"
            tasks={[
              { title: 'Long run: 10k', done: true },
              { title: 'Long run: 15k', done: true },
              { title: 'Long run: 18k', done: false },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const MilestoneMock = ({ title, tasks }) => {
  const completed = tasks.filter((t) => t.done).length;
  const pct = Math.round((completed / tasks.length) * 100);

  return (
    <div className="border border-gray-200 rounded-xl">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
        <div className="font-medium text-gray-900 text-sm">{title}</div>
        <div className="text-xs text-gray-500">
          {completed}/{tasks.length} · {pct}%
        </div>
      </div>
      <div className="p-2">
        {tasks.map((t) => (
          <div
            key={t.title}
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
          >
            <span
              className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                t.done
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-gray-300'
              }`}
            >
              {t.done && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
            </span>
            <span
              className={`text-sm ${
                t.done ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {t.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

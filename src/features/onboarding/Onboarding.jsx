import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Loader2, Target, X } from 'lucide-react';
import axiosInstance from '../../utils/api';
import { toast } from 'sonner';

const TEMPLATES = [
  {
    emoji: '🚀',
    title: 'Ship a side project',
    description: 'Launch a small web app in the next 90 days.',
  },
  {
    emoji: '🏃',
    title: 'Run a half marathon',
    description: 'Finish a 21k in under 2 hours within 6 months.',
  },
  {
    emoji: '🎯',
    title: 'Land a senior role',
    description:
      'Apply to 20 companies and land an offer within 3 months.',
  },
  {
    emoji: '📚',
    title: 'Learn a new skill',
    description:
      'Reach working proficiency in one new tool within 12 weeks.',
  },
];

const STORAGE_KEY = 'focusflow.onboarded';

export const markOnboarded = () => {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // ignore
  }
};

export const isOnboarded = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

export const Onboarding = ({ open, onDismiss, userName }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('pick'); // 'pick' | 'review' | 'saving'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [aiPlan, setAiPlan] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const reset = () => {
    setStep('pick');
    setTitle('');
    setDescription('');
    setAiPlan(null);
    setGenerating(false);
    setSaving(false);
  };

  const skip = () => {
    markOnboarded();
    reset();
    onDismiss?.();
  };

  const pickTemplate = (t) => {
    setTitle(t.title);
    setDescription(t.description);
  };

  const generate = async () => {
    if (!title.trim()) return;
    try {
      setGenerating(true);
      const res = await axiosInstance.post('/goals/generate-plan', {
        goalTitle: title,
        goalDescription: description,
      });
      setAiPlan(res.data);
      setStep('review');
    } catch {
      toast.error('AI is having a moment. Try again in a sec.');
    } finally {
      setGenerating(false);
    }
  };

  const save = async () => {
    if (!aiPlan) return;
    try {
      setSaving(true);
      setStep('saving');
      const res = await axiosInstance.post('/goals/save-ai-plan', aiPlan);
      const newGoalId = res.data?.goal?._id;
      markOnboarded();
      toast.success('Welcome aboard. Let’s ship.');
      onDismiss?.();
      if (newGoalId) navigate(`/goals/${newGoalId}`);
      else navigate('/goals');
    } catch {
      toast.error('Save failed — try again.');
      setStep('review');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="fade-up w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl ring-1 ring-slate-200/60 dark:ring-slate-800/60 overflow-hidden flex flex-col max-h-[90vh]">
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-sm shadow-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {userName ? `Welcome, ${userName}.` : 'Welcome to FocusFlow.'}
              </h2>
              <p className="text-xs text-slate-500">
                Let&apos;s set up your first goal. 30 seconds.
              </p>
            </div>
          </div>
          <button
            onClick={skip}
            aria-label="Skip onboarding"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {step === 'pick' && (
            <>
              <div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Pick a starting point
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.title}
                      onClick={() => pickTemplate(t)}
                      className={`text-left p-3 rounded-xl border transition-all active:scale-[0.98] ${
                        title === t.title
                          ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 ring-2 ring-emerald-200/60 dark:ring-emerald-800/60'
                          : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="text-2xl mb-1">{t.emoji}</div>
                      <div className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        {t.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs uppercase tracking-wider text-slate-400 mt-4 mb-2">
                Or write your own
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="What's the goal?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <textarea
                  placeholder="A bit more about why and what done looks like (optional)"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </>
          )}

          {step === 'review' && aiPlan && (
            <div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Here&apos;s the plan our AI drafted. You can edit anything
                later.
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">
                    Goal
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {aiPlan.goal}
                  </div>
                </div>
                <div className="space-y-2">
                  {aiPlan.milestones?.map((m, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-3"
                    >
                      <div className="font-medium text-slate-900 dark:text-slate-100 text-sm mb-1">
                        {m.title}
                      </div>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-0.5">
                        {m.tasks?.map((t, j) => (
                          <li key={j}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'saving' && (
            <div className="flex flex-col items-center gap-3 py-12 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <div className="text-sm">Setting up your workspace…</div>
            </div>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950">
          <button
            onClick={skip}
            disabled={saving}
            className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Skip for now
          </button>
          {step === 'pick' && (
            <button
              onClick={generate}
              disabled={!title.trim() || generating}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm shadow-emerald-600/20 active:scale-[0.97] transition-all ring-1 ring-inset ring-white/10"
            >
              {generating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {generating ? 'Generating plan…' : 'Generate plan with AI'}
            </button>
          )}
          {step === 'review' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep('pick')}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2"
              >
                Back
              </button>
              <button
                onClick={save}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm shadow-emerald-600/20 active:scale-[0.97] transition-all ring-1 ring-inset ring-white/10"
              >
                <Target className="w-4 h-4" />
                Save & start
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

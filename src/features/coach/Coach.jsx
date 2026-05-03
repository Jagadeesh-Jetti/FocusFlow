import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, Send, RotateCcw, Bot, Wand2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sidebar } from '../../components/Sidebar';
import { Avatar } from '../../components/Avatar';
import { sendCoachMessage } from './coachThunk';
import { clearCoachHistory } from './coachSlice';

const MARKDOWN_COMPONENTS = {
  p: (props) => <p className="my-2 first:mt-0 last:mb-0" {...props} />,
  ul: (props) => (
    <ul className="my-2 ml-5 list-disc space-y-1" {...props} />
  ),
  ol: (props) => (
    <ol className="my-2 ml-5 list-decimal space-y-1" {...props} />
  ),
  li: (props) => <li className="leading-snug" {...props} />,
  h1: (props) => (
    <h1 className="text-base font-semibold text-gray-900 dark:text-slate-100 mt-3 mb-1" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-base font-semibold text-gray-900 dark:text-slate-100 mt-3 mb-1" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mt-2 mb-1" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-gray-900 dark:text-slate-100" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  a: (props) => (
    <a
      className="text-emerald-700 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  code: ({ inline, ...props }) =>
    inline ? (
      <code
        className="bg-gray-100 dark:bg-slate-800 text-emerald-700 rounded px-1 py-0.5 text-[0.85em]"
        {...props}
      />
    ) : (
      <code
        className="block bg-gray-900 text-emerald-200 rounded-lg p-3 my-2 overflow-x-auto text-xs"
        {...props}
      />
    ),
  pre: (props) => <pre className="my-2" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-emerald-300 pl-3 my-2 text-gray-600 dark:text-slate-400"
      {...props}
    />
  ),
  hr: () => <hr className="my-3 border-gray-200 dark:border-slate-700" />,
};

const SUGGESTED_PROMPTS = [
  {
    icon: '🎯',
    title: 'What should I focus on today?',
    prompt:
      'Looking at my goals, milestones, and tasks — what are the top 3 things I should focus on today, and why?',
  },
  {
    icon: '📊',
    title: 'Summarize my last week',
    prompt:
      'Summarize what I shipped over the last 7 days, what slipped, and what I should adjust for next week.',
  },
  {
    icon: '⚠️',
    title: 'Which goal is at risk?',
    prompt:
      'Looking at my progress and deadlines, which of my goals is most at risk of slipping, and what would unstick it?',
  },
  {
    icon: '✂️',
    title: 'Help me cut scope',
    prompt:
      'I feel overwhelmed. Look at my pending tasks and suggest 3-5 to defer or drop so I can focus.',
  },
];

export const Coach = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((s) => s.coach);
  const { user } = useSelector((s) => s.auth);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const submit = (text) => {
    const content = (text ?? draft).trim();
    if (!content || loading) return;
    setDraft('');
    dispatch(sendCoachMessage(content));
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleClear = () => {
    if (!messages.length) return;
    if (
      window.confirm(
        'Clear this conversation? Your goals and tasks are not affected.'
      )
    ) {
      dispatch(clearCoachHistory());
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen">
        <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-sm shadow-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-slate-100 leading-tight">
                Coach
              </h1>
              <p className="text-xs text-gray-500 dark:text-slate-500">
                Your AI productivity coach
              </p>
            </div>
          </div>
          {!isEmpty && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 dark:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">New conversation</span>
            </button>
          )}
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-6"
        >
          <div className="max-w-3xl mx-auto">
            {isEmpty ? (
              <EmptyState
                userName={user?.name?.split(' ')[0]}
                onPick={(prompt) => submit(prompt)}
              />
            ) : (
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <Message key={`${m.ts}-${i}`} message={m} user={user} />
                ))}
                {loading && <ThinkingBubble />}
                {error && (
                  <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 md:px-8 py-4 shrink-0">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl p-2 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition">
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask anything about your goals, tasks, or progress…"
                className="flex-1 bg-transparent resize-none px-2 py-2 text-sm focus:outline-none placeholder:text-gray-400 dark:text-slate-600 max-h-40"
                style={{ minHeight: '2.25rem' }}
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                disabled={!draft.trim() || loading}
                aria-label="Send message"
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:bg-slate-600 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 dark:text-slate-600 mt-2 text-center">
              Coach has read-only access to your goals and tasks. It can&apos;t
              change anything for you (yet).
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

const EmptyState = ({ userName, onPick }) => (
  <div className="text-center py-8 md:py-16">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-5 shadow-lg shadow-emerald-500/30">
      <Wand2 className="w-7 h-7" />
    </div>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">
      {userName ? `Hi, ${userName}.` : 'Hello there.'} What's on your mind?
    </h2>
    <p className="text-gray-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
      Ask anything about your goals, tasks, or how this week is going. I see
      everything you do in FocusFlow.
    </p>

    <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
      {SUGGESTED_PROMPTS.map((s) => (
        <button
          key={s.title}
          onClick={() => onPick(s.prompt)}
          className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4 hover:border-emerald-300 hover:shadow-sm transition group"
        >
          <div className="text-2xl mb-2">{s.icon}</div>
          <div className="font-medium text-gray-900 dark:text-slate-100 group-hover:text-emerald-700 transition-colors">
            {s.title}
          </div>
        </button>
      ))}
    </div>
  </div>
);

const Message = ({ message, user }) => {
  if (message.role === 'user') {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%] whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
        <Avatar user={user} size="sm" />
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <span className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4" />
      </span>
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%] text-gray-800 dark:text-slate-200 leading-relaxed text-sm">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={MARKDOWN_COMPONENTS}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const ThinkingBubble = () => (
  <div className="flex items-start gap-3">
    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0">
      <Bot className="w-4 h-4" />
    </span>
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl rounded-tl-md px-4 py-3">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
        <span
          className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
          style={{ animationDelay: '0.15s' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
          style={{ animationDelay: '0.3s' }}
        />
      </div>
    </div>
  </div>
);

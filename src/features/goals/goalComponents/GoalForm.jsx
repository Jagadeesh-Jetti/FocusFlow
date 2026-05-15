import { Sparkles } from 'lucide-react';

const INPUT_CLASS =
  'w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500';
const LABEL_CLASS = 'block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1';

export const GoalForm = ({
  form,
  setForm,
  isSaved,
  loading,
  handleSubmit,
  aiPlan,
  generateWithAI,
  saveAIPlan,
  hideAI = false,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="goal-title" className={LABEL_CLASS}>
          Title
        </label>
        <input
          id="goal-title"
          type="text"
          placeholder="What's the goal?"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={INPUT_CLASS}
          required
        />
      </div>

      <div>
        <label htmlFor="goal-description" className={LABEL_CLASS}>
          Description
        </label>
        <textarea
          id="goal-description"
          placeholder="A bit more about why and what done looks like"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={INPUT_CLASS}
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="goal-category" className={LABEL_CLASS}>
          Category
        </label>
        <input
          id="goal-category"
          type="text"
          placeholder="Career, Health, Learning…"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={INPUT_CLASS}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="goal-status" className={LABEL_CLASS}>
            Status
          </label>
          <select
            id="goal-status"
            name="status"
            className={INPUT_CLASS}
            value={form?.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Not Started">Not started</option>
            <option value="In Progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="goal-priority" className={LABEL_CLASS}>
            Priority
          </label>
          <select
            id="goal-priority"
            name="priority"
            className={INPUT_CLASS}
            value={form?.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="goal-due" className={LABEL_CLASS}>
          Due date
        </label>
        <input
          id="goal-due"
          type="date"
          name="dueDate"
          value={form?.dueDate?.split('T')[0] || ''}
          className={INPUT_CLASS}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          Save goal
        </button>
        {!hideAI && (
          <button
            type="button"
            disabled={!form.title || loading}
            onClick={generateWithAI}
            className="flex items-center justify-center gap-1.5 sm:flex-1 border border-emerald-200 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2.5 rounded-lg transition-colors active:scale-[0.97]"
          >
            <Sparkles
              className={`w-4 h-4 ${
                form.title && !loading ? 'sparkle-pulse' : ''
              }`}
            />
            {loading ? 'Generating…' : 'Generate with AI'}
          </button>
        )}
      </div>

      {!hideAI && aiPlan && !isSaved && (
        <div className="mt-2 border-t border-gray-200 dark:border-slate-700 pt-4">
          <h4 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-2">
            AI-generated plan
          </h4>
          <div className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 p-4 rounded-lg space-y-3">
            <div>
              <div className="text-xs text-gray-500 dark:text-slate-500 uppercase tracking-wide">
                Goal
              </div>
              <div className="font-medium text-gray-900 dark:text-slate-100">{aiPlan.goal}</div>
            </div>
            <div className="space-y-2">
              {aiPlan?.milestones?.map((milestone, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-md p-3">
                  <div className="font-medium text-gray-900 dark:text-slate-100 mb-1">
                    {milestone.title}
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-slate-400 space-y-0.5">
                    {milestone.tasks.map((task, j) => (
                      <li key={j}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={saveAIPlan}
            className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg"
          >
            Confirm & save AI plan
          </button>
        </div>
      )}
    </form>
  );
};

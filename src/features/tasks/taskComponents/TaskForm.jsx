const INPUT_CLASS =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';
const LABEL_CLASS = 'block text-sm font-medium text-gray-700 mb-1';

export const TaskForm = ({
  form,
  setForm,
  handleSubmit,
  milestones,
  goals,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="task-title" className={LABEL_CLASS}>
          Title
        </label>
        <input
          id="task-title"
          type="text"
          name="title"
          value={form.title}
          placeholder="What needs to get done?"
          className={INPUT_CLASS}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="task-description" className={LABEL_CLASS}>
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          placeholder="Any details that'll help future you?"
          rows={3}
          value={form.description}
          className={INPUT_CLASS}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="task-goal" className={LABEL_CLASS}>
            Goal
          </label>
          <select
            id="task-goal"
            name="goal"
            className={INPUT_CLASS}
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
          >
            <option value="">— None —</option>
            {goals?.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal?.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="task-milestone" className={LABEL_CLASS}>
            Milestone
          </label>
          <select
            id="task-milestone"
            name="milestone"
            className={INPUT_CLASS}
            required
            value={form.milestone}
            onChange={(e) => setForm({ ...form, milestone: e.target.value })}
          >
            <option value="">— Select —</option>
            {milestones.map((milestone) => (
              <option key={milestone._id} value={milestone._id}>
                {milestone.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="task-priority" className={LABEL_CLASS}>
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            className={INPUT_CLASS}
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="task-due" className={LABEL_CLASS}>
            Due date
          </label>
          <input
            id="task-due"
            type="date"
            name="dueDate"
            value={form.dueDate?.split('T')[0] || ''}
            className={INPUT_CLASS}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="isCompleted"
          checked={form.isCompleted}
          className="w-4 h-4 accent-indigo-600"
          onChange={(e) => setForm({ ...form, isCompleted: e.target.checked })}
        />
        <span>Mark as completed</span>
      </label>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
      >
        Save task
      </button>
    </form>
  );
};

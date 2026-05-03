const INPUT_CLASS =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';
const LABEL_CLASS = 'block text-sm font-medium text-gray-700 mb-1';

export const MilestoneForm = ({ form, setForm, goals, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="milestone-title" className={LABEL_CLASS}>
          Title
        </label>
        <input
          id="milestone-title"
          type="text"
          placeholder="A meaningful checkpoint"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={INPUT_CLASS}
          required
        />
      </div>

      <div>
        <label htmlFor="milestone-description" className={LABEL_CLASS}>
          Description
        </label>
        <textarea
          id="milestone-description"
          placeholder="What does done look like?"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label htmlFor="milestone-goal" className={LABEL_CLASS}>
          Goal
        </label>
        <select
          id="milestone-goal"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          className={INPUT_CLASS}
          required
        >
          <option value="">— Select —</option>
          {goals?.length > 0 ? (
            goals.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal.title}
              </option>
            ))
          ) : (
            <option disabled>No goals available</option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="milestone-target" className={LABEL_CLASS}>
          Target date
        </label>
        <input
          id="milestone-target"
          type="date"
          value={form.targetDate}
          onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
          className={INPUT_CLASS}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
      >
        Save milestone
      </button>
    </form>
  );
};

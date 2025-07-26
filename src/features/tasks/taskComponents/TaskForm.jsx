export const TaskForm = ({
  form,
  setForm,
  handleSubmit,
  milestones,
  goals,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        name="title"
        value={form.title}
        placeholder="Task Title"
        className="w-full p-2 border rounded"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        name="description"
        placeholder="Task Description"
        rows={4}
        value={form.description}
        className="w-full p-2 border rounded"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <select
        name="milestone"
        className="w-full p-2 border rounded"
        required
        value={form.milestone}
        onChange={(e) => setForm({ ...form, milestone: e.target.value })}
      >
        <option value="">Select Milestone</option>
        {milestones.map((milestone) => (
          <option key={milestone._id} value={milestone._id}>
            {milestone.title}
          </option>
        ))}
      </select>

      <select
        name="goal"
        className="w-full p-2 border rounded"
        value={form.goal}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
      >
        <option value=""> Select Goal</option>
        {goals?.map((goal) => (
          <option key={goal._id} value={goal._id}>
            {goal?.title}
          </option>
        ))}
      </select>

      <select
        name="priority"
        className="w-full p-2 border rounded"
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
        required
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate?.split('T')[0] || ''}
        className="w-full p-2 border rounded"
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        required
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isCompleted"
          checked={form.isCompleted}
          id="isCompleted"
          className="w-5 h-5 accent-green-600"
          onChange={(e) => setForm({ ...form, isCompleted: e.target.checked })}
        />
        <label htmlFor="isCompleted" className="text-sm text-gray-700">
          Mark as Completed
        </label>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
      >
        Save Task
      </button>
    </form>
  );
};

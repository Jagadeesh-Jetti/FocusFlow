export const GoalForm = ({
  form,
  setForm,
  isSaved,
  loading,
  handleSubmit,
  aiPlan,
  generateWithAI,
  saveAIPlan,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-2 border rounded"
        rows={4}
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <select
        name="status"
        className="w-full p-2 border rounded"
        value={form?.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="Not Started">Not Started </option>
        <option value="In Progress">In Progress </option>
        <option value="Completed">Completed </option>
      </select>

      <select
        name="priority"
        id=""
        className="w-full p-2 border rounded"
        value={form?.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option value="Low"> Low </option>
        <option value="Medium"> Medium </option>
        <option value="High"> High </option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form?.dueDate?.split('T')[0] || ''}
        className="w-full p-2 border rounded"
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Save Goal
        </button>
        <button
          type="button"
          disabled={!form.title || loading}
          onClick={generateWithAI}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {loading ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      {aiPlan && !isSaved && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">
            AI-Generated Plan
          </h4>
          <div className="bg-gray-100 p-3 rounded-md">
            <h5 className="text-md font-bold">{aiPlan.goal}</h5>
            {aiPlan?.milestones?.map((milestone, i) => (
              <div key={i} className="mt-2">
                <p className="font-medium text-gray-700">
                  Milestone: {milestone.title}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {milestone.tasks.map((task, j) => (
                    <li key={j}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={saveAIPlan}
            className="mt-4 bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Confirm & Save AI Plan
          </button>
        </div>
      )}
    </form>
  );
};

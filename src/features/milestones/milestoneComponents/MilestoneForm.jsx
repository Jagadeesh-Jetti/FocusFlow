export const MilestoneForm = ({ form, setForm, goals, handleSubmit }) => {
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
      />

      <select
        value={form.goal}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
        className="w-full p-2 border rounded "
        required
      >
        <option value="">Select Goal</option>
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

      <input
        type="date"
        value={form.targetDate}
        onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Save Milestone
      </button>
    </form>
  );
};

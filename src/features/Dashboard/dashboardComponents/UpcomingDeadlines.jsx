export const UpcomingDeadlines = ({ deadlines }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        {' '}
        Upcoming Deadlines
      </h2>
      {deadlines.length === 0 ? (
        <p className="text-gray-400 italic"> No dealines</p>
      ) : (
        <ul className="space-y-2 text-gray-700">
          {deadlines.map((d, idx) => (
            <li key={idx}>
              <span className="text-gray-500"> {d.date} - </span> {d.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Sidebar = () => {
  return (
    <aside className="w-1/5 bg-gray-600 p-6 hidden md:block">
      <h1 className="text-3xl font-serif font-bold text-white mb-8 m-1">
        Goal Deck
      </h1>
      <ul className="space-y-4 text-white text-2xl font-serif">
        <li>
          <a href="/dashboard" className="hover:text-yellow-400">
            🏠 Dashboard
          </a>
        </li>
        <li>
          <a href="/goals" className="hover:text-yellow-400">
            🎯 Goals
          </a>
        </li>
        <li>
          <a href="/goals" className="hover:text-yellow-400">
            🎯 Milestones
          </a>
        </li>
        <li>
          <a href="/goals" className="hover:text-yellow-400">
            🎯 Tasks
          </a>
        </li>
        <li>
          <a href="/circles" className="hover:text-yellow-400">
            👥 Circles
          </a>
        </li>
        <li>
          <a href="/progress" className="hover:text-yellow-400">
            📈 Progress
          </a>
        </li>
        <li>
          <a href="/profile" className="hover:text-yellow-400">
            ⚙️ Profile
          </a>
        </li>
      </ul>
    </aside>
  );
};

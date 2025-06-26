export const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
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
      <div className="bg-blue-50 w-screen">
        <div className="text-5xl text-gray-800 font-medium p-5">
          Welcome Back! Jaggu
        </div>
        <div className="flex">
          <div className="bg-gray-400 w-3px h-3px m-3 p-8">3 goals</div>
          <div className="bg-gray-400 w-3px h-3px m-3 p-8">4 tasks</div>
          <div className="bg-gray-400 w-3px h-3px m-3 p-8">7 day streak</div>
        </div>
        <div>
          <div className="text-4xl m-3">Today's Tasks</div>
          <div className="text-2xl m-1 ml-3">
            <input type="checkbox" className="w-3 h-3" /> Complete Dashboard
          </div>
          <div className="text-2xl m-1 ml-3">
            <input type="checkbox" className="w-3 h-3" /> Complete Milestones
          </div>
          <div className="text-2xl m-1 ml-3">
            <input type="checkbox" className="w-3 h-3" /> Complete Tasks
          </div>
        </div>
        <button className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2">
          Add Goal
        </button>
        <button className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2">
          Add Task
        </button>
      </div>
    </div>
  );
};

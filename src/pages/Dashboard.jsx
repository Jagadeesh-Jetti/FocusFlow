import { Sidebar } from '../components/Sidebar';

export const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
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

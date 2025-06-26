import { Sidebar } from '../components/Sidebar';

export const Tasks = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-4">
        <div className="text-4xl m-3">Tasks</div>
        <div>Filters </div>
        <div>
          <div className="text-2xl border m-2 p-2 w-80">
            <input type="checkbox" className="" /> Complete tasks
          </div>
          <div className="text-2xl border m-2 p-2 w-80">
            <input type="checkbox" className="" /> Complete backend
          </div>
          <div className="text-2xl border m-2 p-2 w-80">
            <input type="checkbox" className="" /> Code backend
          </div>
        </div>
        <button className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2">
          Add Task
        </button>
      </div>
    </div>
  );
};

import { Sidebar } from '../components/Sidebar';

export const Goals = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-4">
        <div className="text-4xl font-semibold m-3">Goals</div>
        <div className="m-3">filters</div>
        <div className="m-3  p-3 flex">
          <div className="border p-3 m-2">
            <div className="text-3xl"> Learn React </div>
            <div className="text-1xl font-semibold">In Progress </div>
            <p> Due - Aug 18, 2025 </p>
            <div>
              <button className=" text-black border border-black  font-semibold w-30 rounded-xl p-1 m-2">
                Private
              </button>
              <button className=" text-black border  border-black font-semibold w-30 rounded-xl p-1 m-2">
                Public
              </button>
            </div>
          </div>
          <div className="border p-3 m-2">
            <div className="text-3xl"> Get a Job </div>
            <div className="text-1xl font-semibold">In Progress </div>
            <p> Due - Aug 18, 2025 </p>
            <div>
              <button className=" text-black border border-black  font-semibold w-30 rounded-xl p-1 m-2">
                Private
              </button>
              <button className=" text-black border  border-black font-semibold w-30 rounded-xl p-1 m-2">
                Public
              </button>
            </div>
          </div>
        </div>
        <button className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2">
          Add New Goal
        </button>
      </div>
    </div>
  );
};

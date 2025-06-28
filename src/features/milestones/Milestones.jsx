import { Sidebar } from '../../components/Sidebar';

export const Milestones = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-4 w-screen">
        <div className="text-4xl m-4 font-bold">Milestones</div>
        <div className="flex justify-between  px-4 ">
          <div className="text-3xl">All Goals</div>
          <button className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2">
            Add Milestone
          </button>
        </div>
        <div>
          <div className="border flex justify-between p-3 m-3">
            <div>
              <div className="font-semibold">Fix Diet</div>
              <div>Goal: Get FIt</div>
            </div>
            <div>
              <div>Due Date</div>
              <div className="font-semibold">July 1, 2026</div>
            </div>
          </div>
          <div className="border flex justify-between p-3 m-3">
            <div>
              <div className="font-semibold">Fix sleeep</div>
              <div>Goal: Get FIt</div>
            </div>
            <div>
              <div>Due Date</div>
              <div className="font-semibold">July 1, 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

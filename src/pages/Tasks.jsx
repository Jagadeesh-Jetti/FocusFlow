import { Sidebar } from '../components/Sidebar';

export const Tasks = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-4 w-screen">
        <div className="text-4xl m-3">Tasks</div>
        <div className="flex justify-between m-4">
          <div>Filters </div>
          <div className="text-3xl font-semibold"> Add Task</div>
        </div>
        <div>
          <div className="flex gap-x-4 text-2xl border m-2 p-2 w-80">
            <input type="checkbox" className="" />
            <div>
              <div>Complete tasks</div>
              <div>Goal: Get Fit </div>
            </div>
          </div>
          <div className="flex gap-x-4 text-2xl border m-2 p-2 w-80">
            <input type="checkbox" className="" />
            <div>
              <div>Complete backend</div>
              <div>Goal: get a job </div>
            </div>
          </div>
          <div className="flex gap-x-4 text-2xl border m-2 p-2 w-80">
            <input type="checkbox" className="" />
            <div>
              <div>Code backend</div>
              <div>Goal: Get fit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

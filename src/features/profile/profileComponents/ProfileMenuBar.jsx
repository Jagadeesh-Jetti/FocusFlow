export const ProfileMenuBar = ({ setDisplay }) => {
  return (
    <div className="flex mt-3  justify-between">
      <div className="flex ">
        <div className="p-3 font-bold" onClick={() => setDisplay('posts')}>
          Posts
        </div>
        <div className="p-3 font-bold" onClick={() => setDisplay('goals')}>
          Goals
        </div>
      </div>

      <div className="flex justify-center align-middle text-center">
        <div className="flex justify-center  font-bold p-2">Sort by:</div>
        <select className="p-1">
          <option value="">All</option>
          <option value="">Most Popular</option>
        </select>
      </div>
    </div>
  );
};

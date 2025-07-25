import { useNavigate } from 'react-router-dom';

export const ExplorePeople = ({
  filteredUsers,
  curentUserId,
  followHandler,
  unfollowHandler,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-[30%] p-10 ">
      <div className="text-2xl font-bold m-2">Who to follow?</div>
      {filteredUsers.map((user) => {
        const isFollowing = user.followers.includes(curentUserId);

        return (
          <div className="flex gap-4 p-2 justify-between  border">
            <div
              className="flex gap-2 justify-center"
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold shadow-inner">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-center pt-1 font-semibold text-base md:text-lg text-gray-800">
                  {user?.name}
                </h2>
              </div>
            </div>

            <div
              onClick={() => {
                isFollowing
                  ? unfollowHandler(user._id)
                  : followHandler(user._id);
              }}
              className="bg-gray-600 text-white flex content-center justify-center w-18 h-8 p-1 m-1 text-sm font-bold  mr-3 rounded-sm hover:cursor-pointer "
            >
              {user.followers.includes(curentUserId) ? 'UnFollow' : 'Follow'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

import { useNavigate } from 'react-router-dom';

export const ExplorePeople = ({
  filteredUsers,
  currentUserId,
  followHandler,
  unfollowHandler,
}) => {
  const navigate = useNavigate();

  if (!filteredUsers?.length) return null;

  return (
    <aside className="hidden lg:block w-72 p-6 border-l border-gray-200 bg-white shrink-0">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Who to follow
      </h2>
      <div className="space-y-2">
        {filteredUsers.slice(0, 10).map((user) => {
          const isFollowing = user.followers?.includes(currentUserId);

          return (
            <div
              key={user._id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
            >
              <div
                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold shrink-0">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-800 truncate">
                  {user?.name}
                </span>
              </div>

              {followHandler && (
                <button
                  onClick={() =>
                    isFollowing
                      ? unfollowHandler?.(user._id)
                      : followHandler(user._id)
                  }
                  className={`text-xs font-medium px-3 py-1 rounded-md transition-colors ${
                    isFollowing
                      ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

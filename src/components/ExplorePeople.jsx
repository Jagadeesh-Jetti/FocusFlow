import { useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';

export const ExplorePeople = ({
  filteredUsers,
  currentUserId,
  followHandler,
  unfollowHandler,
}) => {
  const navigate = useNavigate();

  if (!filteredUsers?.length) return null;

  return (
    <aside className="hidden lg:block w-72 p-6 border-l border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shrink-0">
      <h2 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4">
        Who to follow
      </h2>
      <div className="space-y-2">
        {filteredUsers.slice(0, 10).map((user) => {
          const isFollowing = user.followers?.includes(currentUserId);

          return (
            <div
              key={user._id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              <div
                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <Avatar user={user} size="sm" />
                <span className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate">
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
                      ? 'border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
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

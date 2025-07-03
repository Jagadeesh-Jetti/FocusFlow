import { useSelector } from 'react-redux';
import { Sidebar } from '../components//Sidebar';
import { formatDistanceToNow } from 'date-fns';

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <div className="text-center mt-20">Loading user...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-10 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">
              Joined {formatDistanceToNow(new Date(user.createdAt))} ago
            </p>
          </div>

          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-700">
              Your Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-base font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-base font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">User ID</p>
                <p className="text-base font-medium">{user._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account Created</p>
                <p className="text-base font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Future: Add profile edit, password change, avatar upload, etc. */}
        </div>
      </div>
    </div>
  );
};

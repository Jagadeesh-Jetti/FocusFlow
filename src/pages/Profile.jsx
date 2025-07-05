import { useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { formatDistanceToNow } from 'date-fns';

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <div className="text-center mt-20">Loading user...</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-4xl font-bold flex items-center justify-center shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              {/* Future: Edit Avatar */}
              {/* <button className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md">
                <Camera className="w-4 h-4 text-gray-600" />
              </button> */}
            </div>

            {/* Basic Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">
                Member since {formatDistanceToNow(new Date(user.createdAt))} ago
              </p>
            </div>
          </div>

          {/* User Details */}
          <div className="mt-8 bg-white shadow-lg rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Your Details
              </h2>
              {/* Future: Add Edit Button */}
              {/* <button className="text-sm text-indigo-600 hover:underline">Edit Profile</button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Detail label="Name" value={user.name} />
              <Detail label="Email" value={user.email} />
              <Detail label="User ID" value={user._id} />
              <Detail
                label="Account Created"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-base font-medium text-gray-800">{value}</p>
  </div>
);

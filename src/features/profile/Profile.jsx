import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { getPosts } from '../community/feedThunk';
import { PostCard } from '../community/postComponents/PostCard';
import { getGoals } from '../goals/goalThunk';
import { GoalCard } from '../goals/goalComponents/GoalCard';
import { EditProfileModal } from './profileComponents/ProfileModal';
import {
  followUser,
  getAllUsers,
  getUserProfile,
  unfollowUser,
  updateUserProfile,
} from './profileThunk';
import { useParams } from 'react-router-dom';
import { ExplorePeople } from '@/components/ExplorePeople';
import { ProfileMenuBar } from './profileComponents/ProfileMenuBar';
import { ProfileHeroContent } from './profileComponents/ProfileHeroContent';

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { postList: posts } = useSelector((s) => s.post);
  const { goalsList: goals } = useSelector((state) => state.goal);
  const { profile, allUsers } = useSelector((state) => state?.profile);
  const user = useSelector((state) => state.auth.user);
  const [display, setDisplay] = useState('posts');
  const [open, setOpen] = useState(false);

  const currentUserId = user._id;
  let enableEditing = user?._id === profile?._id;

  const filteredPosts = posts.filter((post) => post.user._id === id);

  const filteredUsers = allUsers.filter((u) => u._id !== user._id);

  const handleSave = async (updatedData) => {
    await dispatch(updateUserProfile({ id: id, updatedProfile: updatedData }));
    await dispatch(getAllUsers());
    setOpen(false);
  };

  const followHandler = async (id) => {
    await dispatch(followUser(id));
    await dispatch(getAllUsers());
    await dispatch(getUserProfile(currentUserId));
  };

  const unfollowHandler = async (id) => {
    await dispatch(unfollowUser(id));
    await dispatch(getAllUsers());
    await dispatch(getUserProfile(currentUserId));
  };

  useEffect(() => {
    if (id) {
      dispatch(getPosts());
      dispatch(getGoals());
      dispatch(getAllUsers());
      dispatch(getUserProfile(id));
    }
  }, [dispatch, id]);

  if (!profile) return <div className="text-center mt-20">Loading user...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1">
        <div className="relative">
          {profile?.bannerPic ? (
            <img
              src={profile.bannerPic}
              alt=""
              className="h-44 w-full object-cover"
            />
          ) : (
            <div className="h-44 w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600" />
          )}
          <div className="absolute -bottom-12 left-6 md:left-10">
            {profile?.profilePic ? (
              <img
                src={profile.profilePic}
                alt={profile.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl font-bold">
                {profile?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 md:px-10 pt-16 pb-10">
        <ProfileHeroContent
          profile={profile}
          enableEditing={enableEditing}
          setOpen={setOpen}
        />

        {enableEditing ? (
          <EditProfileModal
            user={profile}
            isOpen={open}
            onClose={() => setOpen(false)}
            onSave={handleSave}
          />
        ) : null}

        <ProfileMenuBar setDisplay={setDisplay} />

        <div className="mt-4">
          {display === 'posts' ? (
            filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400 italic">No posts yet.</div>
            )
          ) : display === 'goals' ? (
            goals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <GoalCard key={goal._id} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400 italic">No goals yet.</div>
            )
          ) : null}
        </div>
        </div>
      </main>

      <ExplorePeople
        currentUserId={currentUserId}
        filteredUsers={filteredUsers}
        followHandler={followHandler}
        unfollowHandler={unfollowHandler}
      />
    </div>
  );
};

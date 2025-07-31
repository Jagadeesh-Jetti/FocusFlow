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

  const curentUserId = user._id;
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
    await dispatch(getUserProfile(curentUserId));
  };

  const unfollowHandler = async (id) => {
    await dispatch(unfollowUser(id));
    await dispatch(getAllUsers());
    await dispatch(getUserProfile(curentUserId));
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
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 px-6 py-10 border ">
        <div className="bg-blue-100 h-40 w-[100%] relative">
          <div className="bg-yellow-300 h-15 w-15 absolute  -bottom-4 left-2 rounded-lg">
            <div className="m-1 h-13 w-13 bg-amber-950 rounded-lg"> </div>
          </div>
        </div>

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

        <div>
          {display === 'posts' ? (
            filteredPosts.length > 0 ? (
              filteredPosts.map((post) => <PostCard post={post} />)
            ) : (
              <div> NO post yet</div>
            )
          ) : display === 'goals' ? (
            goals.map((goal) => <GoalCard goal={goal} />)
          ) : (
            <div> NO goals yet</div>
          )}
        </div>
      </main>

      <ExplorePeople
        curentUserId={curentUserId}
        filteredUsers={filteredUsers}
        followHandler={followHandler}
        unfollowHandler={unfollowHandler}
      />
    </div>
  );
};

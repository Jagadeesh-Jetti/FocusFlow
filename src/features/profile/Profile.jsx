import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { getPosts } from '../community/feedThunk';
import { PostCard } from '../community/postComponents/PostCard';
import { getGoals } from '../goals/goalThunk';
import { GoalCard } from '../goals/goalComponents/GoalCard';
import { AddButton } from '../../components/AddButton';
import { EditProfileModal } from './profileComponents/ProfileModal';
// import { formatDistanceToNow } from 'date-fns';

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { postList: posts } = useSelector((s) => s.post);
  const { goalsList: goals } = useSelector((state) => state.goal);
  const [display, setDisplay] = useState('posts');
  const [open, setOpen] = useState(false);

  console.log(goals);
  const filteredPosts = posts.filter((post) => post.user._id === user._id);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getGoals());
  }, [dispatch]);

  if (!user) return <div className="text-center mt-20">Loading user...</div>;

  console.log(user);
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 px-6 py-10 border border-green-500">
        <div className="bg-blue-100 h-40 w-[100%] relative">
          <div className="bg-yellow-300 h-15 w-15 absolute  -bottom-4 left-2 rounded-lg">
            <div className="m-1 h-13 w-13 bg-amber-950 rounded-lg"> </div>
          </div>
        </div>

        <div className="flex pl-2 justify-between bg-amber-50">
          <div>
            <div className="pt-8  text-2xl font-bold">{user?.name}</div>
            <div className="flex gap-3 opacity-70">
              <div> shot bio </div>
              <div> from vijayawada </div>
            </div>
          </div>
          <div className="mt-5" onClick={() => setOpen(true)}>
            <AddButton text="Edit Profile" />
          </div>
        </div>

        <EditProfileModal
          user={user}
          isOpen={open}
          onClose={() => setOpen(false)}
        />

        <div className="flex bg-amber-500 mt-6 gap-3">
          <div className="flex border justify-around gap-2 ">
            <div className="p-2">icon</div>
            <div className="p-2">
              <div> 25 </div>
              <div>friends</div>
            </div>
          </div>
          <div className="flex border justify-around gap-2">
            <div className="p-2">icon</div>
            <div className="p-2">
              <div> 25 </div>
              <div>friends</div>
            </div>
          </div>
          <div className="flex border justify-around gap-2">
            <div className="p-2">icon</div>
            <div className="p-2">
              <div> 25 </div>
              <div>friends</div>
            </div>
          </div>
        </div>

        <div className="flex mt-8 bg-red-50 justify-between">
          <div className="flex ">
            <div className="p-3" onClick={() => setDisplay('posts')}>
              Posts
            </div>
            <div className="p-3" onClick={() => setDisplay('goals')}>
              Goals
            </div>
          </div>

          <div className="flex justify-center align-middle">
            Sort by:
            <select>
              <option value="">All</option>
              <option value="">Most Popular</option>
            </select>
          </div>
        </div>

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
      <div className="w-[30%] p-10 bg-amber-100">
        <div>Who to follow?</div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-base font-medium text-gray-800">{value}</p>
  </div>
);

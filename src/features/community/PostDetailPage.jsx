import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { commentPost, getPosts, toggleLikePost } from './feedThunk';
import { Heart, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export const PostDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { postList: posts, loading } = useSelector((s) => s.post);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (!posts?.length) {
      dispatch(getPosts());
    }
  }, [dispatch, posts?.length]);

  const filteredPost = posts.find((post) => post._id === id);

  if (loading && !filteredPost) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="m-10 text-gray-500">Loading post…</div>
      </div>
    );
  }

  if (!filteredPost) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="m-10">
          <button
            className="bg-blue-200 p-1 mb-4"
            onClick={() => navigate('/feed')}
          >
            Back
          </button>
          <div className="text-gray-600">
            Post not found. It may have been deleted.
          </div>
        </div>
      </div>
    );
  }

  const hasLiked = filteredPost.likes?.includes(currentUser?._id);

  const likeHandler = () => {
    dispatch(toggleLikePost(filteredPost._id));
  };

  const commentHandler = () => {
    if (!commentText.trim()) return;
    dispatch(commentPost({ id: filteredPost._id, comment: commentText }));
    setCommentText('');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-10">
        <div className="flex justify-around">
          <button className="bg-blue-200 p-1" onClick={() => navigate('/feed')}>
            Back
          </button>
          <div className="text-2xl font-black"> Post </div>
        </div>

        <div className="m-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold shadow-inner">
              {filteredPost.user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-base md:text-lg text-gray-800">
                {filteredPost.user?.name}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredPost.relatedGoal?.title &&
                  `🎯 ${filteredPost.relatedGoal.title}`}
                {filteredPost.relatedMilestone?.title &&
                  ` • 🛠️ ${filteredPost.relatedMilestone.title}`}
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {filteredPost.content}
          </p>
          {filteredPost.image && (
            <img
              src={filteredPost.image}
              alt="post"
              className="w-full h-auto rounded-lg object-cover mb-4 border"
            />
          )}

          <div className="flex items-center gap-6 text-gray-500 text-sm mb-2">
            <button
              onClick={likeHandler}
              className={`flex items-center gap-1 transition-all ${
                hasLiked ? 'text-red-500' : 'hover:text-red-500'
              }`}
            >
              <Heart className="w-5 h-5" fill={hasLiked ? 'red' : 'none'} />
              <span>{filteredPost.likes?.length || 0}</span>
            </button>

            <div className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span>{filteredPost.comments?.length || 0}</span>
            </div>
          </div>

          <form
            className="flex gap-3 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              commentHandler();
            }}
          >
            <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold shadow-inner">
              {currentUser?.name?.[0]?.toUpperCase()}
            </div>
            <input
              type="text"
              placeholder="Comment your thoughts"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

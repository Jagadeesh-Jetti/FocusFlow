import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { commentPost, toggleLikePost } from './feedThunk';
import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export const PostDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { postList: posts } = useSelector((s) => s.post);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState('');

  const filteredPost = posts.find((post) => post._id === id);

  const hasLiked = filteredPost.likes.includes(currentUser?._id);
  //   const hasCommented = filteredPost.comments.find(
  //     (comment) =>
  //       comment.user === currentUser._id || comment.user?._id === currentUser._id
  //   );

  const likeHandler = () => {
    dispatch(toggleLikePost(filteredPost._id));
  };

  const commentHandler = () => {
    console.log(commentText);
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

            <button
              onClick={commentHandler}
              className="flex items-center gap-1 hover:text-blue-500 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{filteredPost.comments?.length || 0}</span>
            </button>
          </div>

          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold shadow-inner">
              {currentUser?.name?.[0]?.toUpperCase()}
            </div>
            <input
              type="text"
              placeholder="comment your thoughts"
              className="border-none"
            />
            <button>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

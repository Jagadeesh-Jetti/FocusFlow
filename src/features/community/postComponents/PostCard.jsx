import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLikePost, commentPost } from '../feedThunk';
import { useNavigate } from 'react-router-dom';

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState('');

  const {
    _id,
    user,
    content,
    image,
    likes = [],
    comments = [],
    relatedGoal,
    relatedMilestone,
  } = post;

  const hasLiked = currentUser?._id ? likes.includes(currentUser._id) : false;
  const hasCommented = currentUser?._id
    ? comments.some(
        (comment) =>
          comment.user === currentUser._id ||
          comment.user?._id === currentUser._id
      )
    : false;

  const likeHandler = (e) => {
    e.stopPropagation();
    dispatch(toggleLikePost(_id));
  };

  const commentHandler = (e) => {
    e?.stopPropagation();
    if (!commentText.trim()) return;
    dispatch(commentPost({ id: _id, comment: commentText }));
    setCommentText('');
  };

  return (
    <div
      className=" w-100  rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/feed/${post._id}`)}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold shadow-inner">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-base md:text-lg text-gray-800">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500">
            {relatedGoal?.title && `🎯 ${relatedGoal.title}`}
            {relatedMilestone?.title && ` • 🛠️ ${relatedMilestone.title}`}
          </p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed mb-4">{content}</p>
      {image && (
        <img
          src={image}
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
          <span>{likes?.length || 0}</span>
        </button>

        <div className="flex items-center gap-1 text-gray-500">
          <MessageCircle className="w-5 h-5" />
          <span>{comments?.length || 0}</span>
        </div>
      </div>

      {!hasCommented && (
        <form
          className="flex items-center gap-2 mt-2"
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            commentHandler(e);
          }}
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Comment here..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

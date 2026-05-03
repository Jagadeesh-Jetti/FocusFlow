import { useState } from 'react';
import { Heart, MessageCircle, Target, Flag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLikePost, commentPost } from '../feedThunk';
import { useNavigate } from 'react-router-dom';

const formatTime = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB');
};

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
    createdAt,
    likes = [],
    comments = [],
    relatedGoal,
    relatedMilestone,
  } = post;

  const hasLiked = currentUser?._id ? likes.includes(currentUser._id) : false;
  const hasCommented = currentUser?._id
    ? comments.some(
        (c) =>
          c.user === currentUser._id || c.user?._id === currentUser._id
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
    <article
      onClick={() => navigate(`/feed/${_id}`)}
      className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition cursor-pointer"
    >
      <header className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold shrink-0">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate">
            {user?.name}
          </div>
          {createdAt && (
            <div className="text-xs text-gray-500">{formatTime(createdAt)}</div>
          )}
        </div>
      </header>

      {(relatedGoal?.title || relatedMilestone?.title) && (
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          {relatedGoal?.title && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              <Target className="w-3 h-3" />
              {relatedGoal.title}
            </span>
          )}
          {relatedMilestone?.title && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              <Flag className="w-3 h-3" />
              {relatedMilestone.title}
            </span>
          )}
        </div>
      )}

      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-3">
        {content}
      </p>

      {image && (
        <img
          src={image}
          alt=""
          className="w-full max-h-96 rounded-xl object-cover mb-3 border border-gray-100"
        />
      )}

      <div className="flex items-center gap-5 text-sm text-gray-500 mb-3">
        <button
          onClick={likeHandler}
          className={`flex items-center gap-1.5 transition-colors ${
            hasLiked ? 'text-red-600' : 'hover:text-red-600'
          }`}
        >
          <Heart
            className="w-4 h-4"
            fill={hasLiked ? 'currentColor' : 'none'}
          />
          <span>{likes.length}</span>
        </button>
        <div className="flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4" />
          <span>{comments.length}</span>
        </div>
      </div>

      {!hasCommented && (
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            commentHandler(e);
          }}
          className="flex gap-2 pt-3 border-t border-gray-100"
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment…"
            className="flex-1 text-sm px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="text-sm bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg"
          >
            Post
          </button>
        </form>
      )}
    </article>
  );
};

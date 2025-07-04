import { Heart, MessageCircle } from 'lucide-react';

export const PostCard = ({ post }) => {
  const {
    user,
    content,
    image,
    likes,
    comments,
    relatedGoal,
    relatedMilestone,
  } = post;

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 transition hover:shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">
            {relatedGoal?.title && `Goal: ${relatedGoal.title}`}
            {relatedMilestone?.title &&
              ` • Milestone: ${relatedMilestone.title}`}
          </p>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{content}</p>

      {image && (
        <img
          src={image}
          alt="post"
          className="w-full h-auto rounded-md object-cover mb-4"
        />
      )}

      <div className="flex items-center gap-6 text-gray-600">
        <button className="flex items-center gap-1 hover:text-red-500 transition">
          <Heart className="w-5 h-5" />
          <span>{likes?.length || 0}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500 transition">
          <MessageCircle className="w-5 h-5" />
          <span>{comments?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

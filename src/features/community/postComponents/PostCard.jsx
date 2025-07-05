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
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
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

      <div className="flex items-center gap-6 text-gray-500 text-sm">
        <button className="flex items-center gap-1 hover:text-red-500 transition-all">
          <Heart className="w-5 h-5" />
          <span>{likes?.length || 0}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500 transition-all">
          <MessageCircle className="w-5 h-5" />
          <span>{comments?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

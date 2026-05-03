import { useState } from 'react';

const SIZE_CLASS = {
  xs: 'w-7 h-7',
  sm: 'w-9 h-9',
  md: 'w-10 h-10',
  lg: 'w-11 h-11',
  xl: 'w-24 h-24',
};

const dicebearUrl = (seed) =>
  `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${encodeURIComponent(
    seed || 'user'
  )}&radius=50&backgroundColor=d1fae5,ccfbf1,a7f3d0,99f6e4,f0fdfa`;

export const Avatar = ({ user, size = 'md', className = '' }) => {
  const seed = user?._id || user?.name || 'user';
  const fallback = dicebearUrl(seed);
  const initialSrc =
    user?.profilePic && user.profilePic.trim() ? user.profilePic : fallback;

  const [src, setSrc] = useState(initialSrc);

  const sizeClass = SIZE_CLASS[size] || SIZE_CLASS.md;

  return (
    <span
      className={`inline-flex shrink-0 rounded-full overflow-hidden bg-emerald-50 ${sizeClass} ${className}`}
    >
      <img
        src={src}
        alt={user?.name || ''}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => {
          if (src !== fallback) setSrc(fallback);
        }}
        className="w-full h-full object-cover"
      />
    </span>
  );
};

import { AddButton } from '@/components/AddButton';

export const ProfileHeroContent = ({ profile, enableEditing, setOpen }) => {
  const followingCount = profile?.following?.length || 0;
  const followersCount = profile?.followers?.length || 0;

  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{profile?.name}</h1>
        {(profile?.bio || profile?.location) && (
          <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-600 dark:text-slate-400">
            {profile?.bio && <span>{profile.bio}</span>}
            {profile?.location && (
              <span className="text-gray-400 dark:text-slate-600">·</span>
            )}
            {profile?.location && <span>{profile.location}</span>}
          </div>
        )}
        <div className="flex gap-4 mt-3 text-sm text-gray-600 dark:text-slate-400">
          <span>
            <span className="font-semibold text-gray-900 dark:text-slate-100">
              {followingCount}
            </span>{' '}
            following
          </span>
          <span>
            <span className="font-semibold text-gray-900 dark:text-slate-100">
              {followersCount}
            </span>{' '}
            followers
          </span>
        </div>
      </div>
      {enableEditing && (
        <div onClick={() => setOpen(true)}>
          <AddButton text="Edit Profile" />
        </div>
      )}
    </div>
  );
};

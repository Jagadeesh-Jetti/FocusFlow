import { AddButton } from '@/components/AddButton';

export const ProfileHeroContent = ({ profile, enableEditing, setOpen }) => {
  return (
    <div className="flex pl-2 justify-between ">
      <div>
        <div className="pt-8  text-2xl font-bold">{profile?.name}</div>
        <div className="flex gap-3 opacity-70">
          <div> {profile.bio} </div>
          <div> {profile.location}</div>
        </div>
        <div className="flex gap-2">
          <div> {profile?.following.length} following</div>
          <div> {profile?.followers.length} followers </div>
        </div>
      </div>
      {enableEditing && (
        <div className="mt-5" onClick={() => setOpen(true)}>
          <AddButton text="Edit Profile" />
        </div>
      )}
    </div>
  );
};

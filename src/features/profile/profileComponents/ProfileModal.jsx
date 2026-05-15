import { useState } from 'react';
import { Modal } from '@/components/Modal';

const INPUT_CLASS =
  'w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500';
const LABEL_CLASS = 'block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1';

export const EditProfileModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    location: user.location || '',
    profilePic: user.profilePic || '',
    bannerPic: user.bannerPic || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="profile-name" className={LABEL_CLASS}>
            Name
          </label>
          <input
            id="profile-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="profile-bio" className={LABEL_CLASS}>
            Bio
          </label>
          <textarea
            id="profile-bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className={INPUT_CLASS}
            placeholder="A short intro"
          />
        </div>

        <div>
          <label htmlFor="profile-location" className={LABEL_CLASS}>
            Location
          </label>
          <input
            id="profile-location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="City, country"
          />
        </div>

        <div>
          <label htmlFor="profile-pic" className={LABEL_CLASS}>
            Profile picture URL
          </label>
          <input
            id="profile-pic"
            type="url"
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="https://…"
          />
          {formData.profilePic && (
            <img
              src={formData.profilePic}
              alt=""
              className="w-16 h-16 rounded-full mt-2 object-cover border border-gray-200 dark:border-slate-700"
            />
          )}
        </div>

        <div>
          <label htmlFor="banner-pic" className={LABEL_CLASS}>
            Banner image URL
          </label>
          <input
            id="banner-pic"
            type="url"
            name="bannerPic"
            value={formData.bannerPic}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="https://…"
          />
          {formData.bannerPic && (
            <img
              src={formData.bannerPic}
              alt=""
              className="w-full h-24 object-cover rounded-lg mt-2 border border-gray-200 dark:border-slate-700"
            />
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

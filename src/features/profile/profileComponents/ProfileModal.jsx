import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const EditProfileModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    location: user.location || '',
    profilePic: user.profilePic || '',
    bannerPic: user.bannerPic || '', // optional, if added to schema
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-full p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Banner image preview */}
          {formData.bannerPic && (
            <img
              src={formData.bannerPic}
              alt="Banner"
              className="w-full h-32 object-cover rounded-lg"
            />
          )}
          <Input
            type="text"
            name="bannerPic"
            placeholder="Banner image URL"
            value={formData.bannerPic}
            onChange={handleChange}
          />

          {/* Profile pic preview */}
          {formData.profilePic && (
            <img
              src={formData.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto"
            />
          )}
          <Input
            type="text"
            name="profilePic"
            placeholder="Profile image URL"
            value={formData.profilePic}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <Textarea
            name="bio"
            placeholder="Your bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

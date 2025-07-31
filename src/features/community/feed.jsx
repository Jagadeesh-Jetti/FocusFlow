import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../components/Modal';
import { PostCard } from './postComponents/PostCard';
import { createPost, getPosts } from './feedThunk';
import { ExplorePeople } from '@/components/ExplorePeople';
import { getAllUsers } from '../profile/profileThunk';

export const Feed = () => {
  const { postList: posts, error, isLoading } = useSelector((s) => s.post);
  const { allUsers } = useSelector((s) => s.profile);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    content: '',
    image: null,
  });

  const filteredUsers = allUsers.filter((u) => u._id !== user._id);
  // console.log(allUsers);
  // console.log(filteredUsers);

  const resetForm = () => {
    setShowModal(false);
    setSubmitting(false);
    setForm({ content: '', image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) return;

    setSubmitting(true);

    const data = new FormData();
    data.append('content', form.content);
    if (form.image) data.append('image', form.image);

    try {
      const res = await dispatch(createPost(data));
      if (createPost.fulfilled.match(res)) {
        dispatch(getPosts());
        resetForm();
      } else {
        setSubmitting(false);
      }
    } catch (err) {
      console.error('Post creation failed:', err);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className=" md:p-8 max-w-2xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          {/* <div></div> */}
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            ✨ Circles
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-md transition-all"
          >
            + Create Post
          </button>
        </div>

        <Modal isOpen={showModal} onClose={resetForm} title="Share Update">
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full p-4 rounded-xl border bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={4}
              placeholder="What's on your mind?"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />

            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] || null })
              }
            />

            <button
              type="submit"
              disabled={submitting}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-full w-full shadow-sm"
            >
              {submitting ? 'Sharing…' : 'Share'}
            </button>
          </form>
        </Modal>

        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : isLoading && posts.length === 0 ? (
          <p className="text-center text-gray-500 animate-pulse">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No posts yet. Be the first to share your progress!
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        )}
      </main>
      <ExplorePeople filteredUsers={filteredUsers} />
    </div>
  );
};

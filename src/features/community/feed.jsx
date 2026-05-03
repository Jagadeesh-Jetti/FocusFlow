import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../components/Modal';
import { PostCard } from './postComponents/PostCard';
import { createPost, getPosts } from './feedThunk';
import { ExplorePeople } from '@/components/ExplorePeople';
import { getAllUsers } from '../profile/profileThunk';

export const Feed = () => {
  const { postList: posts, error, loading } = useSelector((s) => s.post);
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
        await dispatch(getPosts());
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 md:p-10 max-w-3xl mx-auto w-full">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Community
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Share progress. Cheer each other on.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <span className="text-lg leading-none">+</span> New post
          </button>
        </header>

        <Modal isOpen={showModal} onClose={resetForm} title="Share an update">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="post-content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                What's on your mind?
              </label>
              <textarea
                id="post-content"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm"
                rows={4}
                placeholder="Share progress, an insight, or a question…"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                htmlFor="post-image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="post-image"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] || null })
                }
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {submitting ? 'Sharing…' : 'Share'}
            </button>
          </form>
        </Modal>

        {error ? (
          <div className="text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            {error}
          </div>
        ) : loading && posts.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse"
              >
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-2 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded mb-2" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              The feed is quiet
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Be the first to share progress on your goals.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg"
            >
              + Share your first post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
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

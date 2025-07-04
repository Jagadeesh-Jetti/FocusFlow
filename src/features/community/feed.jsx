import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../components/Modal';
import { PostCard } from './postComponents/PostCard';
import { createPost, getPosts } from './feedThunk';

export const Feed = () => {
  const { postList: posts, error, isLoading } = useSelector((s) => s.post);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    content: '',
    image: null, // store File object here
  });

  const resetForm = () => {
    setShowModal(false);
    setSubmitting(false);
    setForm({ content: '', image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // build multipart body
    const data = new FormData();
    data.append('content', form.content);
    if (form.image) data.append('image', form.image);

    // dispatch thunk → returns the created post
    const res = await dispatch(createPost(data));

    if (createPost.fulfilled.match(res)) {
      dispatch(getPosts()); // refresh list
      resetForm();
    } else {
      // the slice already stores error; just stop submitting
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Circles</h1>
          <button
            className="text-gray-400 hover:text-black font-medium text-sm transition"
            onClick={() => setShowModal(true)}
          >
            Create Post
          </button>
        </div>

        <Modal isOpen={showModal} onClose={resetForm} title="Add Post">
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full p-3 rounded-md border bg-gray-100 resize-none"
              rows={4}
              placeholder="What's on your mind?"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] || null })
              }
            />

            <button
              type="submit"
              disabled={submitting}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-full w-full"
            >
              {submitting ? 'Sharing…' : 'Share'}
            </button>
          </form>
        </Modal>

        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : isLoading && posts.length === 0 ? (
          <p className="text-center text-gray-500">Loading…</p>
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
      </div>
    </div>
  );
};

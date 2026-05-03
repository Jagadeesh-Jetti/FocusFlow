import { Plus } from 'lucide-react';

export const AddButton = ({ text, setShowModal, onClick }) => {
  const handleClick = () => {
    if (onClick) return onClick();
    if (setShowModal) setShowModal(true);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-colors"
    >
      <Plus className="w-4 h-4" />
      <span>{text}</span>
    </button>
  );
};

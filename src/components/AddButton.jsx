import { Plus } from 'lucide-react';

export const AddButton = ({ text, setShowModal, onClick }) => {
  const handleClick = () => {
    if (onClick) return onClick();
    if (setShowModal) setShowModal(true);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 active:scale-[0.97] text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all duration-150 ring-1 ring-inset ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      <Plus className="w-4 h-4" strokeWidth={2.5} />
      <span>{text}</span>
    </button>
  );
};

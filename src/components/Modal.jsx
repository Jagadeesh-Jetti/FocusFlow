export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-md z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold"> {title} </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-2xl"
          >
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

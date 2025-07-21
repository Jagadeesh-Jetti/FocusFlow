export const AddButton = ({ text, setShowModal }) => {
  return (
    <button
      className="bg-gray-600 text-white cursor-pointer font-semibold w-40 rounded-md p-3 m-2
            hover:bg-gray-700 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
      onClick={() => setShowModal(true)}
    >
      {text}
    </button>
  );
};

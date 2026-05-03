const TONE = {
  blue: 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-50',
  red: 'text-gray-600 hover:text-red-600 hover:bg-red-50',
  gray: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
};

export const ActionButton = ({ title, onClick, color = 'gray' }) => {
  const tone = TONE[color] || TONE.gray;

  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium rounded-md px-2.5 py-1 transition-colors ${tone}`}
    >
      {title}
    </button>
  );
};

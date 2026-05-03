const TONE = {
  blue: 'text-gray-600 dark:text-slate-400 hover:text-emerald-700 hover:bg-emerald-50',
  red: 'text-gray-600 dark:text-slate-400 hover:text-red-600 hover:bg-red-50',
  gray: 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 dark:bg-slate-800',
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

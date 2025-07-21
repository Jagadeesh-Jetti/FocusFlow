export const ActionButton = ({ title, onClick, color }) => {
  const baseColor = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      hover: 'hover:bg-blue-200',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      hover: 'hover:bg-red-200',
    },
    gray: {
      bg: 'bg-gray-100',
      text: 'text-red-800',
      hover: 'hover:bg-red-200',
    },
  }[color];

  return (
    <button
      className={`text-sm bg-blue-100 text-blue-800 font-medium  rounded px-3 py-1 hover:bg-blue-200 hover:cursor-pointer cover:scale-105 hover:shadow-lg transition ${baseColor.bg} ${baseColor.text} ${baseColor.hover}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

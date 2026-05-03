import { useState } from 'react';

export const ProfileMenuBar = ({ setDisplay }) => {
  const [active, setActive] = useState('posts');

  const tabs = [
    { key: 'posts', label: 'Posts' },
    { key: 'goals', label: 'Goals' },
  ];

  const select = (key) => {
    setActive(key);
    setDisplay(key);
  };

  return (
    <nav
      className="flex border-b border-gray-200 dark:border-slate-700 mt-6"
      role="tablist"
      aria-label="Profile content"
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={active === t.key}
          onClick={() => select(t.key)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === t.key
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100'
          }`}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
};

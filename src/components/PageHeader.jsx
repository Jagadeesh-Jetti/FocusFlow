import { AddButton } from './AddButton';

export const PageHeader = ({ title, subtitle, buttonLabel, setShowModal }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      {buttonLabel && (
        <AddButton text={buttonLabel} setShowModal={setShowModal} />
      )}
    </div>
  );
};

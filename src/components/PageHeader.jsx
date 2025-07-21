import { AddButton } from './AddButton';

export const PageHeader = ({ title, buttonLabel, setShowModal }) => {
  return (
    <div className="flex justify-between m-2">
      <div className="text-3xl m-3 font-bold"> {title}</div>
      <AddButton text={buttonLabel} setShowModal={setShowModal} />
    </div>
  );
};

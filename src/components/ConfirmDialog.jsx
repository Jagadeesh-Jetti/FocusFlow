import { Modal } from './Modal';

export const ConfirmDialog = ({
  isOpen,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      {message && (
        <p className="text-sm text-gray-600 mb-5 leading-relaxed">{message}</p>
      )}
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
            destructive
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

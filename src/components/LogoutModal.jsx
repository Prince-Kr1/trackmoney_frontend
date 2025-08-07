import ReactDOM from 'react-dom';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl shadow-2xl w-[80%] max-w-sm p-6 sm:p-8 animate-fadeIn">
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Logout Confirmation!
        </h3>
        <p className="text-gray-600 text-sm mt-2 text-center">
          Are you sure you want to logout?
        </p>

        <div className="mt-6 flex sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            No, Stay
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-5 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-500/90 transition"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') // ✅ Render to modal-root outside sidebar
  );
};

export default LogoutModal;

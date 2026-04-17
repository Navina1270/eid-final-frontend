import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalComponent = ({ heading, modalData, onClose, isHeading = true }) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center" style={{ top: "64px", bottom: "24px" }}>
      <div className="bg-slate-800 p-4 rounded-xl shadow-lg ring-2 ring-slate-700 w-full max-w-3xl text-gray-300 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 bg-slate-800 hover:bg-slate-600 rounded z-50"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {isHeading && (
          <>
            <h2 className="text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
              {heading}
            </h2>
            <div className="bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-lime-400"></div>
          </>
        )}

        <div className="max-h-[65vh] overflow-y-auto custom-scrollbar">{modalData}</div>
      </div>
    </div>,
    document.body 
  );
};

export default ModalComponent;

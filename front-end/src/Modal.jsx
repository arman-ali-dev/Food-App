import ReactDom from "react-dom";

const Modal = ({ children, onClose }) => {
  return ReactDom.createPortal(
    <>
      <div className="back-view">
        <div className="modal">
          <button
            className="btn btn-danger closeBtn px-3 fs-5 rounded-0 text-right"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;

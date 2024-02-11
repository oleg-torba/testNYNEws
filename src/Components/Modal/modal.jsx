import { createPortal } from "react-dom";
import modalCss from "./modal.module.css";

const mobModal = document.querySelector("#modal-root");

export function Modal({ children, onClose }) {
  return createPortal(
    <div className={modalCss.modal}>
      <div onClick={onClose}>{children}</div>
    </div>,
    mobModal
  );
}

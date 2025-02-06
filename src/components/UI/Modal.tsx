import { forwardRef, useImperativeHandle, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "../../styles/UI/Modal.module.css";
interface ModalProps {
  children: ReactNode;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current?.showModal();
    },
    close: () => {
      dialog.current?.close();
    },
  }));

  return createPortal(
    <dialog className={styles.modal} ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
});

export default Modal;

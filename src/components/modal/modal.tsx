import modalStyle from './modal.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  header?: string;
};

const Modal: React.FC<TModalProps> = ({ children, header, onClose }) => {
  const modalRoot: HTMLElement | null = document.getElementById("react-modals");

  const handleEsc = React.useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    document.body.addEventListener("keydown", handleEsc);

    return () => {
      document.body.removeEventListener("keydown", handleEsc);
    };
  }, [handleEsc])

  return modalRoot && ReactDOM.createPortal((
      <>
        <div
        className={`pr-10 pl-10 pt-10 ${modalStyle['modal']}`}>
          <div
          className={`${modalStyle['modal__header']}`}>
            <h2
            className={`text text_type_main-large ${modalStyle['modal__title']}`}>
              { header }
            </h2>

            <button
            onClick={onClose}
            className={modalStyle['modal__close-btn']}>
              <CloseIcon
              type="primary"/>
            </button>
          </div>

          { children }
        </div>

        <ModalOverlay
        onClose={onClose}/>
      </>
    ),
    modalRoot
  );
};

export default Modal;

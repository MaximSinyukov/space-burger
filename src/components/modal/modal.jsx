import modalStyle from './modal.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Modal({ children, header, onClose }) {
  const modalRoot = document.getElementById("react-modals");
  const handleEsc = React.useCallback(
    (e) => {
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

  return ReactDOM.createPortal((
      <>
        <div
        className={`pr-10 pl-10 pt-10 pb-15 ${modalStyle['modal']}`}>
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

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

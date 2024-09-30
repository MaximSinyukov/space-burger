import modalOverlayStyle from './modal-overlay.module.css';
import React from 'react';
import PropTypes from 'prop-types';

function ModalOverlay({ onClose }) {
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

  return (
    <div
    onClick={onClose}
    className={modalOverlayStyle['modal-overlay']}/>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;

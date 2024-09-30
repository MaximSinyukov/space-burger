import modalOverlayStyle from './modal-overlay.module.css';
import React from 'react';
import PropTypes from 'prop-types';

function ModalOverlay({ onClose }) {
  const handkeEsc = (e) => {
    if (e.key === "Escape") {
      console.log('ESCAPE');
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("keydown", handkeEsc);

    return () => {
      document.body.removeEventListener("keydown", handkeEsc);
    };
  }, [])

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

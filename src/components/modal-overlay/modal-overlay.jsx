import modalOverlayStyle from './modal-overlay.module.css';
import React from 'react';

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
}

export default ModalOverlay;

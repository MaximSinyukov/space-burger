import modalOverlayStyle from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onClose }) {
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

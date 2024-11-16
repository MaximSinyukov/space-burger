import modalOverlayStyle from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: () => void;
};

function ModalOverlay({ onClose }: IModalOverlayProps) {
  return (
    <div
    onClick={onClose}
    className={modalOverlayStyle['modal-overlay']}/>
  );
};

export default ModalOverlay;

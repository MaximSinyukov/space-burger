import modalOverlayStyle from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
};

function ModalOverlay({ onClose }: TModalOverlayProps) {
  return (
    <div
    onClick={onClose}
    className={modalOverlayStyle['modal-overlay']}/>
  );
};

export default ModalOverlay;

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const modalRoot = document.getElementById('modals');

const ModalOverlay = ({ children, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target !== e.currentTarget) return;
    onClose(e);
  };

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key !== 'Escape') return;
      onClose(e);
    };
    window.addEventListener('keydown', closeByEscape);
    return () => window.removeEventListener('keydown', closeByEscape);
  }, [onClose]);

  return ReactDOM.createPortal(
    (
      <div data-cy="modal-overlay" onClick={(handleOverlayClick)} className={styles.overlay}>
        { children }
      </div>
    ),
    modalRoot,
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default ModalOverlay;

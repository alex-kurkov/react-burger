import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modals');

const Modal = ({ title = '', onClose, children = null }) => {
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
        <div className={`${styles.modal} p-5 pb-10`} data-cy="modal">
          <div className={`${styles.title_icon_wrap}`}>
            <h3 className="text text_type_main-large mr-4">{title}</h3>
            <CloseIcon type="primary" onClick={onClose} data-cy="modal-closeBtn" />
          </div>
          {children}
        </div>
      </div>
    ),
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;

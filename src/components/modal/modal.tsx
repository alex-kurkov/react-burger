import { useEffect, FC, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './modal.module.css';

const modalRoot: Element | null = document.getElementById('modals');

const Modal: FC<{
  title: string;
  onClose: () => void;
}> = ({ title = '', onClose, children }) => {
  if (!modalRoot) return null;
  const handleOverlayClick = (e: SyntheticEvent) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };

  useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      onClose();
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

export default Modal;

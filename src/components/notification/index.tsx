import { useEffect, useState, FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './notification.module.css';

const notificationRoot: Element | null = document.getElementById('notification');

export const Notification: FC<{
  onClose: () => void;
  lifeTime?: number;
}> = ({ children, onClose, lifeTime = 3000 }) => {
  const [leave, setLeave] = useState<boolean>(false);
  useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      onClose();
    };
    window.addEventListener('click', onClose);
    window.addEventListener('keydown', closeByEscape);
    return () => {
      window.removeEventListener('keydown', closeByEscape);
      window.removeEventListener('click', onClose);
    };
  }, [onClose, lifeTime]);

  useEffect(() => {
    const leaveId = setTimeout(() => setLeave(true), lifeTime - 1000);
    const fadeId = setTimeout(() => onClose(), lifeTime);
    return () => {
      clearTimeout(leaveId);
      clearTimeout(fadeId);
    };
  }, [lifeTime, onClose]);

  return notificationRoot && ReactDOM.createPortal(
    (
      <div className={`${styles.wrap} ${leave && styles.fade} text text_type_main-small`}>
        { children }
      </div>
    ),
    notificationRoot,
  );
};

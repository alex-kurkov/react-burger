import {
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './notification.module.css';

const notificationRoot = document.getElementById('notification');

export const Notification = ({ children, onClose, lifeTime = 3000 }) => {
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key !== 'Escape') return;
      onClose(e);
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

  return ReactDOM.createPortal(
    (
      <div className={`${styles.wrap} ${leave && styles.fade} text text_type_main-small`}>
        { children }
      </div>
    ),
    notificationRoot,
  );
};

Notification.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  lifeTime: PropTypes.number,
};

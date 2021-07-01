import { FC } from 'react';
import {
  CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './done-icon.module.css';

const DoneIcon: FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className={`${styles.done} mb-5`} onClick={onClose}>
    <CheckMarkIcon type="primary" />
    <div className={`${styles.vector_1} ${styles.vector}`}>
      <div className={`${styles.vector_2} ${styles.vector}`}>
        <div className={`${styles.vector_3} ${styles.vector}`} />
      </div>
    </div>
  </div>
);

export default DoneIcon;

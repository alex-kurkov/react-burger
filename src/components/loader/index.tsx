import { FC } from 'react';
import styles from './styles.module.css';

export const Loader: FC = () => (
  <div className={styles.overlay}>
    <div className={`${styles.wrap}`}>
      <div className={`${styles.vector_1} ${styles.vector}`}>
        <div className={`${styles.vector_2} ${styles.vector}`}>
          <div className={`${styles.vector_3} ${styles.vector}`} />
        </div>
      </div>
      <p className="text text_type_main-default text_color_inactive mt-4">Loading...</p>
    </div>
  </div>
);

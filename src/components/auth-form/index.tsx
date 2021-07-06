import { FC } from 'react';
import styles from './styles.module.css';

export const AuthForm: FC< { title?: string; onSubmit: () => void } > = ({ title, onSubmit, children }) => (
  <main className={styles.main}>
    <div className={styles.wrapper}>
      <h2 className={`${styles.heading} mb-6`}>{title}</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}>
        {children}
      </form>
    </div>
  </main>
);

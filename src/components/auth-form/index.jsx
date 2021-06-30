import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const AuthForm = ({ title, children }) => (
  <main className={styles.main}>
    <div className={styles.wrapper}>
      <h2 className={`${styles.heading} mb-6`}>{title}</h2>
      <form className={styles.form}>
        {children}
      </form>
    </div>
  </main>
);

AuthForm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

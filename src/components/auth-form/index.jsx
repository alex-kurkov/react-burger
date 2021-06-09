import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const AuthForm = ({title, children}) => (
<main className={styles.main}>
  <div className={styles.wrapper}>
    <h2 className={`${styles.heading} mb-6`}>{title}</h2>
    <form className={styles.form}>
      {children}
    </form>
  </div>
</main>
)

AuthForm.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

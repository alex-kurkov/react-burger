import styles from './profile-order-details.module.css';
import { OrderDetails } from '../components/order-details';

export const ProfileOrderDetails = () => (
  <main className={styles.main}>
    <OrderDetails />
  </main>
);

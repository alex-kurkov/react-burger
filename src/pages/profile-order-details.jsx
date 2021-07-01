import { useSelector } from 'react-redux';
import styles from './profile-order-details.module.css';
import { OrderDetails } from '../components/order-details';

export const ProfileOrderDetails = () => {
  const { userOrders } = useSelector((state) => state.user);
  return (
    <main className={styles.main}>
      <OrderDetails sourceArray={userOrders} />
    </main>
  );
};

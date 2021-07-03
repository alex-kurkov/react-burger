import { FC } from 'react';
import { OrderDetails } from '../components/order-details';
import { useAppSelector } from '../hooks';
import styles from './profile-order-details.module.css';

export const ProfileOrderDetails: FC = () => {
  const { userOrders } = useAppSelector((state) => state.user);
  return (
    <main className={styles.main}>
      <OrderDetails sourceArray={userOrders} />
    </main>
  );
};

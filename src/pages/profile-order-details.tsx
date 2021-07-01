import { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile-order-details.module.css';
import { OrderDetails } from '../components/order-details';
import { IStore } from '../types';

export const ProfileOrderDetails: FC = () => {
  const { userOrders } = useSelector((state: IStore) => state.user);
  return (
    <main className={styles.main}>
      <OrderDetails sourceArray={userOrders} />
    </main>
  );
};

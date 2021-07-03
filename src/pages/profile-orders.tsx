import { useEffect, FC } from 'react';
import { ProfileMenu } from '../components/profile-menu';
import { OrderQueue } from '../components/order-queue';
import styles from './profile-orders.module.css';
import { wsAuthInit } from '../services/actions/ws';
import { closeAuthSocket } from '../services/reducers/user/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const { userOrders } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(wsAuthInit());
    return () => {
      dispatch(closeAuthSocket())
      return;
    };
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <ProfileMenu />
      <section className={styles.orders}>
        <OrderQueue orders={userOrders} />
      </section>
    </main>
  );
};

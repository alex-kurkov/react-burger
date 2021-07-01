import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileMenu } from '../components/profile-menu';
import { OrderQueue } from '../components/order-queue';
import styles from './profile-orders.module.css';
import { wsAuthInit } from '../services/actions/ws';
import { closeAuthSocket } from '../services/reducers/user/userSlice';

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(wsAuthInit());
    return () => dispatch(closeAuthSocket());
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

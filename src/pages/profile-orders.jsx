import { useSelector } from 'react-redux';
import { ProfileMenu } from '../components/profile-menu';
import { OrderQueue } from '../components/order-queue';
import styles from './profile-orders.module.css';

export const ProfileOrders = () => {
  const { userOrders } = useSelector((state) => state.user);
  return (
    <main className={styles.main}>
      <ProfileMenu />
      <section className={styles.orders}>
        <OrderQueue orders={userOrders} />
      </section>
    </main>
  );
};

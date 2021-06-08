import styles from './profile-orders.module.css';
import { ProfileMenu } from '../components/profile-menu';
import { OrderQueue } from '../components/order-queue';

export const ProfileOrders = () => (
  <main className={styles.main}>
    <ProfileMenu />
    <section className={styles.orders}> 
      <OrderQueue /> 
    </section>
  </main>
)
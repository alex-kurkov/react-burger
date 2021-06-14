import { OrderQueue } from '../components/order-queue';
import { OrderInfo } from '../components/order-info';
import styles from './feed.module.css';

export const FeedPage = () => (
  <main className={styles.main}>
    <h2 className="text text_type_main-large pt-10 mb-4">Лента заказов</h2>
    <div className={styles.content}>
      <section className={styles.section}><OrderQueue /></section>
      <section className={styles.section}><OrderInfo /></section>
    </div>
  </main>
);

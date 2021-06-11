import { OrderDetails } from '../components/order-details'
import styles from './feed-order-details.module.css';

export const FeedOrderDetailsPage = () => (
  <main className={`${styles.main} pt-20`}>
    <OrderDetails />
  </main>
)

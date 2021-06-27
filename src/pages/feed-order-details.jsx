import { useSelector } from 'react-redux';
import { OrderDetails } from '../components/order-details';
import styles from './feed-order-details.module.css';

export const FeedOrderDetailsPage = () => {
  const { orders } = useSelector((state) => state.content);
  return (
    <main className={`${styles.main} pt-20`}>
      <OrderDetails sourceArray={orders} />
    </main>
  );
};

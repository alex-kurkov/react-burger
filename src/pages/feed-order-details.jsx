import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderDetails } from '../components/order-details';
import { wsInit } from '../services/actions/ws';
import { closeSocket } from '../services/reducers/content/contentSlice';
import styles from './feed-order-details.module.css';

export const FeedOrderDetailsPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.content);
  useEffect(() => {
    dispatch(wsInit());
    return () => dispatch(closeSocket());
  }, [dispatch]);

  return (
    <main className={`${styles.main} pt-20`}>
      <OrderDetails sourceArray={orders} />
    </main>
  );
};

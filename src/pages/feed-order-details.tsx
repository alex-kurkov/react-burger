import { useEffect, FC } from 'react';
import { OrderDetails } from '../components/order-details';
import { useAppDispatch, useAppSelector } from '../hooks';
import { wsInit } from '../services/actions/ws';
import { closeSocket } from '../services/reducers/content/contentSlice';
import styles from './feed-order-details.module.css';

export const FeedOrderDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.content);
  
  useEffect(() => {
    dispatch(wsInit());
    return () => {
      dispatch(closeSocket())
      return;
    };
  }, [dispatch]);

  return (
    <main className={`${styles.main} pt-20`}>
      <OrderDetails sourceArray={orders} />
    </main>
  );
};

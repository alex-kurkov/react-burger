import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderDetails } from '../components/order-details';
import { wsInit } from '../services/actions/ws';
import { closeSocket } from '../services/reducers/content/contentSlice';
import { IStore } from '../types';
import styles from './feed-order-details.module.css';

export const FeedOrderDetailsPage: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state: IStore) => state.content);
  
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

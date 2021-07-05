import { useEffect, FC } from 'react';
import { OrderQueue } from '../components/order-queue';
import { OrderInfo } from '../components/order-info';
import styles from './feed.module.css';
import { wsInit } from '../services/actions/ws';
import { closeSocket } from '../services/reducers/content/contentSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export const FeedPage: FC = () => {
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
    <main className={styles.main}>
      <h2 className="text text_type_main-large pt-10 mb-4">Лента заказов</h2>
      <div className={styles.content}>
        <section className={styles.section}><OrderQueue orders={orders} /></section>
        <section className={styles.section}><OrderInfo /></section>
      </div>
    </main>
  );
};

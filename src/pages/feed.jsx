import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderQueue } from '../components/order-queue';
import { OrderInfo } from '../components/order-info';
import styles from './feed.module.css';
import { wsInit } from '../services/actions/ws';
import { closeSocket } from '../services/reducers/content/contentSlice';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.content);
  useEffect(() => {
    dispatch(wsInit());
    return () => dispatch(closeSocket());
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

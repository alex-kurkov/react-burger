import { FC } from 'react';
import { IOrder } from '../../types';
import { OrderCard } from './order-card';
import styles from './styles.module.css';

export const OrderQueue: FC<{orders: Array<IOrder>}> = ({ orders }) => (
  <div className={`${styles.queue} pr-4`}>
    { !!orders?.length
          && orders.map((item) => (
            <OrderCard
              data={item}
              key={item._id}
            />
          ))}
  </div>
);

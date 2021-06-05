import { OrderCard } from './order-card';
import styles from "./styles.module.css";
import { orders } from '../../utils/hardcoded-data'
import { useMemo } from 'react';

export const OrderQueue = () => {
  const queue = useMemo(() => (
    <div className={`${styles.queue} pr-4`}>
      { orders.length &&
          orders.map(item => (
            <OrderCard
              data={item}
              key={item._id}
            />
          ))
        }
    </div>
 ), [ orders ]) 


  return (
    <section className={styles.section}>
      { queue }
    </section>
  );
};



import { OrderCard } from './order-card';
import styles from "./styles.module.css";
import { orders } from '../../utils/hardcoded-data'

export const OrderQueue = () => (
  <section className={styles.section}>
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
  </section>
);



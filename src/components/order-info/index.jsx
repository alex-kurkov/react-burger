import styles from "./styles.module.css";
import { orders } from '../../utils/hardcoded-data'
import { COMPLETED, IN_PROGRESS } from '../../utils/constants';

export const OrderInfo = () => {
 
  const readyOrders = orders.filter(i => i.status === COMPLETED);
  const preparingOrders = orders.filter(i => i.status === IN_PROGRESS);
  const hardCodedOrderCount = (n) => Number(n).toLocaleString();

  return (
    <section className={styles.section}>
      <div className={`${styles.ordersIds} mb-15`}> 
        <div className={styles.idsBlock}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={styles.list}>
            {readyOrders.map(item => (
              <li 
                className={`${styles.ready} ${styles.listItem} text text_type_digits-default`}
                key={item.order.number}
              >{item.order.number}
              </li>)
            )}
          </ul>
        </div>
        <div className={styles.idsBlock}>
          <p className={`text text_type_main-medium`}>В работе:</p>
          <ul className={styles.list}>
            {preparingOrders.map(item => (<li className={`${styles.listItem} text text_type_digits-default`} key={item.order.number}>{item.order.number}</li>))}
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <span className="text text_type_digits-large">{hardCodedOrderCount(43588)}</span>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span className="text text_type_digits-large">{hardCodedOrderCount(2349)}</span>
      </div>

    </section>
  );
};
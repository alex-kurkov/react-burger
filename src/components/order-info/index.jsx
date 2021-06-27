import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { COMPLETED, IN_PROGRESS } from '../../utils/constants';

export const OrderInfo = () => {
  const { orders, total, totalToday } = useSelector((state) => state.content);

  const readyOrders = orders.filter((i) => i.status === COMPLETED);
  const preparingOrders = orders.filter((i) => i.status === IN_PROGRESS);
  const localizedNumber = (n) => Number(n).toLocaleString();

  return (
    <>
      <div className={`${styles.ordersIds} mb-15`}>
        <div className={styles.idsBlock}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={styles.list}>
            {readyOrders.map((item) => (
              <li
                className={`${styles.ready} ${styles.listItem} text text_type_digits-default`}
                key={item._id}
              >
                {item.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.idsBlock}>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className={styles.list}>
            {preparingOrders.map((item) => (<li className={`${styles.listItem} text text_type_digits-default`} key={item._id}>{item.number}</li>))}
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <span className="text text_type_digits-large">{localizedNumber(total)}</span>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span className="text text_type_digits-large">{localizedNumber(totalToday)}</span>
      </div>

    </>
  );
};

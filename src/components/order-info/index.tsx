import { FC } from 'react';
import styles from './styles.module.css';
import { DONE, PENDING } from '../../utils/constants';
import { IOrder } from '../../types';
import { useAppSelector } from '../../hooks';

export const OrderInfo: FC = () => {
  const { orders, total, totalToday } = useAppSelector((state) => state.content);

  const readyOrders: Array<IOrder> = orders.filter((i) => i.status === DONE);
  const preparingOrders: Array<IOrder> = orders.filter((i) => i.status === PENDING);
  const localizedNumber = (n: number): string => Number(n).toLocaleString();

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
        <span className="text text_type_digits-large">{total && localizedNumber(total)}</span>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span className="text text_type_digits-large">{totalToday && localizedNumber(totalToday)}</span>
      </div>
    </>
  );
};

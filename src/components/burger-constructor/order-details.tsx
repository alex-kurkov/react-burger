import { FC } from 'react';
import { resetCurrentOrder } from '../../services/reducers/cart/cartSlice';
import DoneIcon from '../done-icon/done-icon';
import styles from './order-details.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';

const OrderDetails: FC = () => {
  const dispatch = useAppDispatch();
  const { currentOrder } = useAppSelector((store) => store.cart);

  return (
    <div className={styles.wrap}>
      <div className="text text_type_digits-large mb-4">{currentOrder && currentOrder.order.number}</div>
      <p className="text text_type_main-medium mb-5 pb-2">
        Идентификатор заказа
      </p>
      <DoneIcon onClose={() => dispatch(resetCurrentOrder())} />
      <p className="text text_type_main-small pt-2 mb-1">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.waiting_text} text text_type_main-small`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;

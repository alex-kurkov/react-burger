import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentOrder } from '../../services/reducers/cart/cartSlice';
import DoneIcon from '../done-icon/done-icon';
import styles from './order-details.module.css';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((store) => store.cart);

  return (
    <div className={styles.wrap}>
      <div className="text text_type_digits-large mb-4">{currentOrder.order.number}</div>
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

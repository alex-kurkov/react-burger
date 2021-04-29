import PropTypes from 'prop-types';
import {
  CheckMarkIcon
} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import {
  CheckmarkGraphicsOne, CheckmarkGraphicsTwo, CheckmarkGraphicsThree
} from '../svg/svg-graphics';
import styles from './order-details.module.css';

const OrderDetails = () => {
  const HARDCODED_ORDERNUM = '223478';

  return (
    <div className={styles.wrap}>
      <div className="text text_type_digits-large mb-4">{HARDCODED_ORDERNUM}</div> 
      <p className="text text_type_main-medium mb-5 pb-2">
        Идентификатор заказа
      </p>
      <div className={`${styles.done} mb-5`}>
        <CheckmarkGraphicsOne />
        <CheckmarkGraphicsTwo />
        <CheckmarkGraphicsThree />
        <div></div>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-small pt-2 mb-1">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.waiting_text} text text_type_main-small`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}


OrderDetails.propTypes = {
  children: PropTypes.node,
}

export default OrderDetails;
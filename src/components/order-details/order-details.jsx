import PropTypes from 'prop-types';
import DoneIcon from '../done-icon/done-icon'; 
import styles from './order-details.module.css';

const OrderDetails = ({ onClose }) => {
  const HARDCODED_ORDERNUM = '223478';

  return (
    <div className={styles.wrap}>
      <div className="text text_type_digits-large mb-4">{HARDCODED_ORDERNUM}</div> 
      <p className="text text_type_main-medium mb-5 pb-2">
        Идентификатор заказа
      </p>
      <DoneIcon onClose={onClose} />
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
  onClose: PropTypes.func,
}

export default OrderDetails;
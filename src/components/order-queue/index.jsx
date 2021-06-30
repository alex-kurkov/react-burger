import PropTypes from 'prop-types';
import { OrderCard } from './order-card';
import styles from './styles.module.css';

export const OrderQueue = ({ orders }) => (
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

OrderQueue.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.number,
    createdAt: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
  })),
};

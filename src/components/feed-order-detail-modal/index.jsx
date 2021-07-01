import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details';

export const FeedOrderDetailsModal = ({ searchUserOrders }) => {
  const { orders } = useSelector((state) => state.content);
  const { userOrders } = useSelector((state) => state.user);
  const history = useHistory();
  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <Modal onClose={back}>
      <OrderDetails sourceArray={searchUserOrders ? userOrders : orders} />
    </Modal>
  );
};

FeedOrderDetailsModal.propTypes = {
  searchUserOrders: PropTypes.bool,
};

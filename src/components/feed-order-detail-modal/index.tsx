import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details';
import { useAppSelector } from '../../hooks';

export const FeedOrderDetailsModal: FC<{ searchUserOrders?: boolean }> = ({ searchUserOrders }) => {
  const { orders } = useAppSelector((state) => state.content);
  const { userOrders } = useAppSelector((state) => state.user);
  const history = useHistory();
  const back = (): void => {
    history.goBack();
  };

  return (
    <Modal onClose={back}>
      <OrderDetails sourceArray={searchUserOrders ? userOrders : orders} />
    </Modal>
  );
};

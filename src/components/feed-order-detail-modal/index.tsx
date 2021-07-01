import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details';
import { IStore } from '../../types';

export const FeedOrderDetailsModal: FC<{ searchUserOrders?: boolean }> = ({ searchUserOrders }) => {
  const { orders } = useSelector((state: IStore) => state.content);
  const { userOrders } = useSelector((state: IStore) => state.user);
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

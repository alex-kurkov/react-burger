import { useHistory } from 'react-router-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details';

export const FeedOrderDetailsModal = () => {
  const history = useHistory();

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <ModalOverlay onClose={back}>
      <Modal onClose={back}>
        <OrderDetails />
      </Modal>
    </ModalOverlay>
  );
};

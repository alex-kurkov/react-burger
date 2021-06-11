import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details';
import { useHistory } from 'react-router-dom';

export const FeedOrderDetailsModal = () => {
  const history = useHistory();
  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
  <ModalOverlay onClose={back}>
    <Modal onClose={back}>
      <OrderDetails />
    </Modal>
  </ModalOverlay>
)}

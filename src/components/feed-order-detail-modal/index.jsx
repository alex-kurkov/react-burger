import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details';

export const FeedOrderDetailsModal = () => {
  const history = useHistory();
  const location = useLocation();

  const handleRefresh = () => history.replace(location.state?.modalViewLocation);
  useEffect(() => {
    window.addEventListener('beforeunload', handleRefresh);
    return () => window.removeEventListener('beforeunload', handleRefresh);
  });

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

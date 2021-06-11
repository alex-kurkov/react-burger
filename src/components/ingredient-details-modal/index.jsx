import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { IngredientDetails } from '../ingredient-details';
import { useHistory } from 'react-router-dom';

export const IngredientDetailsModal = () => {
  const history = useHistory();
  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <ModalOverlay onClose={back}>
      <Modal onClose={back}>
        <IngredientDetails />
      </Modal>
    </ModalOverlay> 
  )
}

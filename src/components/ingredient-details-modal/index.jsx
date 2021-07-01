import { useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import { IngredientDetails } from '../ingredient-details';

export const IngredientDetailsModal = () => {
  const history = useHistory();

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <Modal onClose={back}>
      <IngredientDetails />
    </Modal>
  );
};

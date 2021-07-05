import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import { IngredientDetails } from '../ingredient-details';

export const IngredientDetailsModal: FC = () => {
  const history = useHistory();

  const back = (): void => {
    history.goBack();
  };

  return (
    <Modal onClose={back}>
      <IngredientDetails />
    </Modal>
  );
};

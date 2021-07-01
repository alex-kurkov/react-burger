import { FC, SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import { IngredientDetails } from '../ingredient-details';

export const IngredientDetailsModal: FC = () => {
  const history = useHistory();

  const back = (e: SyntheticEvent): void => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <Modal onClose={back}>
      <IngredientDetails />
    </Modal>
  );
};

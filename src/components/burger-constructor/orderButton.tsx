import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import OrderDetails from './order-details';
import Modal from '../modal/modal';
import { postOrder } from '../../services/actions/auth';
import styles from './orderButton.module.css';
import { resetCurrentOrder } from '../../services/reducers/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const OrderButton: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { loggedIn } = useAppSelector((state) => state.user);
  const { chosenIngredients, chosenBun } = useAppSelector((state) => state.cart);
  const { currentOrder } = useAppSelector((state) => state.cart);
  const { apiRequestInProgress } = useAppSelector((state) => state.api);

  const closeModal = () => {
    dispatch(resetCurrentOrder());
  };

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  );

  const placeOrder = (): void => {
    if (!loggedIn) {
      history.replace('/login');
    } else if (chosenBun) {
      const ingredientsIds = [
        ...chosenIngredients.map(({ _id }) => _id),
        chosenBun?._id
      ];
      dispatch(postOrder({ ingredients: ingredientsIds }));
    }
  };
  return (
    <div data-cy="order-button" className={chosenBun && !apiRequestInProgress ? '' : styles.disabled}>
      { currentOrder && currentOrder.success && modal }
      <Button type="primary" size="large" onClick={placeOrder}>
        Оформить заказ
      </Button>
    </div>
  );
};

export default OrderButton;

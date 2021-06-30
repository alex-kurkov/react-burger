import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import OrderDetails from './order-details';
import Modal from '../modal/modal';
import { postOrder } from '../../services/actions/auth';
import styles from './orderButton.module.css';
import { resetCurrentOrder } from '../../services/reducers/cart/cartSlice';

const OrderButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedIn } = useSelector((state) => state.user);
  const { chosenIngredients, chosenBun } = useSelector((state) => state.cart);
  const { currentOrder } = useSelector((state) => state.cart);
  const { apiRequestInProgress } = useSelector((state) => state.api);

  const closeModal = () => {
    dispatch(resetCurrentOrder());
  };

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  );

  const placeOrder = (e) => {
    e.stopPropagation();
    if (!loggedIn) {
      history.replace('/login');
    } else {
      const ingredientsIds = chosenIngredients.map(({ _id }) => _id).concat(chosenBun._id);
      dispatch(postOrder({ ingredients: ingredientsIds }));
    }
  };
  return (
    <div data-cy="order-button" className={chosenBun.name && !apiRequestInProgress ? '' : styles.disabled}>
      { currentOrder.success && modal }
      <Button type="primary" size="large" onClick={placeOrder}>
        Оформить заказ
      </Button>
    </div>
  );
};

export default OrderButton;

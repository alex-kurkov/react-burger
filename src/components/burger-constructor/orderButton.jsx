import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from './order-details';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import { postOrder } from '../../services/actions/api';
import { RESET_CURRENT_ORDER, RESET_CHOSEN_INGREDIENTS } from '../../utils/constants';
import styles from "./orderButton.module.css";

const OrderButton = () => {
  const dispatch = useDispatch();
  const { chosenIngredients, chosenBun } = useSelector(store => store.cart);
  const { currentOrder } = useSelector(store => store.order);
  const { apiRequestInProgress } = useSelector(store => store.api);
  
  const closeModal = () => {
    dispatch({type: RESET_CURRENT_ORDER})
    dispatch({type: RESET_CHOSEN_INGREDIENTS})
    
  }
  
  const modal = (
    <ModalOverlay onClose={closeModal}> 
      <Modal onClose={closeModal} >
        <OrderDetails />
      </Modal>
    </ModalOverlay>
  )

  const placeOrder = (e) => {
    e.stopPropagation();
    const ingredientsIds = chosenIngredients.map(({_id}) => _id).concat(chosenBun._id);
    dispatch(postOrder({ingredients: ingredientsIds}))
  }
  return (
    <div className={chosenBun.name && !apiRequestInProgress ? '' : styles.disabled} >
      { currentOrder.success && modal }
        <Button type="primary" size="large" onClick={placeOrder} >
          Оформить заказ
        </Button>
    </ div>
  )
}

export default OrderButton;

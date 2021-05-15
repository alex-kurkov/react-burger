import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from './order-details';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import { postOrder } from '../../services/actions/api';
import { RESET_CURRENT_ORDER } from '../../utils/constants';
import styles from "./orderButton.module.css";

const OrderButton = () => {
  const dispatch = useDispatch();
  const { chosenIngredients, chosenBun, currentOrder } = useSelector(store => store);
  
  const closeModal = () => {
    dispatch({type: RESET_CURRENT_ORDER})
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
    const ingredients = chosenIngredients.map(({_id}) => _id).concat(chosenBun._id);
    dispatch(postOrder({ingredients}))
  }
  return (
    <div className={chosenBun.name ? '' : styles.disabled}>
      {currentOrder.success && modal}
      <Button type="primary" size="large" onClick={placeOrder} >
        Оформить заказ
      </Button>
    </ div>
  )
}

export default OrderButton;

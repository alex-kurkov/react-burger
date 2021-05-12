import { useState, useCallback, useContext } from 'react';
import OrderDetails from './order-details';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import { ChosenIngredientsContext } from '../../context/appContext';
import { postOrder } from '../../utils/api'

const OrderButton = () => {
  const { chosenIngredients } = useContext(ChosenIngredientsContext);
  const [showModal, setShowModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null)
  
  const closeModal = useCallback(() => setShowModal(false), [])
  const openModal = useCallback(() => setShowModal(true), [])
  
  const modal = (
    <ModalOverlay onClose={closeModal}> 
      <Modal onClose={closeModal} >
        <OrderDetails orderInfo={orderInfo} onClose={closeModal} />
      </Modal>
    </ModalOverlay>
  )

  const placeOrder = (e) => {
    e.stopPropagation();
    const ingredients = chosenIngredients.map(({_id}) => _id);
    postOrder({ingredients})
      .then(data => {
        setOrderInfo(data);
        openModal();
      })
      .catch(e => console.log(e))
  }
 
  return (
    <>
      {showModal && orderInfo && modal}
      <Button type="primary" size="large" onClick={placeOrder}>
        Оформить заказ
      </Button>
    </>
  )
}

export default OrderButton;

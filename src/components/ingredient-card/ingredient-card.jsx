import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { 
  Counter, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import { 
  SET_ACTIVE_INGREDIENT, 
  RESET_ACTIVE_INGREDIENT,
  ADD_CHOSEN_INGREDIENT,
  ADD_CHOSEN_BUN,
 } from '../../utils/constants';
import styles from './ingredient-card.module.css';

const IngredientCard = ({ item, count }) => {
  const { activeIngredient } = useSelector(store => store);
  const dispatch = useDispatch();
  
  const closeModal = useCallback(() => {
    dispatch({ type: RESET_ACTIVE_INGREDIENT })
  }, [dispatch])
  
  const openModal = (e) => {
    e.stopPropagation();
    dispatch({type: SET_ACTIVE_INGREDIENT, payload: item });
    dispatch({
      type: item.type === 'bun' ? ADD_CHOSEN_BUN : ADD_CHOSEN_INGREDIENT,
      payload: item 
    });
  }

  const modal = (
    <ModalOverlay onClose={closeModal}> 
      <Modal onClose={closeModal} title="Детали ингредиента">
        <IngredientDetails />
      </Modal>
    </ModalOverlay>
  )

  const { name, price, image } = item;
  return (
    <article className={`${styles.card} pr-2 pl-2 pb-3`} onClick={openModal}> 
      {activeIngredient._id && modal}
      {count && <Counter count={count} size="small" />}
      <img src={image} className={`${styles.image}` } alt={name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-1">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default mr-1`}>{name}</p>
    </article>
  )
}

export default IngredientCard;

IngredientCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
  }),
  count: PropTypes.number,
}

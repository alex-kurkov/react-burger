import PropTypes from 'prop-types';
import { 
  Counter, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import styles from './ingredient-card.module.css';

const IngredientCard = (props) => {
  const { name, price, image } = props.item;
  return (
    <article className={`${styles.card} pr-2 pl-2 pb-3`}>
      {props.count && <Counter count={props.count} size="small" />}
      <img src={image} className={`${styles.image}`} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <span className="text text_type_main-default mr-1">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default mr-1`}>{name}</p>
    </article>
  )
}

export default IngredientCard;

IngredientCard.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }),
  onClick: PropTypes.func,
  count: PropTypes.number,
}

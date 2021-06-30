import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  Counter, CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './ingredient-card.module.css';

const IngredientCard = ({ item }) => {
  const location = useLocation();
  const { name, price, image } = item;
  const { chosenIngredients, chosenBun } = useSelector((store) => store.cart);
  const count = item.type !== 'bun'
    ? chosenIngredients.filter((i) => i._id === item._id).length
    : chosenBun._id === item._id
      ? 1
      : 0;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <Link
      className={styles.link}
      to={{ pathname: `ingredients/${item._id}`, state: { modalViewLocation: location, from: '/' } }}
    >

      <article data-cy="ingredient" ref={dragRef} className={`${styles.card} pr-2 pl-2 pb-3 ${isDrag ? styles.dragging : ''}`}>
        {!!count && <Counter count={count} size="small" />}
        <img src={image} className={`${styles.image}`} alt={name} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-1">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default mr-1`}>{name}</p>
      </article>
    </Link>
  );
};

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
  }).isRequired,
};

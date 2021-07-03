import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
  Counter, CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './ingredient-card.module.css';
import { IIngredient, IStore } from '../../types';

const IngredientCard: FC<{ item: IIngredient }> = ({ item }) => {
  const location = useLocation();
  const { name, price, image } = item;
  const { chosenIngredients, chosenBun } = useSelector((store: IStore) => store.cart);
  const count: number = item.type !== 'bun'
    ? chosenIngredients.filter((i) => i._id === item._id).length
    : (chosenBun && chosenBun._id === item._id)
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

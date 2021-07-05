import React, { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
  Counter, CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './ingredient-card.module.css';
import { IIngredient } from '../../types';

const IngredientCard: FC<{ item: IIngredient }> = React.memo(({ item }) => {
  const location = useLocation();
  const { name, price, image, countInCart } = item;
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
        {!!countInCart && <Counter count={countInCart} size="small" />}
        <img src={image} className={`${styles.image}`} alt={name} />
        <div className={`${styles.price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-1">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default mr-1`}>{name}</p>
      </article>
    </Link>
  );
});

export default IngredientCard;

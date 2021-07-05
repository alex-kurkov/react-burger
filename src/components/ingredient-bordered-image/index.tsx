import { FC } from 'react';
import { IIngredient } from '../../types';
import styles from './styles.module.css';

export const IngredientBorderedImage: FC<{
  item: IIngredient, extrasCount?: number
}> = ({ item, extrasCount }) => (
  <figure className={styles.imageWrap}>
    <img
      className={styles.cardImage}
      alt={item.name}
      src={item.image}
    />
    { extrasCount && (
    <span
      className={`${styles.extraIngredients} text text_type_digits-default`}
    >
      +
      {extrasCount}
    </span>
    )}
  </figure>
);

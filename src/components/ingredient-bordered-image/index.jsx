/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const IngredientBorderedImage = ({ item, extrasCount }) => (
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

IngredientBorderedImage.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    order: PropTypes.shape({
      number: PropTypes.number,
      cost: PropTypes.number,
      orderedAt: PropTypes.object,
      ingredients: PropTypes.array,
    }),
  }),
  extrasCount: PropTypes.number,
};

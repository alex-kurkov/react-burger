import { useSelector } from 'react-redux';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientBorderedImage } from '../ingredient-bordered-image';
import { orderDateAgoToString, countCost, populateIngredients } from '../../utils/helpers';
import styles from './styles.module.css';

export const OrderCard = ({ data }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const { content } = useSelector((state) => state);

  const {
    number, createdAt, ingredients, name,
  } = data;
  const date = orderDateAgoToString(createdAt);

  const populatedIngredients = populateIngredients(ingredients, content.ingredients);
  const visibleIngredients = populatedIngredients.slice(0, 5).reverse();
  const hiddenIngredients = populatedIngredients.slice(5);
  const cost = countCost(populatedIngredients);

  return (
    <article className={`${styles.card} p-6`}>
      <Link data-cy="order-card" className={styles.link} to={{ pathname: `${match.url}/${data._id}`, state: { modalViewLocation: location } }}>
        <div className={`${styles.cardInfo} mb-6`}>
          <span className="text text_type_digits-default">
            #
            {number}
          </span>
          <span className="text text_type_main-default text_color_inactive">{date}</span>
        </div>
        <div className={`${styles.cardName} text text_type_main-large mb-6`}>
          { name }
        </div>
        <div className={`${styles.cardOrderInfo} p-6`}>
          <ul className={styles.ingredients}>
            { !!hiddenIngredients.length
            && (
            <li className={styles.listItem} key="extra-ingredient">
              <IngredientBorderedImage
                item={hiddenIngredients[0]}
                extrasCount={hiddenIngredients.length}
              />
            </li>
            )}
            { visibleIngredients.map((item, idx) => (
              <li className={styles.listItem} key={`${item._id}-${idx}`}>
                <IngredientBorderedImage
                  item={item}
                  extrasCount={null}
                />
              </li>
            ))}
          </ul>
          <span className={`${styles.cost} text text_type_digits-default`}>
            {cost}
            {' '}
            <CurrencyIcon />
          </span>
        </div>
      </Link>
    </article>
  );
};

OrderCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.number,
    createdAt: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
  }),
};

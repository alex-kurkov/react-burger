import PropTypes from 'prop-types';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderDateAgoToString } from '../../utils/helpers';
import { IngredientBorderedImage } from '../ingredient-bordered-image';

export const OrderCard = ({ data }) => {
  const match = useRouteMatch();
  const { number, cost, orderedAt, ingredients } = data.order;
  const date = orderDateAgoToString(orderedAt);
  const location = useLocation();
  const visibleIngredients = ingredients.slice(0, 5).reverse();
  const hiddenIngredients = ingredients.slice(5);
  
  return (
    <article className={`${styles.card} p-6`}>
      <Link className={styles.link} to={{pathname: `${match.url}/${data._id}`, state: { modalViewLocation: location }}}>
        <div className={`${styles.cardInfo} mb-6`}>
          <span className="text text_type_digits-default">#{number}</span>
          <span className="text text_type_main-default text_color_inactive">{date}</span>
        </div>
        <div className={`${styles.cardName} text text_type_main-large mb-6`}>
          { data.name }
        </div>
        <div className={`${styles.cardOrderInfo} p-6`}>
          <ul className={styles.ingredients}>
            { !!hiddenIngredients.length &&
            <li className={styles.listItem} key="extra-ingredient">
              <IngredientBorderedImage 
                item={hiddenIngredients[0]}
                extrasCount={hiddenIngredients.length}
              />
            </li>
            }
            { visibleIngredients.map((item, idx) =>
            <li className={styles.listItem} key={`${item._id}-${idx}`}>  
              <IngredientBorderedImage 
                item={item}
                extrasCount={null}
              />
            </li>
            )}
          </ul>
          <span className={`${styles.cost} text text_type_digits-default`}>{cost} <CurrencyIcon /></span>
        </div>     
      </Link>
    </article>
  )
}

OrderCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.shape({
      number: PropTypes.number,
      cost: PropTypes.number,
      orderedAt: PropTypes.object,
      ingredients: PropTypes.array
    })
  }),
}

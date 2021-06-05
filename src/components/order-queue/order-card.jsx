import PropTypes from 'prop-types';
import styles from './styles.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderDateAgoToString } from '../../utils/helpers';

const IngredientCard = ({ item, extrasCount }) => (
  <li className={styles.listItem}>
    <figure className={styles.imageWrap}>
      <img 
        className={styles.cardImage} 
        alt={item.name} 
        src={item.image} />        
      { extrasCount && <span 
        className={`${styles.extraIngredients} text text_type_digits-default`}>
          +{extrasCount}
      </span>}
    </figure>
  </li>
)

export const OrderCard = ({ data }) => {
  const { number, cost, orderedAt, ingredients } = data.order;

  const date = orderDateAgoToString(orderedAt);

  const visibleIngredients = ingredients.slice(0, 5).reverse();
  const hiddenIngredients = ingredients.slice(5);
  
  return (
    <article className={`${styles.card} p-6`}>
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
            <IngredientCard 
              item={hiddenIngredients[0]}
              key="extra-ingredient"
              extrasCount={hiddenIngredients.length}
            />
          }
          { visibleIngredients.map((item, idx) =>
            <IngredientCard 
              item={item}
              key={`${item._id}-${idx}`}
              extrasCount={null}
            />
          )}
        </ul>
        <span className={`${styles.cost} text text_type_digits-default`}>{cost} <CurrencyIcon /></span>
      </div>     
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
IngredientCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.shape({
      number: PropTypes.number,
      cost: PropTypes.number,
      orderedAt: PropTypes.object,
      ingredients: PropTypes.array
    })
  }),
  extrasCount: PropTypes.number,
}

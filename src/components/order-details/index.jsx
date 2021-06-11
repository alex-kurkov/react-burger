import { useParams, useHistory } from 'react-router-dom';
import { IngredientBorderedImage } from '../ingredient-bordered-image';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { orders } from '../../utils/hardcoded-data';
import { COMPLETED } from '../../utils/constants'
import { orderDateAgoToString, countIngredients } from '../../utils/helpers';
import styles from './styles.module.css';

export const OrderDetails = () => {
  const { orderId } = useParams();
  const history = useHistory();

  const foundOrder = orders.find(i => i._id === orderId)
  if (!foundOrder) return (
      <div className={styles.notFound}>
        <span className="text text_type_main-large p-10">Заказ не найден</span>
        <Button 
          type="secondary" 
          size="large" 
          onClick={() => history.goBack()}>
            Вернуться 
          </Button>
      </div>
  )

  const {status, order, name } = foundOrder;
  const date = orderDateAgoToString(order.orderedAt);
  const countedIngredients = countIngredients(order.ingredients);

  return (
    <section className={styles.section}>
      <p className={`${styles.number} text text_type_digits-default`}>#{order.number}</p>  
      <h4 className="text text_type_main-large mb-3 mt-10">{name}</h4>
      <p className={`${styles.status} text text_type_main-medium mb-15`}>
        {status === COMPLETED ? 'Выполнен' : 'Готовится'}
      </p>
      <p className="text text_type_main-large mb-6">Состав:</p>
      <ul className={`${styles.ingredients} mb-10`}>
        { countedIngredients.map((item, idx)=> (
          <li key={`${item._id}-${idx}`} className={styles.listItem}>
            <article className={styles.card}>
              <IngredientBorderedImage item={item}/>
              <p className={`${styles.gridCenteredItem} text text_type_main-small`}>{item.name}</p>
              <div className={styles.cost}>
                <span className="text text_type_digits-default">{item.count}  &times; </span>
                <span className="text text_type_digits-default">{item.price}</span>
                <CurrencyIcon />
              </div>
            </article>
          </li>
        ))
        }
      </ul>
      <div className={styles.timeAndTotalWrap}>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
        <div className={styles.cost}>
          <span className="text text_type_digits-default">{order.cost}</span>
          <CurrencyIcon />
        </div>
      </div>
    </section>
  )
}
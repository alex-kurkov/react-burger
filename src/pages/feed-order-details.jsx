import { useParams, useHistory } from 'react-router-dom';
import styles from './feed-order-details.module.css';
import { orders } from '../utils/hardcoded-data';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { COMPLETED } from '../utils/constants'
import { IngredientBorderedImage } from '../components/ingredient-bordered-image';
import { orderDateAgoToString } from '../utils/helpers';

export const FeedOrderDetails = () => {
  const { orderId } = useParams();
  const history = useHistory();

  const foundOrder = orders.find(i => i._id === orderId)
  if (!foundOrder) return (
    <main className={`${styles.main} pt-20`}>
      <div className={styles.notFound}>
        <span className="text text_type_main-large p-10">Заказ не найден</span>
        <Button 
          type="secondary" 
          size="large" 
          onClick={() => history.replace('/feed')}>
            Вернуться к ленте заказов 
          </Button>
      </div>
    </main>
  )

  const {status, order, name } = foundOrder;
  const date = orderDateAgoToString(order.orderedAt);

  const countedIngredients = order.ingredients.reduce((acc, item) => {
    const isInAcc = acc.findIndex((i) => i._id === item._id)
    if (isInAcc < 0) return [...acc, { count: 1, ...item }]
    acc[isInAcc]['count'] += 1;
    return acc;
  }, [])

  return (
    <main className={`${styles.main} pt-20`}>
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
    </main>
  )
}
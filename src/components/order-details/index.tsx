import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientBorderedImage } from '../ingredient-bordered-image';
import {
  orderDateAgoToString, countIngredients, populateIngredients, countCost, getStatus,
} from '../../utils/helpers';
import styles from './styles.module.css';
import { IIngredient, IOrder, IStore, TOrderStatus, IIngredientWithCount } from '../../types';

export const OrderDetails: FC<{sourceArray: Array<IOrder>}> = ({ sourceArray }) => {
  const { orderId } = useParams<{ orderId?: string }>();
  const history = useHistory();
  const { ingredients } = useSelector((state: IStore) => state.content);

  const foundOrder = sourceArray.find((i) => i._id === orderId);
  if (!foundOrder) {
    return (
      <div className={styles.notFound}>
        <span className="text text_type_main-large p-10">Заказ не найден</span>
        <Button
          type="secondary"
          size="large"
          onClick={() => history.goBack()}
        >
          Вернуться
        </Button>
      </div>
    );
  }

  const {
    status, number, name, createdAt,
  } = foundOrder;
  const statusContent: TOrderStatus = getStatus(status);
  const date: string = orderDateAgoToString(createdAt);
  const populatedIngredients: IIngredient[] = populateIngredients(foundOrder.ingredients, ingredients);
  const countedIngredients: IIngredientWithCount[] = countIngredients(populatedIngredients);
  const cost: number = countCost(populatedIngredients);

  return (
    <section className={styles.section}>
      <p className={`${styles.number} text text_type_digits-default`}>
        #
        {number}
      </p>
      <h4 className="text text_type_main-large mb-3 mt-10">{name}</h4>
      <p
        className={`${styles.status} text text_type_main-medium mb-15`}
        color={statusContent.color || 'inherit'}
      >
        {statusContent.text}
      </p>
      <p className="text text_type_main-large mb-6">Состав:</p>
      <ul className={`${styles.ingredients} mb-10`}>
        { countedIngredients.map((item, idx) => (
          <li key={`${item._id}${idx}`} className={styles.listItem}>
            <article className={styles.card}>
              <IngredientBorderedImage item={item} />
              <p className={`${styles.gridCenteredItem} text text_type_main-small`}>{item.name}</p>
              <div className={styles.cost}>
                <span className="text text_type_digits-default">
                  {item.count}
                  {' '}
                  &times;
                  {' '}
                </span>
                <span className="text text_type_digits-default">{item.price}</span>
                <CurrencyIcon type="primary" />
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className={styles.timeAndTotalWrap}>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
        <div className={styles.cost}>
          <span className="text text_type_digits-default">{cost}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

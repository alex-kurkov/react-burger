import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientBorderedImage } from '../ingredient-bordered-image';
import {
  orderDateAgoToString, countCost, populateIngredients, getStatus,
} from '../../utils/helpers';
import styles from './styles.module.css';
import { IIngredient, IOrder, IStore, TOrderStatus } from '../../types';

export const OrderCard: FC<{ data: IOrder }> = ({ data }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const { content } = useSelector((state: IStore) => state);
  const {
    number, createdAt, ingredients, name, status,
  } = data;
  const date: string = orderDateAgoToString(createdAt);
  const statusContent: TOrderStatus = getStatus(status);

  const populatedIngredients: Array<IIngredient> = populateIngredients(ingredients, content.ingredients);
  const visibleIngredients: Array<IIngredient> = populatedIngredients.slice(0, 5).reverse();
  const hiddenIngredients: Array<IIngredient> = populatedIngredients.slice(5);
  const cost: number = countCost(populatedIngredients);

  return (
    <article className={`${styles.card} p-6`}>
      <Link data-cy="order-card" className={styles.link} to={{ pathname: `${match.url}/${data._id}`, state: { modalViewLocation: location } }}>
        <div className={`${styles.cardInfo} mb-5`}>
          <span className="text text_type_digits-default">
            #
            {number}
          </span>
          <span className="text text_type_main-default text_color_inactive">{date}</span>
        </div>
        <div className={`${styles.cardName} text text_type_main-large`}>
          { name }
        </div>
        <p className={`${styles.cardStatus} text text_type_main-small mb-4`} color={statusContent.color || 'white'}>{statusContent.text}</p>
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
            { visibleIngredients.map((item: IIngredient, idx: number) => (
              <li className={styles.listItem} key={`${item._id}-${idx}`}>
                <IngredientBorderedImage
                  item={item}
                  extrasCount={undefined}
                />
              </li>
            ))}
          </ul>
          <span className={`${styles.cost} text text_type_digits-default`}>
            {cost}
            {' '}
            <CurrencyIcon type="primary"/>
          </span>
        </div>
      </Link>
    </article>
  );
};

import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientBorderedImage } from '../ingredient-bordered-image';
import {
  orderDateAgoToString, countIngredients, populateIngredients, countCost, getStatus,
} from '../../utils/helpers';
import styles from './styles.module.css';

export const OrderDetails = ({ sourceArray }) => {
  const { orderId } = useParams();
  const history = useHistory();
  const { ingredients } = useSelector((state) => state.content);

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
  const statusContent = getStatus(status);
  const date = orderDateAgoToString(createdAt);
  const populatedIngredients = populateIngredients(foundOrder.ingredients, ingredients);
  const countedIngredients = countIngredients(populatedIngredients);
  const cost = countCost(populatedIngredients);

  return (
    <section className={styles.section}>
      <p className={`${styles.number} text text_type_digits-default`}>
        #
        {number}
      </p>
      <h4 className="text text_type_main-large mb-3 mt-10">{name}</h4>
      <p
        className={`${styles.status} text text_type_main-medium mb-15`}
        color={statusContent.color}
      >
        {statusContent.text}
      </p>
      <p className="text text_type_main-large mb-6">Состав:</p>
      <ul className={`${styles.ingredients} mb-10`}>
        { countedIngredients.map((item) => (
          <li key={`${item._id}`} className={styles.listItem}>
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
                <CurrencyIcon />
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className={styles.timeAndTotalWrap}>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
        <div className={styles.cost}>
          <span className="text text_type_digits-default">{cost}</span>
          <CurrencyIcon />
        </div>
      </div>
    </section>
  );
};

OrderDetails.propTypes = {
  sourceArray: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.number,
    createdAt: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
  })),
};

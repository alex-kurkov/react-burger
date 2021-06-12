import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './total.module.css';

const Total = () => {
  const [total, setTotal] = useState(0);
  const { chosenIngredients, chosenBun } = useSelector((store) => store.cart);

  useEffect(() => {
    const sum = chosenIngredients
      .reduce((acc, item) => acc + item.price, 0);
    const bunCost = chosenBun._id ? chosenBun.price * 2 : 0;
    setTotal(sum + bunCost);
  }, [chosenIngredients, chosenBun]);

  return (
    <div className={`${styles.total} mt-1 mb-1 mr-5`}>
      <span className="text text text_type_main-large mr-2">{total}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Total;

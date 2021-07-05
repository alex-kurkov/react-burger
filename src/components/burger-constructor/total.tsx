import { useState, useEffect, FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './total.module.css';
import { IIngredient } from '../../types';
import { useAppSelector } from '../../hooks';

const Total: FC = () => {
  const [total, setTotal] = useState<number>(0);
  const { chosenIngredients, chosenBun } = useAppSelector((store) => store.cart);

  useEffect(() => {
    const sum = chosenIngredients
      .reduce((acc: number, item: IIngredient) => acc + item.price, 0);
    const bunCost = chosenBun ? chosenBun.price * 2 : 0;
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

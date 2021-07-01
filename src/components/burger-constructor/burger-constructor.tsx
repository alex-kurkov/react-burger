import { useEffect, useRef, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import OrderButton from './orderButton';
import ConstructorElement from './constructor-element';
import Total from './total';
import {
  HEIGHT_OF_CONSTRUCTOR_ITEM,
  CONSTRUCTOR_MARGIN,
} from '../../utils/constants';
import { addBun, addIngredient } from '../../services/reducers/cart/cartSlice';
import styles from './burger-constructor.module.css';
import { IIngredient, IStore } from '../../types';

const BurgerConstructor: FC = () => {
  const { chosenIngredients, chosenBun } = useSelector((store: IStore) => store.cart);
  const dispatch = useDispatch();
  // *********************
  // block to calculate and set height of constructor list parent for neat display
  const content = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  function setConstructorListHeight(): void {
    if (content.current && container.current) {
      const contentHeight: number = content.current.offsetHeight;
      const availableSpace: number = Number(contentHeight)
      - HEIGHT_OF_CONSTRUCTOR_ITEM * 3 + CONSTRUCTOR_MARGIN * 4;
      const countedSpace = availableSpace
        - (availableSpace % (HEIGHT_OF_CONSTRUCTOR_ITEM + CONSTRUCTOR_MARGIN))
        + CONSTRUCTOR_MARGIN * 4;
      container.current.style.height = `${countedSpace}px`;
    }
  }
  const handleNewIndredientDrop = (item: IIngredient): void => {
    if (item.type === 'bun') {
      dispatch(addBun(item));
    } else {
      dispatch(addIngredient(item));
    }
  };

  const [{ isHover }, dropNewIngredientsTarget] = useDrop({
    accept: 'ingredient',
    drop(item: IIngredient) {
      handleNewIndredientDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  useEffect(() => {
    setConstructorListHeight();
    window.addEventListener('resize', setConstructorListHeight);
    return () => window.removeEventListener('resize', setConstructorListHeight);
  }, [chosenIngredients]);
  // **********************

  return (
    <section data-cy="drop-ingredients-target" ref={dropNewIngredientsTarget} className={`${styles.section} ${isHover && styles.hovered}`}>
      <div ref={content} className={`${styles.content} mb-5`}>
        {
          !chosenIngredients.length && !chosenBun._id
          && <p className={`${styles.dragInfo} text text_type_main-medium`}>Перетащите в эту область ингредиенты для Вашего бургера</p>
        }
        <ul data-cy="bun-container" className={`${styles.bunContainer}`}>
          {chosenBun.name && (
            <ConstructorElement
              item={chosenBun}
              type="top"
              isLocked
              key={chosenBun._id}
              data-cy="chosen-bun"
            />
          )}
        </ul>
        <div ref={container} className={`${styles.container} mb-2 mt-2`}>
          <ul data-cy="main-container" className={styles.list}>
            { chosenIngredients
              .map((item: IIngredient, index: number) => (
                <ConstructorElement
                  key={`${item._id}-${index}`}
                  type="center"
                  item={item}
                  isLocked={false}
                  positionIndex={index}
                  data-cy="chosen-ingredient"
                />
              ))}
          </ul>
        </div>
        <ul className={styles.bunContainer}>
          {chosenBun.name && (
            <ConstructorElement
              item={chosenBun}
              type="bottom"
              isLocked
              key={chosenBun._id}
            />
          )}
        </ul>
      </div>

      <div className={`${styles.order} pt-2`}>
        <Total />
        <OrderButton />
      </div>
    </section>
  );
};

export default BurgerConstructor;

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import OrderButton from './orderButton';
import ConstructorElement from './constructor-element';
import Total from './total';
import {
  HEIGHT_OF_CONSTRUCTOR_ITEM,
  CONSTRUCTOR_MARGIN,
  ADD_CHOSEN_BUN,
  ADD_CHOSEN_INGREDIENT,
} from '../../utils/constants';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const { chosenIngredients, chosenBun } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  // *********************
  // block to calculate and set height of constructor list parent for neat display
  const content = useRef();
  const container = useRef();

  function setConstructorListHeight() {
    const contentHeight = content.current.offsetHeight;
    const availableSpace = Number(contentHeight)
    - HEIGHT_OF_CONSTRUCTOR_ITEM * 3 + CONSTRUCTOR_MARGIN * 4;
    const countedSpace = availableSpace
      - (availableSpace % (HEIGHT_OF_CONSTRUCTOR_ITEM + CONSTRUCTOR_MARGIN))
      + CONSTRUCTOR_MARGIN * 4;
    container.current.style.height = `${countedSpace}px`;
  }
  const handleNewIndredientDrop = (item) => {
    dispatch({
      type: item.type === 'bun' ? ADD_CHOSEN_BUN : ADD_CHOSEN_INGREDIENT,
      payload: item,
    });
  };

  const [{ isHover }, dropNewIngredientsTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
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
    <section ref={dropNewIngredientsTarget} className={`${styles.section} ${isHover && styles.hovered}`}>
      <div ref={content} className={`${styles.content} mb-5`}>
        {
          !chosenIngredients.length && !chosenBun._id
          && <p className={`${styles.dragInfo} text text_type_main-medium`}>Перетащите в эту область ингредиенты для Вашего бургера</p>
        }
        <ul className={`${styles.bunContainer}`}>
          {chosenBun.name && (
            <ConstructorElement
              item={chosenBun}
              type="top"
              isLocked
              key={chosenBun._id}
            />
          )}
        </ul>
        <div ref={container} className={`${styles.container} mb-2 mt-2`}>
          <ul className={styles.list}>
            { chosenIngredients
              .map((item, index) => (
                <ConstructorElement
                  key={`${item._id}-${index}`}
                  type="center"
                  item={item}
                  isLocked={false}
                  positionIndex={index}
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

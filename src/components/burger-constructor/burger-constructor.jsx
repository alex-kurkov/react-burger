import { useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import OrderButton from './orderButton';
import ConstructorElement from "./constructor-element";
import Total from "./total";
import {
  HEIGHT_OF_CONSTRUCTOR_ITEM,
  CONSTRUCTOR_MARGIN
} from '../../utils/constants';
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const { chosenIngredients, chosenBun } = useSelector(store => store);

  // *********************
  // block to calculate and set height of constructor list parent for neat display
  const content = useRef();
  const container = useRef();

  function setConstructorListHeight() {
    const contentHeight = content.current.offsetHeight;
    const availableSpace =
      Number(contentHeight) - HEIGHT_OF_CONSTRUCTOR_ITEM * 3 + CONSTRUCTOR_MARGIN * 2;
    const countedSpace =
      availableSpace -
      (availableSpace % (HEIGHT_OF_CONSTRUCTOR_ITEM + CONSTRUCTOR_MARGIN)) -
      CONSTRUCTOR_MARGIN * 2;
    container.current.style.height = `${countedSpace}px`;
  }

  useEffect(() => {
    setConstructorListHeight();
    window.addEventListener("resize", setConstructorListHeight);
    return () => window.removeEventListener("resize", setConstructorListHeight);
  }, [chosenIngredients]);
  // **********************

  return (
    <section className={`${styles.section} pt-5 pb-5`}>
      <div ref={content} className={`${styles.content} mb-5`}>
        <div className={styles.bunContainer}>
          {chosenBun.name && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${chosenBun.name} (верх)`}
              thumbnail={chosenBun.image}
              price={chosenBun.price}
            />
          )}
        </div>
        <div ref={container} className={styles.container}>
          <ul className={styles.list}>
            { chosenIngredients
                .map((item) => (
                  <li className={`${styles.listItem} mb-1`} key={item._id}>
                    <ConstructorElement
                      type="center"
                      isLocked={false}
                      text={item.name}
                      thumbnail={item.image}
                      price={item.price}
                      _id={item._id}
                    />
                  </li>
                ))}
          </ul>
        </div>
        <div className={styles.bunContainer}>
          {chosenBun.name && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${chosenBun.name} (низ)`}
              thumbnail={chosenBun.image}
              price={chosenBun.price}
            />
          )}
        </div>
      </div>

      <div className={`${styles.order} pt-2`}>
        <Total />
        <OrderButton />
      </div>
    </section>
  );
};

/* BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
  }))
} */

export default BurgerConstructor;

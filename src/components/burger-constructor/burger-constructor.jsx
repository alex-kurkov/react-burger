import { useEffect, useState, useRef, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import OrderButton from './orderButton';
import ConstructorElement from "./constructor-element";
import Total from "./total";
import {
  HEIGHT_OF_CONSTRUCTOR_ITEM,
  CONSTRUCTOR_MARGIN
} from '../../utils/constants';
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const { chosenIngredients } = useSelector(store => store);
  const [bun, setBun] = useState(null);

  useEffect(() => {
    const foundBun = chosenIngredients.find(({ type }) => type === "bun");
    setBun(foundBun);
  }, [chosenIngredients]);

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
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
        <div ref={container} className={styles.container}>
          <ul className={styles.list}>
            { chosenIngredients
                .filter(({ type }) => type !== "bun")
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
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
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

import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import OrderDetails from '../order-details/order-details';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import ConstructorElement from "../constructor-element/constructor-element";
import styles from "./burger-constructor.module.css";
import {
  HEIGHT_OF_CONSTRUCTOR_ITEM,
  CONSTRUCTOR_MARGIN
} from '../../utils/constants';

const BurgerConstructor = ({ items }) => {
  const [total, setTotal] = useState(0);
  const [bun, setBun] = useState({});
  const [showModal, setShowModal] = useState(false);
  
  const closeModal = useCallback(() => {  setShowModal(false) }, [])
  const openModal = useCallback((e) => {
    e.stopPropagation();
    setShowModal(true);
  }, [])

  const modal = (
    <ModalOverlay onClose={closeModal}> 
      <Modal onClose={closeModal} >
        <OrderDetails onClose={closeModal} />
      </Modal>
    </ModalOverlay>
  )

  useEffect(() => {
    const foundBun = items.find(({ type }) => type === "bun");
    setBun(foundBun);
  }, [items]);

  useEffect(() => {
    const sum = items.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    setTotal(sum);
  }, [items]);


  // *********************
  // block to calculate and set height of constructor list parent for neat display
  const content = useRef();
  const container = useRef();
  const list = useRef();

  const setConstructorListHeight = () => {
    const contentHeight = content.current.offsetHeight;
    const listScrollHeight = list.current.scrollHeight;
    if (listScrollHeight < contentHeight) {
      return container.current.style.height = `fit-content`;
    }
    const availableSpace =
      Number(contentHeight) - HEIGHT_OF_CONSTRUCTOR_ITEM * 3 + CONSTRUCTOR_MARGIN;
    const countedSpace =
      availableSpace -
      (availableSpace % (HEIGHT_OF_CONSTRUCTOR_ITEM + CONSTRUCTOR_MARGIN)) +
      CONSTRUCTOR_MARGIN;
    container.current.style.height = `${countedSpace}px`;
  };

  useEffect(() => {
    setConstructorListHeight();
    window.addEventListener("resize", setConstructorListHeight);
    return () => window.removeEventListener("resize", setConstructorListHeight);
  }, []);
  // **********************

  return (
    <section className={`${styles.section} pt-5 pb-5`}>
      {showModal && modal}
      <div ref={content} className={`${styles.content} mb-5`}>
        {bun.type && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
        <div ref={container} className={`${styles.container}`}>
          <ul ref={list} className={styles.list}>
            {items &&
              items
                .filter(({ type }) => type !== "bun")
                .map((item) => (
                  <li className={`${styles.listItem} mb-1`} key={item._id}>
                    <ConstructorElement
                      type="center"
                      isLocked={false}
                      text={item.name}
                      thumbnail={item.image}
                      price={item.price}
                    />
                  </li>
                ))}
          </ul>
        </div>
        {bun.type && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}
          />
        )}
      </div>
      <div className={`${styles.order} pt-2`}>
        {!!total && (
          <div className={`${styles.total} mt-1 mb-1 mr-5`}>
            <span className="text text text_type_main-large mr-2">{total}</span>
            <CurrencyIcon type="primary" />
          </div>
        )}
        <div onClick={openModal}>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </ div>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
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
}

export default BurgerConstructor;

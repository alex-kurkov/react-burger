import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { 
  CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import ConstructorElement from '../constructor-element/constructor-element' 
import styles from './burger-constructor.module.css';

const HEIGHT_OF_CONSTRUCTOR_ITEM = 80;
const MARGIN = 8;

const BurgerConstructor = ({ items }) => {
  const [total, setTotal] = useState(0);
  const [bun, setBun] = useState({});

  useEffect(() => {
    const foundBun = items.find(({type}) => type === 'bun');
    setBun(foundBun)
  }, [])

  useEffect(() => {
    const sum = items.reduce((acc, item) => {
      return acc + item.price;
    }, 0)
    setTotal(sum);
  }, [])

  // *********************
  // block to calculate and set height of constructor list parent for neat display
  const content = useRef();
  const container = useRef();
  const list = useRef();

  const setConstructorListHeight = () => {
    const contentHeight = content.current.offsetHeight;
    const listScrollHeight = list.current.scrollHeight;
    if (listScrollHeight < contentHeight) return container.current.style.height = `fit-content`;
    const availableSpace = Number(contentHeight) - (HEIGHT_OF_CONSTRUCTOR_ITEM * 3) + MARGIN;
    const countedSpace = availableSpace - (availableSpace % (HEIGHT_OF_CONSTRUCTOR_ITEM + MARGIN)) + MARGIN;
    container.current.style.height = `${countedSpace}px`;
  }

  useEffect(() => {
    setConstructorListHeight();
    window.addEventListener('resize', setConstructorListHeight);
    return () => window.removeEventListener('resize', setConstructorListHeight);
  }, [])
  // **********************

  return (
    <section className={`${styles.section} pt-5 pb-5`}>
        <div ref={content} className={`${styles.content} mb-5`}>
          
          { bun.type &&
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              thumbnail={bun.image}
              price={bun.price}
            />
          }
        <div ref={container} className={`${styles.container}`}>
          <ul ref={list} className={styles.list}>
            { items &&
              items.filter(({type}) => type !== 'bun').map(item => (
                <li className={`${styles.listItem} mb-1`}>
                  <ConstructorElement
                    type="center"
                    isLocked={false}
                    text={item.name}
                    thumbnail={item.image}
                    price={item.price}
                  />
                </li>
              ))
            }
            </ul>
          </div>
          { bun.type &&
            <ConstructorElement 
            type="bottom"
            isLocked={true}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}
            />
          }
        
        </ div>
      <div className={`${styles.order} pt-2`}>
       {!!total &&
        <div className={`${styles.total} mt-1 mb-1 mr-5`}>
          <span className="text text text_type_main-large mr-2">{total}</span>
          <CurrencyIcon type="primary" />
        </div>}
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;
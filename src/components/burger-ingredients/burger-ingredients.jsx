import React, { useEffect, useState } from "react";
import PropTypes, { func } from 'prop-types';
import { 
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({data}) => {

  const [current, setCurrent] = useState('bun');

  useEffect(() => {
    document.getElementById(current).scrollIntoView({ behavior: 'smooth' });
  }, [current])

  return (
    <section className={`${styles.section} pt-5 pb-5`}>
      <h2 className={`${styles.title} text text_type_main-large mb-2`}>
        Соберите бургер
      </h2>
      <div className={`${styles.tabs} mb-5`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients} pt-3 pb-3`}>
        <h3 className={`${styles.food} text text_type_main-medium`} id='bun'>Булки</h3>
        <div className={`${styles['ingredients-container']} pr-2 pl-2`}>
          {data &&
            data.filter(({ type }) => (type === 'bun')).map((item) => (
              <React.Fragment key={item._id}>
                <div style={{width: '50%', height: '300px'}}>{item.name}</div>
              </React.Fragment>
            ))
          }
        </div>
        <h3 className={`${styles.food} text text_type_main-medium`} id='sauce'>Соусы</h3>
        <div className={`${styles['ingredients-container']} pr-2 pl-2`}>
          {data &&
            data.filter(({ type }) => (type === 'sauce')).map((item) => (
              <React.Fragment key={item._id}>
                <div style={{width: '50%', height: '300px'}}>{item.name}</div>
              </React.Fragment>
            ))
          }
        </div>
        <h3 className={`${styles.food} text text_type_main-medium`} id='main'>Начинки</h3>
        <div className={`${styles['ingredients-container']} pr-2 pl-2`}>
          {data &&
            data.filter(({ type }) => (type === 'main')).map((item) => (
              <React.Fragment key={item._id}>
                <div style={{width: '50%', height: '300px'}}>{item.name}</div>
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </section>
  )
}

/* .filter(({ type }) => (type === 'bun')) */

export default BurgerIngredients;

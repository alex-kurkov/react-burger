import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { tabs } from '../../utils/data'
import IngredientsSublist from '../ingredients-sublist/ingredients-sublist';
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
        { tabs && tabs.map(tab => (
          <Tab key={tab.type} value={tab.type} active={current === tab.type} onClick={setCurrent}>
            {tab.name}
          </Tab>
        ))}

      </div>
      <div className={`${styles.ingredients} pt-3 pb-3`}>
        { tabs && 
          tabs.map(item => (
            <IngredientsSublist
              key={item.type}
              data={data.filter(datum => datum.type === item.type)}
              type={item.type}
              name={item.name}
            />
          ))
        }
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
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
 

export default BurgerIngredients;

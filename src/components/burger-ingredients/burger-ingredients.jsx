import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_INGREDIENTS_TAB } from '../../utils/constants';
import { tabs } from '../../utils/data'
import IngredientsSublist from '../ingredients-sublist/ingredients-sublist';
import { 
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const { ingredients, currentIngredientsTab } = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById(currentIngredientsTab).scrollIntoView({ behavior: 'smooth' });
  }, [currentIngredientsTab])

  const Title = () => (
    <h2 className={`${styles.title} text text_type_main-large mb-2`}>
      Соберите бургер
    </h2>
  )

  const tabsContainer = useMemo(() => (
    <div className={`${styles.tabs} mb-5`}>
      { tabs.map(({ type, name }) => (
        <Tab 
          key={type} 
          value={type} 
          active={currentIngredientsTab === type} 
          onClick={() => dispatch({type: CHANGE_INGREDIENTS_TAB, payload: type})}>
          {name}
        </Tab>
      ))}
    </div>
  ), [currentIngredientsTab, dispatch]);

  const ingredientsContainer = useMemo(() => (
    <div className={`${styles.ingredients} pt-3 pb-3`}>
      { ingredients.length &&
        tabs.map(item => (
          <IngredientsSublist
            key={item.type}
            type={item.type}
            name={item.name}
          />
        ))
      }
    </div>
  ), [ ingredients ])
  

  return (
    <section className={`${styles.section} pt-5 pb-5`}>
      <Title />
      { tabsContainer }
      { ingredientsContainer }
    </section>
  )
}

export default BurgerIngredients;

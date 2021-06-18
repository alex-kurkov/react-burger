import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import { tabs } from '../../utils/data';
import IngredientsSublist from './ingredients-sublist';
import { getNearestTab, throttle } from '../../utils/helpers';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');

  const { ingredients } = useSelector((store) => store.content);
  const dispatch = useDispatch();

  useEffect(() => {
    const container = document.getElementById('ingredients');
    const calculateNearestTab = () => {
      setCurrentTab(getNearestTab());
    };
    container.addEventListener('scroll', throttle(calculateNearestTab, 100));
    return () => container.removeEventListener('scroll', throttle(calculateNearestTab, 100));
  }, [dispatch]);

  const Title = () => (
    <h2 className={`${styles.title} text text_type_main-large mb-2`}>
      Соберите бургер
    </h2>
  );

  const tabsContainer = useMemo(() => {
    const handleTabClick = (type) => {
      document.getElementById(type).scrollIntoView({ behavior: 'smooth' });
      setCurrentTab(type);
    };
    return (
      <div className={`${styles.tabs} mb-5`}>
        { tabs.map(({ type, name }) => (
          <Tab
            key={type}
            value={type}
            active={currentTab === type}
            onClick={handleTabClick}
          >
            {' '}
            {/* value transferred by default */}
            {name}
          </Tab>
        ))}
      </div>
    );
  }, [currentTab, dispatch]);

  const ingredientsContainer = useMemo(() => (
    <div id="ingredients" className={`${styles.ingredients} pt-3 pb-3`}>
      { ingredients.length
        && tabs.map((item) => (
          <IngredientsSublist
            key={item.type}
            type={item.type}
            name={item.name}
          />
        ))}
    </div>
  ), [ingredients]);

  return (
    <section className={`${styles.section} pt-5 pb-5`}>
      <Title />
      { tabsContainer }
      { ingredientsContainer }
    </section>
  );
};

export default BurgerIngredients;

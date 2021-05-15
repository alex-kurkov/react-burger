import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import Main from '../main/main';
import { getIngredients } from '../../services/actions/api'
import { IngredientsContext, ChosenIngredientsContext } from '../../context/appContext';

function App() {

  const dispatch = useDispatch();
  const { ingredients, chosenIngredients } = useSelector(store => store);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])
  useEffect(() => {
    dispatch({type: 'ADD_CHOSEN_INGREDIENT', payload: ingredients.length ? ingredients.slice(-12) : []}) ;
  }, [ingredients, dispatch])

  return (
    <div className={styles.app} >
      <AppHeader />
      { ingredients && !!ingredients.length &&
      <IngredientsContext.Provider value={ingredients}>
        <ChosenIngredientsContext.Provider value={{ chosenIngredients }}>
          <Main />
        </ChosenIngredientsContext.Provider>
      </IngredientsContext.Provider>
      }
    </div>
  );
}

export default App;

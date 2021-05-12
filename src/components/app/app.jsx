import { useEffect, useState, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import Main from '../main/main';
import { getIngredients } from '../../utils/api'
import { IngredientsContext, ChosenIngredientsContext } from '../../context/appContext';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [chosenIngredients, dispatchChosenIngredients] = useReducer(chooseIngredients, []);

  function chooseIngredients(state, action) {
    switch (action.type) {
      case 'add':
        return [...state, ...action.payload]
      case 'remove':
        return [...state.filter(({_id})=> _id !== action.payload._id)]
      default:
        throw new Error(`неправильно передан тип action: ${action.type}`);
    }
  }

  useEffect(() => {
    getIngredients()
      .then(data => {
        setIngredients(data)
        dispatchChosenIngredients({type: 'add', payload: data.slice(-12)})
      })
      .catch(e => console.log(e));
  }, [])

  return (
    <div className={styles.app} >
      <AppHeader />
      { !!ingredients.length &&
      <IngredientsContext.Provider value={ingredients}>
        <ChosenIngredientsContext.Provider value={{ chosenIngredients, dispatchChosenIngredients }}>
          <Main />
        </ChosenIngredientsContext.Provider>
      </IngredientsContext.Provider>
      }
    </div>
  );
}

export default App;

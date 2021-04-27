import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import Main from '../../components/main/main';
import { getIngredients } from '../../utils/api'

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredients = getIngredients()
      .then(data => {
        setIngredients(data)
      })
      .catch(e => console.log(e));
  }, [])

  return (
    <div className={styles.app} >
      <AppHeader />
      { ingredients.length &&
      <Main data={ingredients}/>
      }
    </div>
  );
}

export default App;

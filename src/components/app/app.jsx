import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import Main from '../main/main';
import { getIngredients } from '../../services/actions/api'

function App() {

  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={styles.app} >
      <AppHeader />
      { ingredients && ingredients.length &&
        <Main />
      }
    </div>
  );
}

export default App;

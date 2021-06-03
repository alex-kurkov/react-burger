import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import { getIngredients } from '../../services/actions/api'
import { HomePage } from '../../pages';

const App = () => {

  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.content);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={styles.app} >
      <BrowserRouter>
        <AppHeader />
        <Switch>
          <Route path="/" exact>
            { !!ingredients.length ? <HomePage /> : null }
          </Route>


        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;

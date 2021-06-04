import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import { getIngredients } from '../../services/actions/api'
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  NotFoundPage,
  ResetPasswordPage,
} from '../../pages';

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
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPasswordPage />
          </Route>
          <Route path="/feed" exact>

          </Route>
          <Route path="/profile" exact>

          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;

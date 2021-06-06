import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import { Header } from '../header';
import { getIngredients } from '../../services/actions/api';
import { Loader } from '../loader';
import {
  HomePage,
  FeedPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  FeedOrderDetails,
  Profile
} from '../../pages';

const App = () => {

  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.content);
  const { apiRequestInProgress } = useSelector(store => store.api);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={styles.app} >
      { apiRequestInProgress && <Loader /> }
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact={true} >
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
            <FeedPage />
          </Route>
          <Route path={["/feed/:orderId", "/profile/orders/:orderId"]} exact>
            <FeedOrderDetails />
          </Route>
          <Route path="/profile">
            <Profile />
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

import { useEffect } from 'react';
import {
  useLocation, useHistory, Switch, Route,
} from 'react-router-dom';
import { getIngredients, getUser } from '../../services/actions/auth';
import { resetCurrentError } from '../../services/reducers/content/contentSlice';
import { Loader } from '../loader';
import { ProtectedRoute } from '../protected-route';
import { Header } from '../header';
import { FeedOrderDetailsModal } from '../feed-order-detail-modal';
import { IngredientDetailsModal } from '../ingredient-details-modal';
import { Notification } from '../notification';

import {
  HomePage,
  FeedPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  FeedOrderDetailsPage,
  ProfileEditPage,
  ProfileOrders,
  ProfileOrderDetails,
  IngredientDetailsPage,
} from '../../pages';
import styles from './app.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TLocationTemplate } from '../../types';

const App = () => {
  const dispatch = useAppDispatch();
  const location= useLocation<TLocationTemplate>();
  const history = useHistory<unknown>();

  let modalViewLocation: undefined | typeof location;
  if (history.action !== 'POP' && location.state) modalViewLocation = location.state?.modalViewLocation;
  const {
    ingredients, hasError, currentError,
  } = useAppSelector((store) => store.content);
  const { apiRequestInProgress } = useAppSelector((store) => store.api);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      { apiRequestInProgress && <Loader /> }
      { hasError && (
      <Notification onClose={() => dispatch(resetCurrentError())}>
        {currentError}
      </Notification>
      )}
      { modalViewLocation
        && (
        <>
          <Route path="/ingredients/:ingredientId" render={() => <IngredientDetailsModal />} />
          <Route path="/feed/:orderId" render={() => <FeedOrderDetailsModal />} />
          <Route path="/profile/orders/:orderId" render={() => <FeedOrderDetailsModal searchUserOrders />} />
        </>
        )}
      <Header />
      <Switch location={modalViewLocation || location}>
        <Route path="/" exact render={() => (!!ingredients.length && <HomePage />)} />
        <Route path="/login" render={() => <LoginPage />} exact />
        <Route path="/register" exact render={() => <RegisterPage />} />
        <Route path="/forgot-password" exact render={() => <ForgotPasswordPage />} />
        <Route path="/reset-password" exact render={() => <ResetPasswordPage />} />
        <Route path="/feed" exact render={() => <FeedPage />} />
        <Route path="/ingredients/:ingredientId" render={() => <IngredientDetailsPage />} />
        <Route path="/feed/:orderId" render={() => <FeedOrderDetailsPage />} />
        <ProtectedRoute path="/profile" exact children={<ProfileEditPage />} />
        <ProtectedRoute path="/profile/orders" exact children={<ProfileOrders />} />
        <ProtectedRoute path="/profile/orders/:orderId" children={<ProfileOrderDetails />} />
        <Route path="*" render={() => <NotFoundPage />} />
      </Switch>
    </div>
  );
};

export default App;

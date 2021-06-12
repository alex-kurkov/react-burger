import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Switch, Route } from 'react-router-dom';
import { Header } from '../header';
import { getIngredients, getUser } from '../../services/actions/auth';
import { Loader } from '../loader';
import { ProtectedRoute } from '../protected-route';
import { FeedOrderDetailsModal } from '../feed-order-detail-modal';
import { IngredientDetailsModal } from '../ingredient-details-modal';
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

const App = () => {
  const location = useLocation();
  const modalViewLocation = location.state && location.state.modalViewLocation;

  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.content);
  const { apiRequestInProgress } = useSelector((store) => store.api);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      { apiRequestInProgress && <Loader /> }
      { modalViewLocation
        && (
        <>
          <Route path="/feed/:orderId" children={<FeedOrderDetailsModal />} />
          <Route path="/profile/orders/:orderId" children={<FeedOrderDetailsModal />} />
          <Route path="/ingredients/:ingredientId" children={<IngredientDetailsModal />} />
        </>
        )}
      <Header />
      <Switch location={modalViewLocation || location}>
        <Route path="/" exact children={ingredients.length ? <HomePage /> : null} />
        <Route path="/login" children={<LoginPage />} exact />
        <Route path="/register" exact children={<RegisterPage />} />
        <Route path="/forgot-password" exact children={<ForgotPasswordPage />} />
        <Route path="/reset-password" exact children={<ResetPasswordPage />} />
        <Route path="/feed" exact children={<FeedPage />} />
        <Route path="/ingredients/:ingredientId" children={<IngredientDetailsPage />} />
        <Route path="/feed/:orderId" children={<FeedOrderDetailsPage />} />
        <ProtectedRoute path="/profile" exact children={<ProfileEditPage />} />
        <ProtectedRoute path="/profile/orders" exact children={<ProfileOrders />} />
        <ProtectedRoute path="/profile/orders/:orderId" children={<ProfileOrderDetails />} />
        <Route path="*" children={<NotFoundPage />} />
      </Switch>
    </div>
  );
};

export default App;

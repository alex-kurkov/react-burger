import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';
import styles from './profile.module.css';
import { OrderQueue } from '../components/order-queue';
import { ProfileEdit } from '../components/profile-edit';

export const Profile = () => {
  const {path, url} = useRouteMatch()

  return (
    <main className={styles.main}>
      <aside>
        <nav className={styles.navigation}>
          <NavLink
            activeClassName={styles.activeLink}
            className={`${styles.link} text text_type_main-medium`}
            exact
            to={{ pathname: `${url}` }}>
            Профиль
          </NavLink>
          <NavLink 
            exact 
            activeClassName={styles.activeLink}
            className={`${styles.link} text text_type_main-medium`}
            to={{ pathname: `${url}/orders` }}>
            История заказов
          </NavLink>
          <NavLink
            exact 
            activeClassName={styles.activeLink}
            className={`${styles.link} text text_type_main-medium`}
            to={{ pathname: "/" }} 
            onClick={() => console.log('dispatch logout action')}>
            Выход
          </NavLink>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </aside>
        <Switch>
          <Route path={path} exact>
            <ProfileEdit />
          </Route>
          <Route exact path={`${path}/orders`} >
            <section className={styles.orders}> <OrderQueue /> </section>
          </Route>
        </Switch>

      <div className={styles.content}>

      </div>
    </main>
  )
}
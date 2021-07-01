import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import styles from './styles.module.css';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  return (
    <aside>
      <nav className={styles.navigation}>
        <NavLink
          activeClassName={styles.activeLink}
          className={`${styles.link} text text_type_main-medium`}
          exact
          to="/profile"
        >
          Профиль
        </NavLink>
        <NavLink
          exact
          activeClassName={styles.activeLink}
          className={`${styles.link} text text_type_main-medium`}
          to="/profile/orders"
        >
          История заказов
        </NavLink>
        <NavLink
          exact
          className={`${styles.link} text text_type_main-medium`}
          to={{ pathname: '/profile' }}
          onClick={() => dispatch(logout())}
        >
          Выход
        </NavLink>
      </nav>
      <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете просмотреть свою историю заказов
      </p>
    </aside>
  );
};

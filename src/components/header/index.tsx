import { FC } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index';
import styles from './styles.module.css';

export const Header: FC = () => {
  const isHome: { isExact: boolean } | null = useRouteMatch('/');
  const isFeed: { isExact: boolean } | null = useRouteMatch('/feed');
  const isProfile: { isExact: boolean } | null = useRouteMatch('/profile');

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.content} pl-5 pr-5 pt-2 pb-2`}>
        <nav className={styles.navigation}>
          <NavLink
            exact
            to={{ pathname: '/' }}
            activeClassName={`${styles.active}`}
            className={`${styles.link} text text_type_main-default p-2`}
          >
            <BurgerIcon type={isHome && isHome.isExact ? 'primary' : 'secondary'} />
            <span className={`${styles.text} ml-2`}>Конструктор</span>
          </NavLink>
          <NavLink
            to={{ pathname: '/feed' }}
            activeClassName={`${styles.active}`}
            className={`${styles.link} text text_type_main-default p-2`}
          >
            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
            <span className={`${styles.text} ml-2`}>Лента заказов</span>
          </NavLink>
        </nav>
        <NavLink className={styles.logo} to={{ pathname: '/' }}>
          <Logo />
        </NavLink>
        <nav className={styles.auth}>
          <NavLink
            to={{ pathname: '/profile' }}
            activeClassName={`${styles.active}`}
            className={`${styles.link} text text_type_main-default p-2`}
          >
            <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
            <span className={`${styles.text} ml-2`}>Личный кабинет</span>
          </NavLink>
        </nav>
      </div>

    </header>
  );
};

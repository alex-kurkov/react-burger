import { NavLink, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { 
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';

export const Header = () => {
  const location = useLocation();
  console.log(location);

  return (
    <header className={`${styles.header}`} >
      <div className={`${styles.content} pl-5 pr-5 pt-2 pb-2`} >
        <nav className={styles.navigation}>
          <NavLink
            exact 
            to={{ pathname: '/' }}
            activeClassName={`${styles.active}`}
            className={`${styles.link} text text_type_main-default p-2`}
          >
            <BurgerIcon type={ location.pathname === '/' ? 'primary' : 'secondary' } />
            <span className={`${styles.text} ml-2`}>Конструктор</span>
          </NavLink>
          <NavLink
            exact 
            to={{ pathname: '/feed' }}
            activeClassName={`${styles.active}`}
            className={`${styles.link} text text_type_main-default p-2`}
          >
            <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
            <span className={`${styles.text} ml-2`}>Лента заказов</span>
          </NavLink>
        </nav>
        <NavLink exact className={styles.logo} to={{ pathname: '/' }}>
          <Logo />
        </NavLink>
        <nav className={styles.auth}>
        <NavLink
          exact 
          to={{ pathname: '/profile' }}
          activeClassName={`${styles.active}`}
          className={`${styles.link} text text_type_main-default p-2`}
        >
          <ProfileIcon type={ location.pathname === '/profile' ? 'primary' : 'secondary' } />
          <span className={`${styles.text} ml-2`}>Личный кабинет</span>
        </NavLink>
        </nav>
      </div>
      
      
    </header>
  )
}

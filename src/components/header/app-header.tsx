import styles from './app-header.module.css';
import { 
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components/dist/index.js';
import { NavigationLink } from "../navigation-link/navigation-link";


const AppHeader = () => {
  return (
    <header className={`${styles.header}`} >
      <div className={`${styles.content} pl-5 pr-5 pt-2 pb-2`} >
        <nav className={styles.navigation}>
          <NavigationLink
            active={true}
            text="Конструктор"
            onClick={() => console.log('clicked "Конструктор"')}
            icon={(<BurgerIcon type="primary" />)}
          />
          <NavigationLink
            active={false}
            text="Лента заказов"
            onClick={() => console.log('clicked "Лента заказов"')}
            icon={(<ListIcon type="secondary"/>)}
          />

        </nav>
        <a className={styles.logo} href="/">
          <Logo />
        </a>
        <nav className={styles.auth}>
          <NavigationLink
            active={false}
            text="Личный кабинет"
            onClick={() => console.log('clicked "Личный кабинет"')}
            icon={(<ProfileIcon type="secondary"/>)}
          />
        </nav>
      </div>
      
      
    </header>
  )
}

export default AppHeader;

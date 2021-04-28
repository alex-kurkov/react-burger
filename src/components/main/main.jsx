import PropTypes from 'prop-types';
import styles from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'

 const Main = (props) => {
  return (
    <main className={styles.main}>
      <BurgerIngredients data={props.data} />
      <BurgerConstructor items={props.data} />
    </main>
  )
}
Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
  })),
}
export default Main;

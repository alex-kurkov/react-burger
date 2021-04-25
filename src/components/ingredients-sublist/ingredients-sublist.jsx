import PropTypes from 'prop-types';
import IngredientCard from '../ingredient-card/ingredient-card';
import styles from './ingredients-sublist.module.css';

const IngredientsSublist = ({ data, type, name }) => {
  return (
    <>
      <h3 className="text text_type_main-medium" id={type}>{name}</h3>
      <ul className={`${styles.list} pr-2 pl-2`}>
        { data &&
          data.map((item) => (
            <li className={styles.listItem} key={item._id}>
              <IngredientCard item={item} count={3} />
            </li>
          ))
        }
      </ul>
    </>
  )
}

IngredientsSublist.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      image: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
    })
  ),
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
  name: PropTypes.string
}

export default IngredientsSublist;
